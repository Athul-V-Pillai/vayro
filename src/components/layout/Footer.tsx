import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { SITE_DISCLAIMERS } from '../../data/products';
import { ShieldCheck, Mail, ArrowRight, ExternalLink, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#05070A] border-t border-white/10 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-surface border border-teal/40 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-teal"
                  viewBox="0 0 100 100"
                  fill="none"
                >
                  <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" opacity="0.4" />
                  <path
                    d="M32 46L50 64L68 36"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="68" cy="36" r="5" fill="#F59E0B" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                vayro<span className="text-teal">.</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Pioneering next-generation AI driver safety. Integrating dual-camera edge vision with ultra-low latency binaural alert earbuds to eliminate drowsy-driving tragedies.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-white/5 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-teal" />
              <span>1-Year Hardware Limited Replacement Warranty</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Ecosystem</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setActivePage('home')} className="hover:text-teal transition-colors">
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('features')} className="hover:text-teal transition-colors">
                  AI Drowsiness Detection
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('shop')} className="hover:text-teal transition-colors">
                  vayro Pro (Neckband)
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('shop')} className="hover:text-teal transition-colors">
                  vayro Lite (TWS)
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('companion')} className="hover:text-teal transition-colors">
                  Companion App
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Operations</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-slate-500 cursor-not-allowed">Warranty Registration (At Dispatch)</span>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">Returns & Exchanges (100% Refundable)</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Waitlist Signup */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Founder Newsletter</h4>
            <p className="text-xs text-slate-400">
              Receive batch production updates, engineering logs, and early dispatch windows.
            </p>
            {isSubscribed ? (
              <div className="p-3 rounded-xl bg-teal-dim border border-teal/40 text-teal flex items-center gap-2 text-xs">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>You are subscribed to Founder Updates!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-surface border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal/50"
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-teal text-black hover:opacity-90 transition-opacity"
                    aria-label="Submit email"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Mandatory Regulatory & Prototype Disclaimers */}
        <div className="my-8 p-5 rounded-2xl bg-surface/50 border border-white/5 space-y-2.5 text-[11px] leading-relaxed text-slate-500">
          <p className="font-semibold text-slate-400 tracking-wider uppercase text-[10px]">
            Regulatory Notice & Operational Disclaimers
          </p>
          <p>
            <strong className="text-slate-400">Drowsiness Detection:</strong> {SITE_DISCLAIMERS.drowsiness}
          </p>
          <p>
            <strong className="text-slate-400">Acoustic Awareness:</strong> {SITE_DISCLAIMERS.ambientMode}
          </p>
          <p>
            <strong className="text-slate-400">Compliance & Driving Safety:</strong> {SITE_DISCLAIMERS.compliance}
          </p>
          <p>
            <strong className="text-slate-400">Concept:</strong> {SITE_DISCLAIMERS.prototypeNotice}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} vayro Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Compliance Data</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
