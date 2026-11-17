import React from 'react';
import { useStore } from '../../store/useStore';
import { formatPrice } from '../../data/products';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    closeCart,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    openCheckout
  } = useStore();

  if (!isCartOpen) return null;

  const subtotal = cartSubtotal();

  return (
    <div className="fixed inset-0 z-[110] overflow-hidden bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#07090C] border-l border-white/10 flex flex-col shadow-2xl">
          {/* Drawer Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-surface/80">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-teal" />
              <h2 className="text-lg font-bold text-white">Cart</h2>
              <span className="text-xs font-mono text-slate-400 bg-surface-light px-2 py-0.5 rounded-full border border-white/5">
                {cart.length} items
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-surface-light border border-white/10 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Insured Shipping Progress */}
          <div className="px-6 py-3 bg-teal-dim/40 border-b border-teal/20 text-xs text-teal flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-teal" />
              Complimentary Priority Insured Shipping
            </span>
            <span className="font-mono font-bold">FREE</span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-surface-light border border-white/10 flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white">Your cart is empty</h3>
                <p className="text-xs text-slate-400 max-w-xs">
                  Select vayro Pro or vayro Lite from the catalog to place your order.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-surface border border-white/5 flex gap-4 items-start"
                >
                  <div className="w-16 h-16 rounded-xl bg-[#05070A] border border-white/10 flex items-center justify-center flex-shrink-0 text-teal font-mono text-xs font-bold">
                    VYR
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Finish: <span className="text-slate-200">{item.selectedColor}</span>
                    </p>
                    <span className="text-xs font-bold text-teal mt-1 block">
                      {formatPrice(item.product.price)}
                    </span>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 p-1 rounded-lg bg-surface-light border border-white/10">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold text-white px-2">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-500 hover:text-red-400 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-surface/90 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Founder Deposit Subtotal</span>
                  <span className="text-white font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Shipping</span>
                  <span className="text-teal font-medium">Free (Batch 1 Exclusive)</span>
                </div>
                <div className="flex justify-between text-slate-200 text-sm font-bold pt-2 border-t border-white/5">
                  <span>Total Due Today</span>
                  <span className="text-xl text-teal">{formatPrice(subtotal)}</span>
                </div>
              </div>

              <button
                onClick={openCheckout}
                className="w-full py-4 rounded-2xl bg-teal hover:bg-teal-glow text-black font-extrabold text-sm uppercase tracking-wider transition-all shadow-teal-glow flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-500">
                100% refundable prior to shipment • Stripe 256-bit SSL encrypted
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
