import React, { useEffect, useRef } from 'react';

export default function GlobalEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      glow: number;
      isLeftSide: boolean;
      
      constructor() {
        this.y = Math.random() * window.innerHeight;
        this.isLeftSide = Math.random() > 0.5;
        
        // Spawn only on the left 20% or right 20% of the screen
        const sideWidth = window.innerWidth * 0.25;
        if (this.isLeftSide) {
          this.x = Math.random() * sideWidth;
        } else {
          this.x = window.innerWidth - (Math.random() * sideWidth);
        }

        // Gold dust settings
        this.size = Math.random() * 2.5 + 0.5;
        this.speedY = Math.random() * -0.5 - 0.1; // floats up
        this.speedX = (Math.random() * 0.2) * (this.isLeftSide ? 1 : -1); // drift slightly outwards or inwards
        this.opacity = Math.random() * 0.5 + 0.1;
        this.glow = Math.random() * 5 + 2;
      }
      
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        
        // Wrap around vertically
        if (this.y < -10) {
          this.y = window.innerHeight + 10;
          // Respawn strictly on the sides
          const sideWidth = window.innerWidth * 0.25;
          if (this.isLeftSide) {
            this.x = Math.random() * sideWidth;
          } else {
            this.x = window.innerWidth - (Math.random() * sideWidth);
          }
        }
        
        // Keep them from drifting into the center text area (middle 50%)
        const leftBound = window.innerWidth * 0.3;
        const rightBound = window.innerWidth * 0.7;
        
        if (this.isLeftSide && this.x > leftBound) {
          this.x = leftBound;
          this.speedX *= -1; // bounce back
        }
        if (!this.isLeftSide && this.x < rightBound) {
          this.x = rightBound;
          this.speedX *= -1; // bounce back
        }
      }
      
      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // Draw Gold Dust
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#D4AF37';
        ctx.shadowBlur = this.glow;
        ctx.shadowColor = '#D4AF37';
        ctx.fill();
        
        ctx.restore();
      }
    }

    const initParticles = () => {
      particles = [];
      const isMobile = window.innerWidth < 768;
      const numDust = isMobile ? 25 : 60; 
      
      for (let i = 0; i < numDust; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Aurora / Steam Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#0A1F1C]/30 rounded-full mix-blend-screen filter blur-[100px] md:blur-[150px] animate-aurora-1"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#D4AF37]/10 rounded-full mix-blend-screen filter blur-[120px] md:blur-[180px] animate-aurora-2"></div>
      
      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes aurora-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(10%, 15%) scale(1.1); }
          66% { transform: translate(-5%, 5%) scale(0.9); }
        }
        @keyframes aurora-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-10%, -10%) scale(1.05); }
          66% { transform: translate(5%, -15%) scale(1.15); }
        }
        .animate-aurora-1 { animation: aurora-1 25s ease-in-out infinite; }
        .animate-aurora-2 { animation: aurora-2 30s ease-in-out infinite reverse; }
      `}} />
    </div>
  );
}
