import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { services, type ServiceCategory } from '../data/services';
import { siteConfig } from '../data/site';

const categories: ServiceCategory[] = ["All", "60 Min", "90 Min", "VIP", "Body Therapies"];

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
          <h3 class="text-xl font-serif text-[#FDFBF7] group-hover:text-[#D4AF37] transition-colors leading-tight">{service.name}</h3>
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
          className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-[#075E54] hover:bg-[#05433c] text-white transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_15px_rgba(7,94,84,0.2)] text-xs font-semibold uppercase tracking-wider"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="relative z-10"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
          Book on WhatsApp
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
          <h2 class="text-3xl md:text-5xl font-serif text-[#FDFBF7] leading-tight">Premium Spa Services</h2>
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
