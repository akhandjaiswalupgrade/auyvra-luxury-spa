import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const images = [
  { src: "/images/generated/vip_signature_room.png", alt: "VIP Signature Room", category: "VIP Room" },
  { src: "/images/generated/body_scrub_therapy.png", alt: "Body Scrub Therapy", category: "Body Care" },
  { src: "/images/generated/massage_therapy.png", alt: "Massage Therapy", category: "Therapy" },
  { src: "/images/generated/jacuzzi_luxury_experience.png", alt: "Jacuzzi Experience", category: "Jacuzzi" },
  { src: "/images/generated/steam_vip_room.png", alt: "Steam Room", category: "Steam" },
  { src: "/images/generated/aroma_candle_therapy.png", alt: "Relaxation Ambience", category: "Ambience" },
];

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section class="py-16 md:py-24 bg-transparent" id="gallery">
      <div class="container mx-auto px-4 md:px-6">
        <div class="text-center mb-16">
          <span class="text-[#D4AF37] uppercase tracking-[0.2em] text-sm font-medium block mb-4">Inside Auyvra</span>
          <h2 class="text-3xl md:text-5xl font-serif text-[#FDFBF7]">The Luxury Space</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {images.map((img, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              class="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-xl group cursor-pointer"
              onClick={() => setSelectedImg(img.src)}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <span class="text-[#D4AF37] text-xs tracking-widest uppercase font-medium">{img.category}</span>
                  <h3 class="text-[#FDFBF7] font-serif text-lg">{img.alt}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            class="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
          >
            <button 
              onClick={() => setSelectedImg(null)}
              class="absolute top-6 right-6 text-white hover:text-[#D4AF37] transition-colors z-10"
            >
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImg} 
              alt="Gallery Preview" 
              class="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
