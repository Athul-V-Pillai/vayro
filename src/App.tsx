import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { NotificationToast } from './components/layout/NotificationToast';

import { HeroSection } from './components/home/HeroSection';
import { ProblemStatement } from './components/home/ProblemStatement';
import { HowItWorksSection } from './components/home/HowItWorksSection';
import { ScrollExplodedSection } from './components/home/ScrollExplodedSection';
import { AmbientDemoSection } from './components/home/AmbientDemoSection';
import { FeatureGridSection } from './components/home/FeatureGridSection';
import { UseCasesSection } from './components/home/UseCasesSection';
import { FaqSection } from './components/home/FaqSection';

import { ShopSection } from './components/shop/ShopSection';
import { ProductDetailModal } from './components/shop/ProductDetailModal';
import { CompanionAppSection } from './components/companion/CompanionAppSection';

import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#07090C] text-slate-100 flex flex-col font-sans selection:bg-teal selection:text-black">
      {/* Global Notification Toast */}
      <NotificationToast />

      {/* Sticky Header Navbar */}
      <Navbar />

      {/* Main Content Flow */}
      <main className="flex-1">
        <HeroSection />
        <ProblemStatement />
        <HowItWorksSection />
        <ScrollExplodedSection />
        <AmbientDemoSection />
        <FeatureGridSection />
        <ShopSection />
        <CompanionAppSection />
        <UseCasesSection />
        <FaqSection />
      </main>

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Multi-Step Checkout Modal */}
      <CheckoutModal />

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal />

      {/* Footer with Legal Disclaimers & Newsletter */}
      <Footer />
    </div>
  );
};

export default App;
