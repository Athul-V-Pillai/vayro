import React from 'react';
import { AlertCircle, Clock, EyeOff, ShieldCheck } from 'lucide-react';

export const ProblemStatement: React.FC = () => {
  return (
    <section className="py-24 bg-[#05070A] border-y border-white/5 relative overflow-hidden">
      {/* Background soft ambient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-dim rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-dim border border-amber/30 text-amber text-xs font-semibold uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>The Fatigue Reality</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Micro-sleep happens in the blink of an eye.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Driver fatigue does not begin with falling asleep at the wheel. It begins quietly with sluggish micro-blinks, involuntary head-pitch drooping, and cognitive tunnel vision. At highway speeds, three seconds of micro-sleep means your vehicle travels the length of an entire football field completely unguided.
          </p>
        </div>

        {/* 3 Grounded Structural Facts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="glass-card p-8 rounded-2xl border border-white/5 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-surface-light border border-teal/20 flex items-center justify-center text-teal">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">The Vulnerable Window</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Fatigue incidents disproportionately peak during circadian low points: between 2:00 AM – 6:00 AM and during the post-lunch slump between 2:00 PM – 4:00 PM.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl border border-white/5 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-surface-light border border-amber/20 flex items-center justify-center text-amber">
              <EyeOff className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Passive Warnings Fail</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Generic car dashboard chimes are easily drowned out by radio noise, conversation, or sleep stupor. Binaural in-ear alert chimes directly target the brain’s acoustic arousal center.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl border border-white/5 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-surface-light border border-teal/20 flex items-center justify-center text-teal">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Predictive, Not Reactive</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Standard lane-departure sensors only intervene after your vehicle has already crossed highway markers. vayro acts before you drift, tracking biological ocular fatigue precursors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
