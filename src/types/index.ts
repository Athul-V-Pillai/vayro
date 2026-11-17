export interface ProductColor {
  name: string;
  hex: string;
  badge?: string;
}

export interface ProductSpecItem {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  estimatedShipping: string;
  description: string;
  shortDesc: string;
  modelType: 'pro' | 'lite' | 'dashcam' | 'accessory';
  colors: ProductColor[];
  highlights: string[];
  specs: {
    category: string;
    items: ProductSpecItem[];
  }[];
  whatsInTheBox: {
    item: string;
    qty: string;
  }[];
  comparison: {
    batteryLife: string;
    formFactor: string;
    contents: string;
    controls: string;
    chargingCase: string;
    alertLatency: string;
    ancSupport: string;
    ambientMode: string;
  };
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type ActivePage = 
  | 'home' 
  | 'features' 
  | 'shop' 
  | 'companion'
  | 'faq';
