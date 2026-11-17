import { create } from 'zustand';
import { Product, CartItem, ActivePage } from '../types';
import { playDrowsinessAlertSound } from '../utils/audioAlert';

interface ToastNotification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'alert';
}

interface AppState {
  // Navigation
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, selectedColor?: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: () => number;
  cartSubtotal: () => number;

  // Product Detail Modal
  selectedProductForDetail: Product | null;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;

  // Checkout Modal
  isCheckoutOpen: boolean;
  checkoutStep: 1 | 2 | 3;
  openCheckout: () => void;
  closeCheckout: () => void;
  setCheckoutStep: (step: 1 | 2 | 3) => void;

  // Interactive 3D Demos
  ambientMode: 'anc' | 'ambient';
  setAmbientMode: (mode: 'anc' | 'ambient') => void;
  isAlertActive: boolean;
  triggerDrowsinessAlert: () => void;

  // Toast notifications
  toast: ToastNotification | null;
  showToast: (message: string, type?: 'info' | 'success' | 'alert') => void;
  hideToast: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  activePage: 'home',
  setActivePage: (page) => {
    set({ activePage: page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  cart: [],
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  addToCart: (product, selectedColor, quantity = 1) => {
    const color = selectedColor || product.colors[0]?.name || 'Matte Obsidian';
    const existingIndex = get().cart.findIndex(
      (item) => item.product.id === product.id && item.selectedColor === color
    );

    if (existingIndex > -1) {
      const updatedCart = [...get().cart];
      updatedCart[existingIndex].quantity += quantity;
      set({ cart: updatedCart, isCartOpen: true });
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${color}-${Date.now()}`,
        product,
        quantity,
        selectedColor: color,
      };
      set({ cart: [...get().cart, newItem], isCartOpen: true });
    }

    get().showToast(`Added ${product.name} to your cart`, 'success');
  },

  removeFromCart: (itemId) => {
    set({ cart: get().cart.filter((item) => item.id !== itemId) });
  },

  updateQuantity: (itemId, delta) => {
    const updated = get().cart.map((item) => {
      if (item.id === itemId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[];

    set({ cart: updated });
  },

  clearCart: () => set({ cart: [] }),

  cartCount: () => {
    return get().cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  cartSubtotal: () => {
    return get().cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  },

  selectedProductForDetail: null,
  openProductDetail: (product) => set({ selectedProductForDetail: product }),
  closeProductDetail: () => set({ selectedProductForDetail: null }),

  isCheckoutOpen: false,
  checkoutStep: 1,
  openCheckout: () => set({ isCheckoutOpen: true, isCartOpen: false, checkoutStep: 1 }),
  closeCheckout: () => set({ isCheckoutOpen: false }),
  setCheckoutStep: (step) => set({ checkoutStep: step }),

  ambientMode: 'ambient',
  setAmbientMode: (mode) => set({ ambientMode: mode }),

  isAlertActive: false,
  triggerDrowsinessAlert: () => {
    set({ isAlertActive: true });
    playDrowsinessAlertSound();
    setTimeout(() => {
      set({ isAlertActive: false });
    }, 2500);
  },

  toast: null,
  showToast: (message, type = 'info') => {
    const toast = { id: Math.random().toString(), message, type };
    set({ toast });
    setTimeout(() => {
      if (get().toast?.id === toast.id) {
        set({ toast: null });
      }
    }, 3500);
  },
  hideToast: () => set({ toast: null }),
}));
