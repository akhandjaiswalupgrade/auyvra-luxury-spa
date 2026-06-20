import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Sparkles } from 'lucide-react';
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
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="22" 
          height="22" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="group-hover:scale-110 transition-transform duration-300"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.292 1.48 4.832 1.48 5.176 0 9.387-4.208 9.39-9.386.002-2.509-.974-4.866-2.748-6.64-1.77-1.776-4.127-2.753-6.637-2.754-5.183 0-9.395 4.209-9.399 9.391-.001 1.623.42 3.202 1.22 4.606l-.993 3.628 3.735-.98zm11.117-6.425c-.299-.149-1.773-.875-2.046-.975-.275-.1-.475-.149-.675.15-.2.299-.774.975-.95 1.174-.175.2-.35.224-.65.074-1.86-.93-2.934-1.614-4.103-3.62-.3-.516.3-.479.858-1.597.09-.18.045-.337-.023-.487-.067-.15-.575-1.387-.787-1.9-.207-.5-.436-.433-.6-.442l-.51-.009c-.175 0-.46.065-.7.325-.24.26-1.127 1.102-1.127 2.686 0 1.584 1.152 3.118 1.31 3.328.16.208 2.266 3.46 5.49 4.856.766.332 1.364.53 1.83.678.77.244 1.47.21 2.025.127.619-.092 1.773-.724 2.023-1.424.25-.699.25-1.3.175-1.424-.075-.125-.275-.199-.575-.349z"/>
        </svg>
      ),
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
