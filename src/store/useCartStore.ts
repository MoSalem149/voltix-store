import { create } from "zustand";
import { CartItem } from "@/interfaces/types";
import { Product } from "@/interfaces/product";

interface CartStore {
  items: CartItem[];
  userId: string | null;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  loadForUser: (userId: string) => void;
  clearForLogout: () => void;
}

const getUserCartKey = (userId: string) => `cart-store-${userId}`;
const GUEST_CART_KEY = "cart-store-guest";

const saveItems = (key: string, items: CartItem[]) => {
  try { localStorage.setItem(key, JSON.stringify(items)); } catch {}
};

export const useCartStore = create<CartStore>()((set, get) => ({
  items: [],
  userId: null,

  loadForUser: (userId: string) => {
    const userKey = getUserCartKey(userId);
    try {
      // Merge guest cart into user cart
      const guestRaw = localStorage.getItem(GUEST_CART_KEY);
      const guestItems: CartItem[] = guestRaw ? JSON.parse(guestRaw) : [];
      const userRaw = localStorage.getItem(userKey);
      const userItems: CartItem[] = userRaw ? JSON.parse(userRaw) : [];

      const merged = [...userItems];
      guestItems.forEach((guestItem) => {
        const existing = merged.find((i) => i.id === guestItem.id);
        if (existing) {
          existing.quantity += guestItem.quantity;
        } else {
          merged.push(guestItem);
        }
      });

      localStorage.removeItem(GUEST_CART_KEY);
      saveItems(userKey, merged);
      set({ items: merged, userId });
    } catch {
      set({ items: [], userId });
    }
  },

  clearForLogout: () => {
    // Save current items as guest cart
    const state = get();
    if (state.items.length > 0) {
      saveItems(GUEST_CART_KEY, state.items);
    }
    set({ items: [], userId: null });
  },

  addToCart: (product: Product, quantity: number) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        );
      } else {
        newItems = [...state.items, { ...product, quantity }];
      }
      const key = state.userId ? getUserCartKey(state.userId) : GUEST_CART_KEY;
      saveItems(key, newItems);
      return { items: newItems };
    }),

  removeFromCart: (productId: number) =>
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== productId);
      const key = state.userId ? getUserCartKey(state.userId) : GUEST_CART_KEY;
      saveItems(key, newItems);
      return { items: newItems };
    }),

  updateQuantity: (productId: number, quantity: number) =>
    set((state) => {
      const newItems = state.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      );
      const key = state.userId ? getUserCartKey(state.userId) : GUEST_CART_KEY;
      saveItems(key, newItems);
      return { items: newItems };
    }),

  clearCart: () =>
    set((state) => {
      const key = state.userId ? getUserCartKey(state.userId) : GUEST_CART_KEY;
      try { localStorage.removeItem(key); } catch {}
      return { items: [] };
    }),

  getTotal: () => {
    const state = get();
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getItemCount: () => {
    const state = get();
    return state.items.reduce((count, item) => count + item.quantity, 0);
  },
}));
