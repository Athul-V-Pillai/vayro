import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { ShoppingBag, Menu, X, Shield, Volume2 } from 'lucide-react';
import { ConceptBadge } from '../common/ConceptBadge';

export const Navbar: React.FC = () => {
  const {
    openCart,
    cartCount,
    triggerDrowsinessAlert,
    isAlertActive
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // ScrollSpy active state
      const sections = [
        { id: 'companion-app', nav: 'companion' },
        { id: 'shop-catalog', nav: 'shop' },
        { id: 'features', nav: 'features' },
        { id: 'exploded-explainer', nav: 'alert-loop' },
      ];

      const scrollPos = window.scrollY + 200;
      let current = 'home';
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= scrollPos) {
          current = sec.nav;
          break;
        }
      }
      setActiveNav(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cartCount();

  const scrollToSection = (targetId: string, navKey: string) => {
    setActiveNav(navKey);
    setMobileMenuOpen(false);

    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(targetId);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { id: 'top', navKey: 'home', label: 'Ecosystem' },
    { id: 'features', navKey: 'features', label: 'Features' },
    { id: 'shop-catalog', navKey: 'shop', label: 'Shop' },
    { id: 'companion-app', navKey: 'companion', label: 'App' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07090C]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5'
          : 'bg-[#07090C]/40 backdrop-blur-md py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Prototype Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToSection('top', 'home')}
            className="flex items-center gap-2.5 focus:outline-none group text-left cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-surface-light border border-teal/40 flex items-center justify-center shadow-teal-glow transition-transform group-hover:scale-105">
              <svg
                className="w-5 h-5 text-teal"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="7" opacity="0.4" />
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
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-teal transition-colors">
                vayro<span className="text-teal">.</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-muted-dark font-medium hidden sm:block">
                Drive Safe. Stay Alert.
              </span>
            </div>
          </button>

          <div className="hidden lg:block ml-2">
            <ConceptBadge />
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-surface-glass border border-white/10 rounded-full px-3 py-1.5 shadow-glass">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id, link.navKey)}
              className={`px-4 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all cursor-pointer ${
                activeNav === link.navKey
                  ? 'bg-teal/15 text-teal border border-teal/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Controls: Audio Test Chime, Cart, Shop CTA */}
        <div className="flex items-center gap-3">
          {/* Test Alert Sound Demo Button */}
          <button
            onClick={triggerDrowsinessAlert}
            title="Simulate Drowsiness Alert Sound"
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
              isAlertActive
                ? 'bg-amber-dim text-amber border-amber animate-pulse shadow-amber-glow'
                : 'bg-surface-light/80 text-slate-300 border-white/10 hover:border-teal/40 hover:text-teal'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isAlertActive ? 'Alerting...' : 'Simulate Alert'}</span>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={openCart}
            aria-label="Shopping Cart"
            className="relative p-2.5 rounded-xl bg-surface-light border border-white/10 hover:border-teal/40 hover:text-teal transition-all text-slate-200 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-teal text-black text-xs font-bold flex items-center justify-center shadow-teal-glow animate-scale-up">
                {totalItems}
              </span>
            )}
          </button>

          {/* Quick Shop CTA */}
          <button
            onClick={() => scrollToSection('shop-catalog', 'shop')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-dark via-teal to-teal-glow text-[#07090C] font-semibold text-xs tracking-wide uppercase hover:opacity-95 shadow-teal-glow transition-all cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-black" />
            <span>Shop Now</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-surface-light border border-white/10 text-slate-300 cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 animate-fade-down space-y-4">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id, link.navKey)}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  activeNav === link.navKey
                    ? 'bg-teal-dim text-teal border border-teal/30'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                triggerDrowsinessAlert();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-surface-light border border-white/10 text-slate-200 text-sm font-medium cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-teal" />
              <span>Simulate Drowsiness Alert</span>
            </button>

            <button
              onClick={() => scrollToSection('shop-catalog', 'shop')}
              className="w-full py-3 rounded-xl bg-teal text-black font-semibold text-sm uppercase tracking-wider text-center shadow-teal-glow cursor-pointer"
            >
              Shop Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
