import React from 'react';
import { Eye } from 'lucide-react';

interface ConceptBadgeProps {
  className?: string;
  light?: boolean;
}

export const ConceptBadge: React.FC<ConceptBadgeProps> = ({ className = '', light = false }) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase border backdrop-blur-md transition-all ${
        light
          ? 'bg-white/10 text-slate-200 border-white/20'
          : 'bg-[#07090C]/80 text-teal-light border-teal/30 shadow-sm'
      } ${className}`}
    >
      <Eye className="w-3 h-3 text-teal" />
      <span>Concept Visualization</span>
    </div>
  );
};
