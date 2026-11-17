import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { ConceptBadge } from '../common/ConceptBadge';
import { Radio, VolumeX, ShieldAlert, Sparkles, Volume2 } from 'lucide-react';
import { SITE_DISCLAIMERS } from '../../data/products';

export const AmbientDemoSection: React.FC = () => {
  const { ambientMode, setAmbientMode } = useStore();
  const [selectedBud, setSelectedBud] = useState<'pro' | 'lite'>('pro');

  return (
    <section className="py-24 relative overflow-hidden bg-[#05070A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Audio Waveform Canvas Box */}
          <div className="lg:col-span-6 relative flex flex-col items-center order-2 lg:order-1">
            <div className="absolute top-4 left-4 z-20">
              <ConceptBadge />
            </div>

            <div className="w-full h-[440px] sm:h-[480px] rounded-3xl bg-surface border border-white/10 relative overflow-hidden flex flex-col items-center justify-center shadow-2xl p-6">
              {/* Earbud Selector Pill on Top Right */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-surface-light p-1 rounded-xl border border-white/10 text-xs">
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

              {/* Animated Soundwave & Product Frame Scene */}
              <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Acoustic Ripple Rings */}
                {ambientMode === 'ambient' ? (
                  // Ambient Mode: Active pulsating ripples flowing inward from environment
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-40 h-40 rounded-full border border-teal/40 animate-ripple absolute" style={{ animationDuration: '2s' }} />
                    <div className="w-52 h-52 rounded-full border border-amber/40 animate-ripple absolute" style={{ animationDuration: '2.5s', animationDelay: '0.4s' }} />
                    <div className="w-64 h-64 rounded-full border border-teal/20 animate-ripple absolute" style={{ animationDuration: '3s', animationDelay: '0.8s' }} />
                    <div className="w-80 h-80 rounded-full border border-amber/15 animate-ripple absolute" style={{ animationDuration: '3.5s', animationDelay: '1.2s' }} />
                  </div>
                ) : (
                  // ANC Mode: Damped containment shield
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-52 h-52 rounded-full border-2 border-dashed border-teal/30 bg-teal/5 animate-pulse" />
                    <div className="w-64 h-64 rounded-full border border-teal/10" />
                  </div>
                )}

                {/* Earbuds Product Frame */}
                <div className="relative z-10 w-48 h-48 flex items-center justify-center">
                  <div className={`absolute inset-0 rounded-full blur-2xl transition-all ${
                    ambientMode === 'ambient' ? 'bg-amber/20' : 'bg-teal/15'
                  }`} />
                  <img
                    src={selectedBud === 'pro' ? '/assets/pro_000.png' : '/assets/lite_000.png'}
                    alt={selectedBud === 'pro' ? 'vayro Pro Neckband' : 'vayro Lite TWS'}
                    className="w-full h-full object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.85)] relative z-10 transition-transform hover:scale-105 duration-300"
                  />
                </div>
              </div>

              {/* Status pill inside canvas */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-400 bg-surface/85 backdrop-blur-md p-3.5 rounded-xl border border-white/5 z-10">
                <span className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${ambientMode === 'ambient' ? 'bg-amber animate-ping' : 'bg-teal'}`} />
                  Profile: <strong className="text-white">{ambientMode === 'ambient' ? 'Smart Ambient Pass-Through' : 'Active Noise Cancellation'}</strong>
                </span>
                <span className="font-mono text-[11px] text-teal">
                  {ambientMode === 'ambient' ? 'Sirens & Horns Open' : 'Cabin Road Hum Damped'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Explanations & Mode Toggle */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-dim border border-teal/30 text-teal text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Acoustic Safety Innovation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Hear what matters. Filter what fatigues.
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Standard noise-cancelling headphones dangerously isolate drivers from emergency sirens and honking vehicles. vayro features proprietary <strong className="text-white">Smart Ambient Mode</strong> that automatically dials in external acoustic safety frequencies whenever your vehicle is in motion.
            </p>

            {/* Interactive Toggle Switch */}
            <div className="p-2 rounded-2xl bg-surface border border-white/10 inline-flex flex-wrap items-center gap-2">
              <button
                onClick={() => setAmbientMode('ambient')}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  ambientMode === 'ambient'
                    ? 'bg-amber text-black shadow-amber-glow font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Radio className="w-4 h-4" />
                <span>Smart Ambient Mode (Driving)</span>
              </button>

              <button
                onClick={() => setAmbientMode('anc')}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  ambientMode === 'anc'
                    ? 'bg-teal text-black shadow-teal-glow font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <VolumeX className="w-4 h-4" />
                <span>ANC Mode (Rest Stops)</span>
              </button>
            </div>

            {/* Mode Feature Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className={`p-4 rounded-xl border transition-all ${ambientMode === 'ambient' ? 'bg-surface-light border-amber/40 shadow-sm' : 'glass-card border-white/5 opacity-60'}`}>
                <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber" />
                  Traffic Pass-Through
                </h4>
                <p className="text-xs text-slate-400">
                  External beamforming mics feed sirens, horns, and railway signals straight into the audio mix with zero perceptual delay.
                </p>
              </div>

              <div className={`p-4 rounded-xl border transition-all ${ambientMode === 'anc' ? 'bg-surface-light border-teal/40 shadow-sm' : 'glass-card border-white/5 opacity-60'}`}>
                <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal" />
                  Road Fatigue Isolation
                </h4>
                <p className="text-xs text-slate-400">
                  Neutralizes continuous 100Hz engine drone and tire vibration noise during scheduled roadside rests.
                </p>
              </div>
            </div>

            {/* Mandatory Safety Disclaimer */}
            <div className="p-4 rounded-xl bg-surface/50 border border-white/5 flex items-start gap-3 text-xs text-slate-400">
              <ShieldAlert className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
              <p>
                <strong>Safety Disclaimer:</strong> {SITE_DISCLAIMERS.ambientMode}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
