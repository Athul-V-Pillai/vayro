import React from 'react';
import { useStore } from '../../store/useStore';
import { RotatingProduct } from '../common/RotatingProduct';
import { ConceptBadge } from '../common/ConceptBadge';
import { ArrowRight, Play, ShieldAlert, Cpu, Sparkles } from 'lucide-react';
import { SITE_DISCLAIMERS } from '../../data/products';

export const HeroSection: React.FC = () => {
  const { setActivePage, triggerDrowsinessAlert, isAlertActive } = useStore();

  const scrollToExplainer = () => {
    const el = document.getElementById('how-it-works') || document.getElementById('exploded-explainer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background radial lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal-dark/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-amber-dim rounded-full blur-[120px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-light/80 border border-teal/30 text-teal text-xs font-semibold tracking-wider uppercase shadow-teal-glow/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Driver-Safety Ecosystem</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              A moment of sleep can{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal via-teal-glow to-amber">
                cost a life.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              The dual-camera dashcam with on-device computer vision that monitors driver drowsiness in real time—delivering instant auditory alert intervention directly to companion wireless earbuds.
            </p>

            {/* Tagline Accent */}
            <p className="text-sm font-semibold tracking-widest uppercase text-muted-dark flex items-center justify-center lg:justify-start gap-2">
              <span className="w-6 h-px bg-teal/40" />
              <span>Drive Safe. Stay Alert.</span>
              <span className="w-6 h-px bg-teal/40" />
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setActivePage('shop')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-teal hover:bg-teal-glow text-[#07090C] font-bold text-sm tracking-wide uppercase transition-all shadow-teal-glow hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={scrollToExplainer}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-surface-light border border-white/10 hover:border-teal/40 text-slate-200 hover:text-white font-medium text-sm transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 text-teal fill-teal" />
                <span>See how it works</span>
              </button>
            </div>

            {/* Interactive Alert Simulator Pill */}
            <div className="pt-2">
              <button
                onClick={triggerDrowsinessAlert}
                className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                  isAlertActive
                    ? 'bg-amber-dim text-amber border-amber shadow-amber-glow animate-pulse'
                    : 'bg-surface/60 text-slate-400 border-white/5 hover:border-amber/40 hover:text-amber'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-amber" />
                <span>
                  {isAlertActive ? 'Warning Chime Triggered!' : 'Click to test Drowsiness Alert Sound'}
                </span>
              </button>
            </div>

            {/* Founder Batch Note */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-teal" />
                <span>Edge-AI Silicon</span>
              </div>
              <span>•</span>
              <span>{SITE_DISCLAIMERS.shippingBatch}</span>
              <span>•</span>
              <span className="text-teal font-medium">Fully Refundable</span>
            </div>
          </div>

          {/* Right Column: RotatingProduct Canvas Viewer */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            {/* Concept badge overlay */}
            <div className="absolute top-4 right-4 z-20">
              <ConceptBadge />
            </div>

            {/* RotatingProduct Container */}
            <div className="w-full h-[460px] sm:h-[540px] relative rounded-3xl bg-gradient-to-b from-surface-light/40 to-surface/20 border border-white/10 backdrop-blur-sm overflow-hidden flex items-center justify-center shadow-2xl">
              <RotatingProduct
                product="dashcam"
                mode="both"
                showFloorShadow={true}
                showGlow={true}
                glowColor="#2DD4BF"
                autoRotate={true}
                autoRotateSpeed={0.2}
                className="w-full h-full p-4"
                alt="vayro dual-camera dashcam 360 view"
              />

              {/* Subtitle guidance inside canvas */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-slate-400 pointer-events-none px-2 z-10">
                <span>Scroll down or drag horizontally to rotate 360°</span>
                <span className="text-teal flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-teal animate-ping" />
                  Dual-Stream Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
