import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

const premiumExperiences = [
  {
    title: "VIP Signature Room with Steam",
    image: "/images/generated/steam_vip_room.png",
    description: "The ultimate privacy and relaxation, combining premium massage with a private steam session."
  },
  {
    title: "Royal Jacuzzi Massage",
    image: "/images/generated/jacuzzi_luxury_experience.png",
    description: "Unwind in our warm, elegantly lit jacuzzi combined with soothing massage therapy."
  },
  {
    title: "Candle Therapy Massage",
    image: "/images/generated/aroma_candle_therapy.png",
    description: "Warm, melted massage candle wax applied smoothly for deep hydration and comfort."
  }
];

function PremiumTiltCard({ exp, index }: { exp: any, index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      style={{ 
        y: index % 2 === 0 ? 0 : 20,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      class="w-[85vw] md:w-[450px] max-w-[320px] md:max-w-none group relative snap-center cursor-pointer perspective-1000"
    >
      <div class="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6" style={{ transform: "translateZ(30px)" }}>
        <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
        
        {/* Image */}
        <img 
          src={exp.image} 
          alt={exp.title}
          class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
        />
        
        {/* Gold border on hover */}
        <div class="absolute inset-0 border-2 border-[#D4AF37]/0 group-hover:border-[#D4AF37]/30 rounded-2xl transition-colors duration-500 z-20 pointer-events-none"></div>
      </div>
      
      <div style={{ transform: "translateZ(40px)" }}>
        <h3 class="text-xl md:text-2xl font-serif text-[#FDFBF7] mb-3 group-hover:text-[#D4AF37] transition-colors">{exp.title}</h3>
        <p class="text-sm md:text-base text-[#FDFBF7]/60 font-light leading-relaxed">
          {exp.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function PremiumExperiences() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  // Parallax subtle movement for the whole section
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={targetRef} class="py-16 md:py-24 bg-transparent overflow-hidden relative">
      <div class="container mx-auto px-4 md:px-6 mb-12 md:mb-20">
        <div class="max-w-3xl">
          <span class="text-[#D4AF37] uppercase tracking-[0.2em] text-sm font-medium block mb-4">Curated</span>
          <h2 class="text-3xl md:text-5xl font-serif text-[#FDFBF7] mb-6">Luxury Spa Hyderabad Experiences</h2>
          <p class="text-lg text-[#FDFBF7]/70 font-light leading-relaxed">
            For guests who seek more than a regular spa session, Auyvra offers premium body massage Hyderabad therapies and wellness experiences designed around privacy, comfort, relaxation, and indulgence.
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Area / Carousel */}
      <div class="pl-4 md:pl-6 overflow-x-auto pb-12 hide-scrollbar cursor-grab active:cursor-grabbing snap-x snap-mandatory">
        <div class="flex gap-6 md:gap-8 w-max pr-6 py-10 px-4">
          {premiumExperiences.map((exp, index) => (
            <PremiumTiltCard key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
      
      <div class="container mx-auto px-4 md:px-6 mt-8 flex justify-center md:justify-start">
         <a href="#services" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-[#D4AF37] text-[#D4AF37] rounded-full font-medium hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-all">
          Explore All Services
        </a>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
