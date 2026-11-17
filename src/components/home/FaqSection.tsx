import React from 'react';
import { AccordionFAQ } from '../common/AccordionFAQ';
import { HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-dim border border-teal/30 text-teal text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Everything You Need to Know
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Detailed answers regarding our computer vision architecture, stealth infrared illumination, audio alerts, and products.
          </p>
        </div>

        <AccordionFAQ />

      </div>
    </section>
  );
};
