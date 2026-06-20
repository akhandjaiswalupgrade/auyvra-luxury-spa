import React from 'react';

export default function GlobalTestEffects() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Lavender & Gold Ambient Steam Orbs (slow moving colors matching the lavender theme) */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-[#7A5B9B]/20 rounded-full mix-blend-screen filter blur-[120px] md:blur-[180px] animate-aurora-1"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] bg-[#D4AF37]/6 rounded-full mix-blend-screen filter blur-[150px] md:blur-[200px] animate-aurora-2"></div>
      
      {/* Side Glow Flares (adds rich depth to the left and right edges) */}
      <div className="absolute top-0 left-0 w-[10vw] h-full bg-gradient-to-r from-[#D4AF37]/4 to-transparent opacity-80 animate-pulse-slow"></div>
      <div className="absolute top-0 right-0 w-[10vw] h-full bg-gradient-to-l from-[#7A5B9B]/15 to-transparent opacity-90"></div>
      
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
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }
        .animate-aurora-1 { animation: aurora-1 30s ease-in-out infinite; }
        .animate-aurora-2 { animation: aurora-2 35s ease-in-out infinite reverse; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
      `}} />
    </div>
  );
}
