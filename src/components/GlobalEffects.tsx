import React from 'react';

export default function GlobalEffects() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Aurora / Steam Orbs (slow moving ambient colors) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#0A1F1C]/25 rounded-full mix-blend-screen filter blur-[100px] md:blur-[150px] animate-aurora-1"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#D4AF37]/8 rounded-full mix-blend-screen filter blur-[120px] md:blur-[180px] animate-aurora-2"></div>
      
      {/* Side Glow Flares (adds rich depth to the left and right edges without overlaying any dots) */}
      <div className="absolute top-0 left-0 w-[10vw] h-full bg-gradient-to-r from-[#D4AF37]/5 to-transparent opacity-80 animate-pulse-slow"></div>
      <div className="absolute top-0 right-0 w-[10vw] h-full bg-gradient-to-l from-[#0A1F1C]/30 to-transparent opacity-90"></div>
      
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
