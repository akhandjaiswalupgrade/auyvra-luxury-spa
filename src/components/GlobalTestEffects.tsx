import React, { useEffect, useRef } from 'react';

export default function GlobalTestEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let bgStars: BackgroundStar[] = [];
    let shootingStars: ShootingStar[] = [];
    let fragments: Fragment[] = [];
    let mouse = { x: -1000, y: -1000 };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBackgroundStars();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Trigger small breaks on background stars close to the mouse
      bgStars.forEach((star, index) => {
        const dist = Math.hypot(star.x - mouse.x, star.y - mouse.y);
        if (dist < 40 && !star.isBreaking) {
          star.isBreaking = true;
          createExplosion(star.x, star.y, '#D4AF37', 8);
          // Remove the star and respawn it elsewhere
          setTimeout(() => {
            bgStars[index] = new BackgroundStar();
          }, 1000);
        }
      });
    };

    class BackgroundStar {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speedY: number;
      isBreaking: boolean;
      glow: number;
      color: string;

      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.speedY = Math.random() * -0.05 - 0.02; // slow drift upwards
        this.isBreaking = false;
        this.glow = Math.random() * 4 + 2;
        this.color = Math.random() > 0.3 ? '#FDFBF7' : '#D4AF37'; // Ivory or Gold
      }

      update() {
        if (this.isBreaking) return;
        this.y += this.speedY;
        if (this.y < -10) {
          this.y = window.innerHeight + 10;
          this.x = Math.random() * window.innerWidth;
        }
      }

      draw() {
        if (this.isBreaking || !ctx) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.glow;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    class ShootingStar {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      speed: number;
      angle: number;
      length: number;
      color: string;
      life: number;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * (window.innerHeight * 0.4); // spawn in upper half
        this.angle = (Math.PI / 4) + (Math.random() * 0.2 - 0.1); // diagonal down-right
        this.speed = Math.random() * 8 + 6;
        this.length = Math.random() * 80 + 40;
        this.color = Math.random() > 0.4 ? '#D4AF37' : '#F3E5AB'; // luxury gold / light champagne
        // target lifetime before it explodes/breaks
        this.life = Math.random() * 60 + 30; 
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.life--;

        // Trigger breaking/explosion
        if (this.life <= 0 || this.x > window.innerWidth || this.y > window.innerHeight) {
          createExplosion(this.x, this.y, this.color, 25);
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        const grad = ctx.createLinearGradient(
          this.x, this.y,
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        grad.addColorStop(0, this.color);
        grad.addColorStop(0.5, this.color + '88');
        grad.addColorStop(1, 'transparent');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        ctx.stroke();
        ctx.restore();
      }
    }

    class Fragment {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      decay: number;
      gravity: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 1.5; // slight upward burst
        this.size = Math.random() * 1.8 + 0.6;
        this.color = color;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.015;
        this.gravity = 0.04;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.alpha -= this.decay;
      }

      draw() {
        if (!ctx || this.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    const createExplosion = (x: number, y: number, color: string, count: number) => {
      for (let i = 0; i < count; i++) {
        fragments.push(new Fragment(x, y, color));
      }
    };

    const initBackgroundStars = () => {
      bgStars = [];
      const numStars = Math.floor((window.innerWidth * window.innerHeight) / 9000);
      for (let i = 0; i < numStars; i++) {
        bgStars.push(new BackgroundStar());
      }
    };

    // Initialize shooting stars
    shootingStars = [new ShootingStar(), new ShootingStar()];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render bg stars
      bgStars.forEach(s => {
        s.update();
        s.draw();
      });

      // Update & render shooting stars
      shootingStars.forEach(s => {
        s.update();
        s.draw();
      });

      // Update & render fragments
      for (let i = fragments.length - 1; i >= 0; i--) {
        const f = fragments[i];
        f.update();
        if (f.alpha <= 0) {
          fragments.splice(i, 1);
        } else {
          f.draw();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Soft dark green/gold nebulas */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-[#0A1F1C]/20 rounded-full mix-blend-screen filter blur-[150px] animate-aurora-1"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] bg-[#D4AF37]/6 rounded-full mix-blend-screen filter blur-[180px] animate-aurora-2"></div>
      
      {/* Breaking Stars Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-80"
      />
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes aurora-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(5%, 10%) scale(1.05); }
          66% { transform: translate(-3%, 3%) scale(0.95); }
        }
        @keyframes aurora-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-5%, -5%) scale(1.02); }
          66% { transform: translate(3%, -10%) scale(1.08); }
        }
        .animate-aurora-1 { animation: aurora-1 30s ease-in-out infinite; }
        .animate-aurora-2 { animation: aurora-2 35s ease-in-out infinite reverse; }
      `}} />
    </div>
  );
}
