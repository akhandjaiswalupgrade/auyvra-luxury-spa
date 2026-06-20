import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../data/site';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Experience', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'FAQ', href: '#faq' },
  ];

  // Prevent scrolling when menu is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#D4AF37]/10 py-4 shadow-xl' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 relative z-[101]">
            <img 
              src="/images/logo.png" 
              alt="Auyvra Luxury Spa" 
              className={`w-auto object-contain transition-all duration-300 ${
                scrolled ? 'h-12 md:h-16' : 'h-16 md:h-20'
              }`} 
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-[#FDFBF7]/80 hover:text-[#D4AF37] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href={siteConfig.whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2 border border-[#D4AF37] text-[#D4AF37] text-sm font-medium rounded-full hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-all"
            >
              Book Now
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden relative z-[101] p-2 text-[#FDFBF7]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[99] bg-[#0a0a0a] flex flex-col pt-24 px-6 pb-6"
          >
            <nav className="flex flex-col gap-6 items-center justify-center flex-1">
              {navLinks.map((link, i) => (
                <motion.a 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-serif text-[#FDFBF7] hover:text-[#D4AF37] transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-col gap-4 w-full"
              >
                <a 
                  href={siteConfig.whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#D4AF37] text-[#0a0a0a] text-center font-medium rounded-full"
                >
                  Book on WhatsApp
                </a>
                <a 
                  href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} 
                  className="w-full py-4 border border-[#D4AF37] text-[#D4AF37] text-center font-medium rounded-full"
                >
                  Call Now
                </a>
              </motion.div>
            </nav>
            
            <div className="mt-auto text-center">
              <p className="text-sm text-[#FDFBF7]/50">{siteConfig.address}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
