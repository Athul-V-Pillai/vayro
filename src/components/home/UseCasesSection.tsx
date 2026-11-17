import React from 'react';
import { USE_CASES } from '../../data/products';
import { Truck, Car, PackageCheck, MoonStar, Compass, Sparkles } from 'lucide-react';

export const UseCasesSection: React.FC = () => {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Truck className="w-5 h-5 text-teal" />;
      case 1:
        return <Car className="w-5 h-5 text-teal" />;
      case 2:
        return <PackageCheck className="w-5 h-5 text-teal" />;
      case 3:
        return <MoonStar className="w-5 h-5 text-amber" />;
      default:
        return <Compass className="w-5 h-5 text-teal" />;
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-dim border border-teal/30 text-teal text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Versatile Applications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Built for High-Risk Driving Scenarios
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From cross-country commercial haulers to healthcare workers driving home at 5:00 AM, vayro guards those most vulnerable to sudden fatigue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {USE_CASES.map((uc, i) => (
            <div
              key={i}
              className="glass-card glass-card-hover p-7 rounded-3xl border border-white/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-surface-light border border-white/10 flex items-center justify-center">
                    {getIcon(i)}
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-teal bg-teal-dim px-2.5 py-1 rounded-full border border-teal/20">
                    {uc.role}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {uc.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {uc.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 text-xs text-slate-400 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                <span>{uc.stat}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
