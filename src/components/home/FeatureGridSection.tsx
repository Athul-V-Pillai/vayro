import React from 'react';
import {
  Video,
  Eye,
  Moon,
  Navigation,
  Headphones,
  PhoneCall,
  Zap
} from 'lucide-react';

export const FeatureGridSection: React.FC = () => {
  const features = [
    {
      icon: <Video className="w-5 h-5 text-teal" />,
      title: 'Dual-Camera Architecture',
      description: '4K Ultra-HD 155° road-facing optical lens paired with a dedicated 1080p interior cabin sensor for comprehensive perimeter coverage.',
      badge: '4K + 1080p'
    },
    {
      icon: <Eye className="w-5 h-5 text-amber" />,
      title: 'AI Drowsiness Detection',
      description: 'Biometric tracking of eyelid PERCLOS, micro-blink frequency, head nodding velocity, and yawn intervals at 60fps.',
      badge: 'Neural Engine'
    },
    {
      icon: <Moon className="w-5 h-5 text-teal" />,
      title: '940nm Stealth Infrared Array',
      description: 'Zero-glare invisible infrared illumination monitors facial cues in total cabin darkness without driver distraction or eye strain.',
      badge: 'Invisible Night Vision'
    },
    {
      icon: <Navigation className="w-5 h-5 text-teal" />,
      title: 'High-Precision GPS Logging',
      description: 'Embeds calibrated speed telemetry, route coordinates, and precise timestamps directly into recorded video metadata.',
      badge: 'Optional Telemetry'
    },
    {
      icon: <Headphones className="w-5 h-5 text-amber" />,
      title: 'Smart Ambient & ANC',
      description: 'Intelligent acoustic pass-through preserves emergency siren awareness while driving, switching to ANC during scheduled highway rests.',
      badge: 'Safety Audio'
    },
    {
      icon: <PhoneCall className="w-5 h-5 text-teal" />,
      title: 'Crystal Clear Hands-Free Calling',
      description: 'Dual beamforming noise-filtering microphones ensure highway wind and road roar are suppressed during vital business and family calls.',
      badge: 'ENC Beamforming'
    },
  ];

  return (
    <section id="features" className="py-24 bg-[#05070A] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-dim border border-teal/30 text-teal text-xs font-semibold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>Hardware & AI Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engineered for Uncompromising Road Vigilance
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Every component is purpose-built to anticipate driver vulnerability and withstand demanding automotive environments.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="glass-card glass-card-hover p-6 rounded-2xl border border-white/5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-surface-light border border-white/10 flex items-center justify-center transition-transform group-hover:scale-110">
                    {f.icon}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/5">
                    {f.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-teal transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
