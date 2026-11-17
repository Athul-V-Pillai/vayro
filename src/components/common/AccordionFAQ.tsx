import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../../data/products';

export const AccordionFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {FAQS.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`rounded-2xl transition-all duration-300 border ${
              isOpen
                ? 'bg-surface-light/80 border-teal/30 shadow-teal-glow/10'
                : 'glass-card border-white/5 hover:border-white/15'
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3 pr-4">
                <HelpCircle className={`w-5 h-5 flex-shrink-0 ${isOpen ? 'text-teal' : 'text-slate-500'}`} />
                <span className={`text-base md:text-lg font-medium transition-colors ${isOpen ? 'text-white' : 'text-slate-300'}`}>
                  {faq.question}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-teal' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-6 pt-1 text-slate-400 text-sm md:text-base leading-relaxed border-t border-white/5">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
