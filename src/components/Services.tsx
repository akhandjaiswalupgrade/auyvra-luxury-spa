import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { services, type ServiceCategory } from '../data/services';
import { siteConfig } from '../data/site';

const categories: ServiceCategory[] = ["All", "60 Min", "90 Min", "VIP", "Hammam", "Body Therapies"];

// 3D Tilt Card Component
function ServiceCard({ service }: { service: any }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      class="group relative bg-[#121212] rounded-2xl overflow-hidden border border-[#333] hover:border-[#D4AF37]/50 transition-colors cursor-pointer perspective-1000"
    >
      <div class="aspect-[4/3] w-full overflow-hidden relative" style={{ transform: "translateZ(30px)" }}>
        <img 
          src={service.image} 
          alt={service.name}
          class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-80 group-hover:opacity-100"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent"></div>
        
        {/* Category Badge */}
        <div class="absolute top-4 left-4 flex gap-2">
          {service.category.filter(c => c !== "All").slice(0, 1).map(cat => (
            <span key={cat} class="glass-panel px-3 py-1 rounded-full text-xs font-medium text-[#FDFBF7]/90 uppercase tracking-wider">
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div class="p-6 relative z-10 -mt-8" style={{ transform: "translateZ(50px)" }}>
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-xl font-serif text-[#FDFBF7] group-hover:text-[#D4AF37] transition-colors">{service.name}</h3>
          {service.duration && (
            <span class="text-sm text-[#D4AF37] font-medium">{service.duration}</span>
          )}
        </div>
        <p class="text-[#FDFBF7]/60 text-sm font-light leading-relaxed mb-6">
          {service.description}
        </p>
        
        <a 
          href={`https://wa.me/917386542499?text=Hi%20Auyvra%20Luxury%20Spa%2C%20I%20want%20to%20enquire%20about%20${encodeURIComponent(service.name)}.`}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-sm font-medium text-[#FDFBF7] hover:text-[#D4AF37] transition-colors uppercase tracking-widest"
        >
          Enquire Now
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("All");

  const filteredServices = services.filter(service => 
    service.category.includes(activeCategory)
  );

  return (
    <section class="py-16 md:py-24 bg-transparent relative" id="services">
      <div class="container mx-auto px-4 md:px-6">
        <div class="text-center mb-16">
          <span class="text-[#D4AF37] uppercase tracking-[0.2em] text-sm font-medium block mb-4">Our Therapies</span>
          <h2 class="text-3xl md:text-5xl font-serif text-[#FDFBF7]">Premium Spa Services</h2>
        </div>

        {/* Filter Tabs */}
        <div class="flex flex-wrap justify-center gap-2 md:gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              class={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-[#D4AF37] text-[#0a0a0a]' 
                  : 'bg-transparent border border-[#333] text-[#FDFBF7]/70 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <motion.div 
          layout
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
