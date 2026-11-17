import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { formatPrice } from '../../data/products';
import confetti from 'canvas-confetti';
import {
  X,
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Sparkles
} from 'lucide-react';
import { SITE_DISCLAIMERS } from '../../data/products';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    closeCheckout,
    checkoutStep,
    setCheckoutStep,
    cart,
    cartSubtotal,
    clearCart
  } = useStore();

  const [formData, setFormData] = useState({
    fullName: 'Athul V Pillai',
    email: 'athul@example.com',
    phone: '+91 98765 43210',
    address: '42 Tech Corridor, Outer Ring Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560103',
    country: 'India',
    paymentMethod: 'card',
    cardNumber: '4242 •••• •••• 4242',
    cardExp: '11/28',
    cardCvc: '•••'
  });

  const [orderRef, setOrderRef] = useState('');

  if (!isCheckoutOpen) return null;

  const subtotal = cartSubtotal();

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkoutStep === 1) {
      setCheckoutStep(2);
    } else if (checkoutStep === 2) {
      const generatedRef = `VYR-FOUNDER-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderRef(generatedRef);
      setCheckoutStep(3);
      clearCart();

      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2DD4BF', '#F59E0B', '#38BDF8']
        });
      } catch {
        // Safe fallback
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[110] overflow-y-auto bg-black/80 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-[#07090C] border border-white/10 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Checkout Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-surface/70">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-white">vayro Checkout</span>
            <span className="text-[11px] font-mono text-teal bg-teal-dim px-2.5 py-0.5 rounded-full border border-teal/20">
              Founder Batch 1
            </span>
          </div>
          <button
            onClick={closeCheckout}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-surface-light border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step progress indicator */}
        <div className="px-6 py-3 bg-surface/40 border-b border-white/5 flex items-center justify-between text-xs">
          <div className={`flex items-center gap-2 ${checkoutStep >= 1 ? 'text-teal font-bold' : 'text-slate-500'}`}>
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[11px]">1</span>
            <span>Shipping</span>
          </div>
          <div className="w-8 sm:w-16 h-px bg-white/10" />
          <div className={`flex items-center gap-2 ${checkoutStep >= 2 ? 'text-teal font-bold' : 'text-slate-500'}`}>
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[11px]">2</span>
            <span>Payment</span>
          </div>
          <div className="w-8 sm:w-16 h-px bg-white/10" />
          <div className={`flex items-center gap-2 ${checkoutStep === 3 ? 'text-teal font-bold' : 'text-slate-500'}`}>
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[11px]">3</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {/* STEP 1: Shipping Address */}
          {checkoutStep === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">Delivery & Founder Details</h3>
                <p className="text-xs text-slate-400">
                  Where should we dispatch your hardware when Batch 1 commences dispatch?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs text-slate-300 font-medium">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface border border-white/10 text-sm text-white focus:outline-none focus:border-teal/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-medium">Email (for dispatch tracking)</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface border border-white/10 text-sm text-white focus:outline-none focus:border-teal/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-medium">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface border border-white/10 text-sm text-white focus:outline-none focus:border-teal/50"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs text-slate-300 font-medium">Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface border border-white/10 text-sm text-white focus:outline-none focus:border-teal/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-medium">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface border border-white/10 text-sm text-white focus:outline-none focus:border-teal/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-medium">Postal / ZIP Code</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface border border-white/10 text-sm text-white focus:outline-none focus:border-teal/50"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-white/10">
                <div className="text-xs text-slate-400">
                  Total: <strong className="text-white text-base ml-1">{formatPrice(subtotal)}</strong>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-teal text-black font-bold text-xs uppercase tracking-wider hover:bg-teal-glow shadow-teal-glow transition-all flex items-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Stripe Payment Placeholder */}
          {checkoutStep === 2 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">Payment Method</h3>
                <p className="text-xs text-slate-400">
                  Your order is held in secure escrow and is 100% refundable before dispatch.
                </p>
              </div>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    formData.paymentMethod === 'card'
                      ? 'bg-teal-dim border-teal text-white shadow-teal-glow/20'
                      : 'bg-surface border-white/10 text-slate-400'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1 text-teal" />
                  <span className="text-xs font-semibold block">Credit / Debit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    formData.paymentMethod === 'upi'
                      ? 'bg-teal-dim border-teal text-white shadow-teal-glow/20'
                      : 'bg-surface border-white/10 text-slate-400'
                  }`}
                >
                  <Sparkles className="w-5 h-5 mx-auto mb-1 text-teal" />
                  <span className="text-xs font-semibold block">Instant UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'apple' })}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    formData.paymentMethod === 'apple'
                      ? 'bg-teal-dim border-teal text-white shadow-teal-glow/20'
                      : 'bg-surface border-white/10 text-slate-400'
                  }`}
                >
                  <Lock className="w-5 h-5 mx-auto mb-1 text-teal" />
                  <span className="text-xs font-semibold block">Apple / Google Pay</span>
                </button>
              </div>

              {/* Mock Stripe Card Form */}
              <div className="p-5 rounded-2xl bg-surface border border-white/10 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-white/5">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-teal" />
                    Stripe 256-bit Encrypted Payment Gateway
                  </span>
                  <span className="font-mono text-teal">TEST MODE READY</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-medium">Card Number</label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#05070A] border border-white/10 text-sm font-mono text-white focus:outline-none focus:border-teal/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-medium">Expires (MM/YY)</label>
                    <input
                      type="text"
                      value={formData.cardExp}
                      onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#05070A] border border-white/10 text-sm font-mono text-white focus:outline-none focus:border-teal/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-medium">CVC Security Code</label>
                    <input
                      type="password"
                      value={formData.cardCvc}
                      onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#05070A] border border-white/10 text-sm font-mono text-white focus:outline-none focus:border-teal/50"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setCheckoutStep(1)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-teal text-black font-extrabold text-xs uppercase tracking-wider hover:bg-teal-glow shadow-teal-glow transition-all flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-black" />
                  <span>Confirm Order — {formatPrice(subtotal)}</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Order Confirmation */}
          {checkoutStep === 3 && (
            <div className="text-center py-6 space-y-6 animate-scale-up">
              <div className="w-20 h-20 rounded-full bg-teal-dim border border-teal/40 mx-auto flex items-center justify-center text-teal shadow-teal-glow">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Founder Reservation Confirmed!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  You are officially secured in Priority Founder Batch 1. A confirmation receipt and backer agreement have been sent to <strong className="text-teal">{formData.email}</strong>.
                </p>
              </div>

              {/* Order Reference Box */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-surface border border-white/10 space-y-3 text-left">
                <div className="flex justify-between items-center text-xs pb-3 border-b border-white/5">
                  <span className="text-slate-400">Reservation Reference</span>
                  <span className="font-mono font-bold text-teal text-sm">{orderRef}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Queue Priority</span>
                  <span className="font-mono text-white">Founder Batch 1 (#142)</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Projected Dispatch</span>
                  <span className="text-white font-medium">{SITE_DISCLAIMERS.shippingBatch}</span>
                </div>
                <div className="flex justify-between items-center text-xs pt-3 border-t border-white/5">
                  <span className="text-slate-400">Refund Guarantee</span>
                  <span className="text-teal font-medium">100% Refundable Anytime</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={closeCheckout}
                  className="px-8 py-3.5 rounded-xl bg-teal text-black font-bold text-xs uppercase tracking-wider hover:bg-teal-glow shadow-teal-glow transition-all"
                >
                  Return to Ecosystem
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
