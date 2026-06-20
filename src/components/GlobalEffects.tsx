import React, { useEffect, useRef, useState } from 'react';

export default function GlobalEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollOpacity, setScrollOpacity] = useState(0);

  useEffect(() => {
    // Scroll handler to fade in canvas only when scrolling past the Hero area
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.7; // Start fading in at 70% of viewport height
      if (window.scrollY < threshold) {
        setScrollOpacity(0);
      } else {
        // Fade in smoothly over 200px of scroll
        const opacity = Math.min(1, (window.scrollY - threshold) / 200);
        setScrollOpacity(opacity);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
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
        
        // Spawn strictly on the left 25% or right 25% of the screen
        const sideWidth = window.innerWidth * 0.25;
        if (this.isLeftSide) {
          this.x = Math.random() * sideWidth;
        } else {
          this.x = window.innerWidth - (Math.random() * sideWidth);
        }

        // Golden bubbles settings
        this.size = Math.random() * 3 + 1; // 1px to 4px
        this.speedY = Math.random() * -0.4 - 0.15; // slow float upwards
        this.speedX = (Math.random() * 0.15 - 0.075); // very slow horizontal drift
        this.opacity = Math.random() * 0.4 + 0.15;
        this.glow = Math.random() * 6 + 3;
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
        
        // Keep them from drifting into the center content area (middle 50%)
        const leftBound = window.innerWidth * 0.28;
        const rightBound = window.innerWidth * 0.72;
        
        if (this.isLeftSide && this.x > leftBound) {
          this.x = leftBound;
          this.speedX *= -1;
        }
        if (!this.isLeftSide && this.x < rightBound) {
          this.x = rightBound;
          this.speedX *= -1;
        }
      }
      
      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // Draw Golden Bubble (radial gradient for 3D look)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(
          this.x - this.size * 0.2, 
          this.y - this.size * 0.2, 
          0, 
          this.x, 
          this.y, 
          this.size
        );
        gradient.addColorStop(0, '#FFFFFF'); // Highlight center glow
        gradient.addColorStop(0.3, '#F3E5AB'); // Champagne gold
        gradient.addColorStop(1, '#D4AF37'); // Classic luxury gold
        
        ctx.fillStyle = gradient;
        ctx.shadowBlur = this.glow;
        ctx.shadowColor = '#D4AF37';
        ctx.fill();
        
        ctx.restore();
      }
    }

    const initParticles = () => {
      particles = [];
      const isMobile = window.innerWidth < 768;
      const numBubbles = isMobile ? 25 : 55; 
      
      for (let i = 0; i < numBubbles; i++) {
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
      {/* Aurora / Steam Orbs (slow moving ambient colors) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#0A1F1C]/25 rounded-full mix-blend-screen filter blur-[100px] md:blur-[150px] animate-aurora-1"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#D4AF37]/8 rounded-full mix-blend-screen filter blur-[120px] md:blur-[180px] animate-aurora-2"></div>
      
      {/* Side Glow Flares (adds rich depth to the left and right edges) */}
      <div className="absolute top-0 left-0 w-[10vw] h-full bg-gradient-to-r from-[#D4AF37]/5 to-transparent opacity-80 animate-pulse-slow"></div>
      <div className="absolute top-0 right-0 w-[10vw] h-full bg-gradient-to-l from-[#0A1F1C]/30 to-transparent opacity-90"></div>
      
      {/* Golden Bubble Canvas (fades in past the hero section) */}
      <canvas 
        ref={canvasRef} 
        style={{ opacity: scrollOpacity }}
        className="absolute inset-0 w-full h-full transition-opacity duration-300"
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
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }
        .animate-aurora-1 { animation: aurora-1 25s ease-in-out infinite; }
        .animate-aurora-2 { animation: aurora-2 30s ease-in-out infinite reverse; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
      `}} />
    </div>
  );
}
