import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { formatPrice } from '../../data/products';
import { RotatingProduct } from '../common/RotatingProduct';
import { ConceptBadge } from '../common/ConceptBadge';
import {
  X,
  ShoppingBag,
  RotateCcw,
  Check,
  Shield,
  Box,
  Cpu,
  Truck,
  HardDrive
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProductForDetail, closeProductDetail, addToCart } = useStore();
  const product = selectedProductForDetail;

  const [selectedColor, setSelectedColor] = useState(
    product?.colors[0]?.name || 'Matte Obsidian'
  );
  const [activeTab, setActiveTab] = useState<'specs' | 'box' | 'faq'>('specs');
  const [autoRotate, setAutoRotate] = useState(true);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, selectedColor);
    closeProductDetail();
  };

  const isModelWithFrames = ['pro', 'lite', 'dashcam'].includes(product.modelType);
  const frameProductType = (product.modelType === 'pro' ? 'pro' : product.modelType === 'lite' ? 'lite' : 'dashcam') as 'pro' | 'lite' | 'dashcam';

  return (
    <div className="fixed inset-0 z-[110] overflow-y-auto bg-black/85 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-[#07090C] border border-white/10 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-surface/60">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-teal">
              Interactive 360° Inspector
            </span>
            <ConceptBadge />
          </div>
          <button
            onClick={closeProductDetail}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-surface-light border border-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* 360 Rotating Viewer Canvas */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="w-full h-[380px] sm:h-[460px] rounded-3xl bg-surface border border-white/10 relative overflow-hidden flex items-center justify-center">
                {isModelWithFrames ? (
                  <RotatingProduct
                    product={frameProductType}
                    mode="drag"
                    autoRotate={autoRotate}
                    autoRotateSpeed={0.25}
                    showFloorShadow={true}
                    showGlow={true}
                    glowColor="#2DD4BF"
                    className="w-full h-full p-6"
                    alt={product.name}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-20 h-20 rounded-3xl bg-surface-light border border-teal/40 flex items-center justify-center text-teal shadow-teal-glow">
                      <HardDrive className="w-10 h-10" />
                    </div>
                    <span className="text-sm font-mono text-slate-300">128GB High-Endurance V30 NAND</span>
                  </div>
                )}

                {/* 3D Viewer Control overlay */}
                {isModelWithFrames && (
                  <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                    <button
                      onClick={() => setAutoRotate(!autoRotate)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border backdrop-blur-md transition-all flex items-center gap-1.5 ${
                        autoRotate
                          ? 'bg-teal-dim border-teal/40 text-teal'
                          : 'bg-surface/80 border-white/10 text-slate-300'
                      }`}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{autoRotate ? 'Pause Orbit' : 'Auto Orbit'}</span>
                    </button>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 text-center text-[11px] text-slate-400 bg-surface/70 backdrop-blur-md py-1.5 px-3 rounded-xl border border-white/5 pointer-events-none z-10">
                  Drag left/right to rotate 360° • Left and Right arrow keys supported
                </div>
              </div>
            </div>

            {/* Product Purchase & Summary info */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                  <span className="text-xs font-semibold text-teal tracking-wider uppercase mb-1 block">
                    {product.badge || 'vayro Edition'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {product.name}
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  {product.subtitle}
                </p>
              </div>

              {/* Price & Shipping */}
              <div className="p-4 rounded-2xl bg-surface-light border border-white/5 space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-white">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-slate-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs text-teal font-medium ml-1">
                    Launch Price
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Truck className="w-4 h-4 text-teal" />
                  <span>{product.estimatedShipping}</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Price shown is the launch price. Final price and taxes to be confirmed.
                </p>
              </div>

              {/* Colorways */}
              <div>
                <span className="text-xs text-slate-300 font-medium block mb-2">
                  Finish: <strong className="text-white">{selectedColor}</strong>
                </span>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all ${
                        selectedColor === c.name
                          ? 'bg-teal-dim border-teal text-white shadow-teal-glow/20'
                          : 'bg-surface border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {product.description}
              </p>

              <button
                onClick={handleAddToCart}
                className="w-full py-4 rounded-2xl bg-teal hover:bg-teal-glow text-black font-extrabold text-sm uppercase tracking-wider transition-all shadow-teal-glow flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5 text-black" />
                <span>Add to cart — {formatPrice(product.price)}</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs (Specs, What's in the Box) */}
          <div className="pt-6 border-t border-white/10">
            <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'specs'
                    ? 'bg-teal-dim text-teal border border-teal/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span>Technical Specifications</span>
              </button>

              <button
                onClick={() => setActiveTab('box')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'box'
                    ? 'bg-teal-dim text-teal border border-teal/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Box className="w-4 h-4" />
                <span>What’s In The Box</span>
              </button>
            </div>

            {/* Tab: Specs */}
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                {product.specs.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-teal">
                      {group.category}
                    </h4>
                    <div className="divide-y divide-white/5 border border-white/5 rounded-2xl bg-surface/40 p-4">
                      {group.items.map((item, iIdx) => (
                        <div key={iIdx} className="py-2.5 flex flex-col sm:flex-row sm:justify-between text-xs gap-1">
                          <span className="text-slate-400 font-medium">{item.label}</span>
                          <span className="text-slate-200 text-left sm:text-right font-mono">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: What's In The Box */}
            {activeTab === 'box' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
                {product.whatsInTheBox.map((boxItem, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-surface border border-white/5 flex flex-col justify-between"
                  >
                    <span className="text-xs font-mono text-teal font-bold mb-2">
                      {boxItem.qty}
                    </span>
                    <p className="text-sm text-slate-200 font-medium">
                      {boxItem.item}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sticky Bottom Bar */}
        <div className="p-4 border-t border-white/10 bg-surface/90 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 hidden sm:inline">Selected item:</span>
            <span className="text-lg font-bold text-white">{product.name}</span>
            <span className="text-base font-extrabold text-teal">{formatPrice(product.price)}</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="px-6 py-2.5 rounded-xl bg-teal text-black font-bold text-xs uppercase tracking-wider hover:bg-teal-glow transition-all shadow-teal-glow"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
