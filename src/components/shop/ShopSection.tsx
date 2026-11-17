import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from './ProductCard';
import { VariantComparisonTable } from './VariantComparisonTable';
import { RotatingProduct } from '../common/RotatingProduct';
import { ConceptBadge } from '../common/ConceptBadge';
import { ShoppingBag, Rotate3D, Sparkles, ShieldCheck } from 'lucide-react';
import { SITE_DISCLAIMERS } from '../../data/products';

export const ShopSection: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState<'pro' | 'lite'>('pro');

  return (
    <section id="shop-catalog" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-dim border border-teal/30 text-teal text-xs font-semibold uppercase tracking-wider">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Shop • Founder Batch 1</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Choose Your vayro Ecosystem
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Choose from two driver-safety products with priority manufacturing and complimentary lifetime firmware upgrades.
          </p>
        </div>

        {/* 360 Interactive Variant Inspector Feature */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-teal mb-1">
                <Rotate3D className="w-4 h-4" />
                <span>Interactive 360° Audio Variant Viewer</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Choose your companion audio form-factor
              </h3>
            </div>

            {/* Pro vs Lite Toggle */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-surface border border-white/10">
              <button
                onClick={() => setSelectedVariant('pro')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedVariant === 'pro'
                    ? 'bg-teal text-black shadow-teal-glow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                vayro Pro
              </button>
              <button
                onClick={() => setSelectedVariant('lite')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedVariant === 'lite'
                    ? 'bg-teal text-black shadow-teal-glow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                vayro Lite
              </button>
            </div>
          </div>

          {/* 360 Canvas Box using RotatingProduct with pro/lite frames */}
          <div className="w-full h-[400px] sm:h-[480px] rounded-2xl bg-[#05070A] border border-white/5 relative overflow-hidden flex items-center justify-center">
            <div className="absolute top-4 left-4 z-20">
              <ConceptBadge />
            </div>

            <RotatingProduct
              product={selectedVariant}
              mode="drag"
              autoRotate={true}
              autoRotateSpeed={0.2}
              showFloorShadow={true}
              showGlow={true}
              glowColor="#2DD4BF"
              className="w-full h-full p-4"
              alt={`vayro ${selectedVariant === 'pro' ? 'Pro Neckband' : 'Lite TWS'} 360 rotation view`}
            />

            <div className="absolute bottom-4 left-4 right-4 text-center text-xs text-slate-400 bg-surface/80 backdrop-blur-md py-2 px-4 rounded-xl border border-white/5 pointer-events-none z-10">
              Drag or swipe left/right to rotate 360° • Left/Right arrow keys supported
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">
              Products & Hardware
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {PRODUCTS.length} Available Configurations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Variant Comparison Table */}
        <div className="space-y-6 pt-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold text-white">
              Compare Hardware Profiles
            </h3>
            <p className="text-xs text-slate-400">
              Pick the ergonomics optimized for your weekly driving duration and cabin environment.
            </p>
          </div>

          <VariantComparisonTable />
        </div>
      </div>
    </section>
  );
};
