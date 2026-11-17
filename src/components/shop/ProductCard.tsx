import React, { useState } from 'react';
import { Product } from '../../types';
import { useStore } from '../../store/useStore';
import { formatPrice } from '../../data/products';
import { RotatingProduct } from '../common/RotatingProduct';
import { ShoppingBag, Eye, Check, HardDrive } from 'lucide-react';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart, openProductDetail } = useStore();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Matte Obsidian');
  const [isHovered, setIsHovered] = useState(false);

  const isModelWithFrames = ['pro', 'lite', 'dashcam'].includes(product.modelType);
  const productFrameType = product.modelType as 'pro' | 'lite' | 'dashcam';

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass-card glass-card-hover rounded-3xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between relative group"
    >
      {/* Top badges */}
      <div className="flex items-center justify-between mb-4">
        {product.badge ? (
          <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-dim text-teal border border-teal/30">
            {product.badge}
          </span>
        ) : (
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
            vayro Ecosystem
          </span>
        )}
        <span className="text-[11px] text-slate-400 font-medium">
          {product.estimatedShipping}
        </span>
      </div>

      {/* 360 Product Frame Preview Container */}
      <div className="w-full h-56 rounded-2xl bg-[#05070A]/90 border border-white/5 relative overflow-hidden flex items-center justify-center mb-6">
        {isModelWithFrames ? (
          <RotatingProduct
            product={productFrameType}
            mode="drag"
            autoRotate={isHovered}
            autoRotateSpeed={0.4}
            showFloorShadow={true}
            showGlow={true}
            glowColor="#2DD4BF"
            className="w-full h-full p-2"
            alt={product.name}
          />
        ) : (
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-surface border border-teal/30 flex items-center justify-center text-teal shadow-teal-glow">
              <HardDrive className="w-8 h-8" />
            </div>
            <span className="text-xs font-mono text-slate-300">High-Endurance V30 NAND</span>
          </div>
        )}

        {/* Quick View Button */}
        <button
          onClick={() => openProductDetail(product)}
          className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-surface/90 hover:bg-surface-light border border-white/10 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-all shadow-md backdrop-blur-md z-10"
        >
          <Eye className="w-3.5 h-3.5 text-teal" />
          <span>360° Specs</span>
        </button>
      </div>

      {/* Product Details */}
      <div className="space-y-3 mb-6">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-teal transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2">
            {product.shortDesc}
          </p>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-2xl font-extrabold text-white">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-slate-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="text-[11px] text-teal font-medium ml-1">
            Launch Price
          </span>
        </div>
        <p className="text-[11px] text-slate-500">
          Price shown is the launch price. Final price and taxes to be confirmed.
        </p>

        {/* Colorway Selection */}
        {product.colors.length > 1 && (
          <div className="pt-2">
            <span className="text-[11px] text-slate-400 block mb-2">
              Colorway: <strong className="text-slate-200">{selectedColor}</strong>
            </span>
            <div className="flex items-center gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  title={c.name}
                  className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                    selectedColor === c.name
                      ? 'border-teal scale-110 shadow-teal-glow'
                      : 'border-white/20 hover:border-white/50'
                  }`}
                  style={{ backgroundColor: c.hex }}
                >
                  {selectedColor === c.name && (
                    <Check className="w-3 h-3 text-white drop-shadow" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* What's included list */}
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-300 pt-2 border-t border-white/5">
          What&apos;s included
        </p>
        <ul className="space-y-1.5 text-xs text-slate-300 pt-2">
          {product.whatsInTheBox.slice(0, 4).map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
              <span className="line-clamp-1">{item.item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cart Actions */}
      <div className="space-y-2">
        <button
          onClick={() => addToCart(product, selectedColor)}
          className="w-full py-3.5 rounded-xl bg-teal hover:bg-teal-glow text-black font-bold text-xs uppercase tracking-wider transition-all shadow-teal-glow flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4 text-black" />
          <span>Add to cart</span>
        </button>

        <p className="text-[11px] text-center text-slate-500">
          Priority insured shipping included
        </p>
      </div>
    </div>
  );
};
