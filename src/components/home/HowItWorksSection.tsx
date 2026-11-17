import React, { useState } from 'react';
import { HOW_IT_WORKS_STEPS } from '../../data/products';
import { ScanEye, BellRing, ShieldCheck, Radio, Volume2, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { ConceptBadge } from '../common/ConceptBadge';

export const HowItWorksSection: React.FC = () => {
  const { triggerDrowsinessAlert, isAlertActive } = useStore();
  const [selectedBud, setSelectedBud] = useState<'pro' | 'lite'>('pro');

  const getIcon = (step: string) => {
    switch (step) {
      case '01':
        return <ScanEye className="w-6 h-6 text-teal" />;
      case '02':
        return <BellRing className="w-6 h-6 text-amber" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-teal" />;
    }
  };

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-[#05070A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-dim border border-teal/30 text-teal text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Synchronized Ecosystem Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How vayro Protects You
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            A continuous sub-120ms safety loop: On-device optical detection triggers a prioritized wireless alert arc straight to your companion earbuds.
          </p>
        </div>

        {/* Live Animated Signal Arc & Soundwave Demonstration Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-teal/20 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-teal flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal animate-ping" />
                Live Alert Transmission Loop
              </span>
              <ConceptBadge />
            </div>

            <div className="flex items-center gap-3">
              {/* Earbud Variant Switcher */}
              <div className="flex items-center gap-1 bg-surface p-1 rounded-xl border border-white/10 text-xs">
                <button
                  onClick={() => setSelectedBud('pro')}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${
                    selectedBud === 'pro' ? 'bg-teal text-black font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Pro Neckband
                </button>
                <button
                  onClick={() => setSelectedBud('lite')}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${
                    selectedBud === 'lite' ? 'bg-teal text-black font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Lite TWS
                </button>
              </div>

              {/* Trigger Pulse Button */}
              <button
                onClick={triggerDrowsinessAlert}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  isAlertActive
                    ? 'bg-amber text-black shadow-amber-glow animate-pulse'
                    : 'bg-surface-light border border-teal/40 text-teal hover:bg-teal hover:text-black shadow-teal-glow'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>{isAlertActive ? 'Transmitting Alert...' : 'Simulate Pulse'}</span>
              </button>
            </div>
          </div>

          {/* Visual Canvas/Stage: Dashcam -> Signal Arc -> Earbuds with Soundwave Ripples */}
          <div className="py-12 px-4 relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 min-h-[340px]">
            {/* 1. Dashcam Unit */}
            <div className="flex flex-col items-center text-center space-y-3 z-10 w-64">
              <div className="relative w-48 h-36 flex items-center justify-center">
                {/* Subtle soft glow behind */}
                <div className={`absolute inset-0 rounded-full blur-2xl transition-all ${
                  isAlertActive ? 'bg-amber/30 scale-125' : 'bg-teal/15 scale-100'
                }`} />
                <img
                  src="/assets/dashcam_000.png"
                  alt="vayro Dashcam"
                  className="w-full h-full object-contain relative z-10 drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]"
                />
                {/* Glowing AI Lens indicator */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all ${
                  isAlertActive ? 'border-amber bg-amber shadow-amber-glow animate-ping' : 'border-teal/60 bg-teal/20'
                }`} />
              </div>
              <div>
                <span className="text-xs font-mono text-teal font-semibold block">01 DETECT</span>
                <h4 className="text-sm font-bold text-white">Dual-Lens AI Dashcam</h4>
                <p className="text-[11px] text-slate-400">On-device neural PERCLOS & eye tracking</p>
              </div>
            </div>

            {/* 2. Animated Signal Arc (Center) */}
            <div className="flex-1 w-full max-w-md relative flex flex-col items-center justify-center px-4 my-6 md:my-0">
              {/* SVG Arc and traveling pulse beads */}
              <div className="w-full relative h-20 flex items-center justify-center">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 300 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background dashed track */}
                  <path
                    d="M 10 40 Q 150 -10 290 40"
                    stroke="rgba(45, 212, 191, 0.2)"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                  />
                  {/* Glowing active transmission arc */}
                  <path
                    d="M 10 40 Q 150 -10 290 40"
                    stroke={isAlertActive ? '#F59E0B' : '#2DD4BF'}
                    strokeWidth="3"
                    className="opacity-75"
                    strokeDasharray="20 180"
                    strokeDashoffset={isAlertActive ? '0' : '100'}
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="200"
                      to="0"
                      dur={isAlertActive ? "0.6s" : "1.8s"}
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>

                {/* Pulsing Signal Packet Dots */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md border ${
                    isAlertActive
                      ? 'bg-amber-dim text-amber border-amber shadow-amber-glow animate-bounce'
                      : 'bg-surface/90 text-teal border-teal/40'
                  }`}>
                    {isAlertActive ? 'URGENT ALERT: <120ms BLE' : 'Direct BLE Safety Link'}
                  </div>
                </div>
              </div>

              <div className="text-center text-[10px] text-slate-400 font-mono mt-1">
                Zero Cloud Lag • Direct Hardware-to-Ear Handshake
              </div>
            </div>

            {/* 3. Companion Earbuds with Animated Teal Sound-Wave Ripples */}
            <div className="flex flex-col items-center text-center space-y-3 z-10 w-64">
              <div className="relative w-48 h-36 flex items-center justify-center">
                {/* Concentric Animated Teal / Amber Sound-wave Ripples */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className={`w-32 h-32 rounded-full border border-teal/30 absolute ${
                    isAlertActive ? 'animate-ripple border-amber/60' : 'animate-ping opacity-25'
                  }`} style={{ animationDuration: isAlertActive ? '1.2s' : '3s' }} />
                  <div className={`w-44 h-44 rounded-full border border-teal/20 absolute ${
                    isAlertActive ? 'animate-ripple border-amber/40' : 'opacity-20'
                  }`} style={{ animationDuration: isAlertActive ? '1.6s' : '3s', animationDelay: '0.3s' }} />
                  <div className={`w-56 h-56 rounded-full border border-teal/10 absolute ${
                    isAlertActive ? 'animate-ripple border-amber/20' : 'opacity-10'
                  }`} style={{ animationDuration: isAlertActive ? '2.0s' : '3s', animationDelay: '0.6s' }} />
                </div>

                {/* Product Frame Image */}
                <img
                  src={selectedBud === 'pro' ? '/assets/pro_000.png' : '/assets/lite_000.png'}
                  alt={selectedBud === 'pro' ? 'vayro Pro Neckband' : 'vayro Lite TWS'}
                  className="w-full h-full object-contain relative z-10 drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]"
                />
              </div>

              <div>
                <span className={`text-xs font-mono font-semibold block ${isAlertActive ? 'text-amber' : 'text-teal'}`}>
                  02 ALERT & INTERVENE
                </span>
                <h4 className="text-sm font-bold text-white">
                  {selectedBud === 'pro' ? 'vayro Pro Neckband' : 'vayro Lite TWS Earbuds'}
                </h4>
                <p className="text-[11px] text-slate-400">Binaural acoustic chime + Smart Ambient awareness</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Step Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover p-8 rounded-3xl relative z-10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-surface-light border border-white/10 flex items-center justify-center shadow-lg">
                    {getIcon(step.step)}
                  </div>
                  <span className="text-3xl font-mono font-extrabold text-slate-600">
                    {step.step}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-teal">
                    {step.tagline}
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {step.title}
                  </h3>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface/80 border border-white/5 text-xs text-slate-400">
                <span className="text-teal font-medium">Under the hood: </span>
                {step.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
