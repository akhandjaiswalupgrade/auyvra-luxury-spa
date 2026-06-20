import React from 'react';
import { motion } from 'framer-motion';
import { services } from '../data/services';

export default function Marquee() {
  // Extract all service names to scroll
  const serviceNames = services.map(s => s.name);
  
  // Duplicate the array to ensure seamless infinite scrolling
  const marqueeItems = [...serviceNames, ...serviceNames, ...serviceNames];

  return (
    <div className="relative w-full py-4 bg-[#0a0a0a] border-y border-[#D4AF37]/20 overflow-hidden flex items-center z-30">
      
      {/* Fade Edges for premium look */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>

      {/* Infinite Scroll Container */}
      <motion.div 
        className="flex whitespace-nowrap items-center"
        animate={{ x: [0, -1035] }} // Scroll width approx
        transition={{ 
          repeat: Infinity, 
          ease: "linear", 
          duration: 30 // Slow, relaxing scroll
        }}
      >
        {marqueeItems.map((item, index) => (
          <div key={index} className="flex items-center mx-6 md:mx-10">
            <span className="text-[#FDFBF7]/70 font-serif text-lg md:text-xl tracking-wider uppercase">
              {item}
            </span>
            <span className="text-[#D4AF37] ml-12 md:ml-20 text-xl">
              ✦
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
