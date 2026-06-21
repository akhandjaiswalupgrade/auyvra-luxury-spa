import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "Where is Auyvra Luxury Spa located?",
    a: "Auyvra Luxury Spa is located on the first floor, Green Hills Rd, above Ratnadeep Supermarket, IV Phase, Sevalal Nagar, Moosapet, Hyderabad, Telangana 500018."
  },
  {
    q: "What are the spa timings?",
    a: "Auyvra Luxury Spa is open Monday to Sunday from 10:00am to 9:00pm."
  },
  {
    q: "How can I book an appointment?",
    a: "You can easily book by calling or WhatsApping us at +91 73865 42499."
  },
  {
    q: "What massage services are available?",
    a: "We offer Thai Massage, Aroma Massage, Swedish Massage, Deep Tissue Massage, Hot Oil Massage, Foot Reflexology, Balinese Massage, Thai Yoga Massage, Candle Therapy Massage, Jacuzzi, Body Scrub Therapy, and VIP/VVIP spa experiences."
  },
  {
    q: "Are 60-minute and 90-minute sessions available?",
    a: "Yes, selected massage therapies are available in both 60-minute and 90-minute durations."
  },
  {
    q: "Is steam available?",
    a: "Yes, our VIP Signature Room with Steam is available for 90-minute sessions."
  },
  {
    q: "Can I enquire before booking?",
    a: "Absolutely. You can WhatsApp or call us to ask about services, slot availability, and appointment details before making a booking."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section class="py-16 md:py-24 bg-transparent relative border-y border-[#1a1a1a]" id="faq">
      <div class="container mx-auto px-4 md:px-6 max-w-4xl">
        <div class="text-center mb-16">
          <span class="text-[#D4AF37] uppercase tracking-[0.2em] text-sm font-medium block mb-4">Answers</span>
          <h2 class="text-3xl md:text-5xl font-serif text-[#FDFBF7]">Frequently Asked Questions</h2>
        </div>

        <div class="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              class={`border rounded-2xl overflow-hidden transition-colors duration-300 ${openIndex === index ? 'border-[#D4AF37]/50 bg-[#121212]' : 'border-[#1a1a1a] bg-[#0a0a0a] hover:border-[#D4AF37]/30'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                class="w-full text-left px-6 py-6 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                aria-expanded={openIndex === index}
              >
                <span class="text-[#FDFBF7] font-medium pr-8">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  class="text-[#D4AF37] shrink-0"
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div class="px-6 pb-6 text-[#FDFBF7]/60 font-light leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
