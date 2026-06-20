import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, MapPin, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/site';

export default function StickyBookingDock() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Show dock after scrolling past hero
      if (window.scrollY > window.innerHeight * 0.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const actions = [
    {
      id: 'call',
      label: 'Call Us',
      icon: <Phone size={22} className="group-hover:scale-110 transition-transform duration-300" />,
      href: `tel:${siteConfig.phone.replace(/\s+/g, '')}`,
      isPrimary: false
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: <MessageCircle size={22} className="group-hover:scale-110 transition-transform duration-300" />,
      href: siteConfig.whatsappUrl,
      isPrimary: true
    },
    {
      id: 'directions',
      label: 'Directions',
      icon: <MapPin size={22} className="group-hover:scale-110 transition-transform duration-300" />,
      href: siteConfig.mapsUrl,
      isPrimary: false
    },
    {
      id: 'services',
      label: 'Services',
      icon: <Sparkles size={22} className="group-hover:scale-110 transition-transform duration-300" />,
      href: '#services',
      isPrimary: false
    }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-0 md:bottom-8 left-0 md:left-1/2 md:-translate-x-1/2 z-50 w-full md:w-[95%] md:max-w-3xl pb-[env(safe-area-inset-bottom)] md:pb-0"
        >
          <div className="glass-panel md:rounded-2xl rounded-t-3xl border-t md:border border-[#D4AF37]/20 bg-[#0a0a0a]/80 backdrop-blur-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] md:shadow-[0_20px_40px_rgba(0,0,0,0.7)] overflow-hidden">
            
            <div className="grid grid-cols-4 divide-x divide-[#D4AF37]/10">
              {actions.map((action) => (
                <a
                  key={action.id}
                  href={action.href}
                  target={action.id === 'services' || action.id === 'call' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center py-4 md:py-5 px-2 relative transition-all duration-300 hover:bg-[#D4AF37]/5"
                >
                  {/* Subtle hover glow background */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  
                  <div className={`mb-2 ${action.isPrimary ? 'text-[#25D366] group-hover:text-[#28F172]' : 'text-[#D4AF37] group-hover:text-[#FDFBF7] drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]'} transition-colors duration-300`}>
                    {action.icon}
                  </div>
                  
                  <span className="text-[10px] md:text-xs font-medium text-[#FDFBF7]/70 group-hover:text-[#FDFBF7] tracking-wider uppercase text-center transition-colors duration-300">
                    {action.label}
                  </span>
                </a>
              ))}
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
