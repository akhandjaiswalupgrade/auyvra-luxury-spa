import React from 'react';
import { motion } from 'framer-motion';
import { services } from '../data/services';

export default function Marquee() {
  // Extract all service names to scroll
  const serviceNames = services.map(s => s.name);
  
  // Duplicate the array to ensure seamless infinite scrolling
  const marqueeItems = [...serviceNames, ...serviceNames, ...serviceNames];

  return (
    <div className="relative w-full py-5 bg-[#0a0a0a] border-y border-[#D4AF37]/15 overflow-hidden flex items-center z-30">
      
      {/* Fade Edges for premium look */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>

      {/* Infinite Scroll Container */}
      <motion.div 
        className="flex whitespace-nowrap items-center gap-4"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ 
          repeat: Infinity, 
          ease: "linear", 
          duration: 35 // Relaxing, premium scroll speed
        }}
      >
        {marqueeItems.map((item, index) => (
          <div key={index} className="flex items-center mx-2">
            <div className="px-5 py-2.5 rounded-full border border-[#D4AF37]/15 bg-[#D4AF37]/5 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.5)] flex items-center gap-3">
              <span className="text-[#D4AF37] text-xs font-semibold">✦</span>
              <span className="text-[#FDFBF7]/90 font-sans text-xs md:text-sm tracking-widest uppercase font-medium">
                {item}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
