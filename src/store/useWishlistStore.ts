import { create } from "zustand";
import { Product } from "@/interfaces/product";

interface WishlistStore {
  items: Product[];
  userId: string | null;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
  getCount: () => number;
  loadForUser: (userId: string) => void;
  clearForLogout: () => void;
}

const getUserWishlistKey = (userId: string) => `wishlist-store-${userId}`;
const GUEST_WISHLIST_KEY = "wishlist-store-guest";

const saveItems = (key: string, items: Product[]) => {
  try { localStorage.setItem(key, JSON.stringify(items)); } catch {}
};

export const useWishlistStore = create<WishlistStore>()((set, get) => ({
  items: [],
  userId: null,

  loadForUser: (userId: string) => {
    const userKey = getUserWishlistKey(userId);
    try {
      const guestRaw = localStorage.getItem(GUEST_WISHLIST_KEY);
      const guestItems: Product[] = guestRaw ? JSON.parse(guestRaw) : [];
      const userRaw = localStorage.getItem(userKey);
      const userItems: Product[] = userRaw ? JSON.parse(userRaw) : [];

      const merged = [...userItems];
      guestItems.forEach((guestItem) => {
        if (!merged.some((i) => i.id === guestItem.id)) {
          merged.push(guestItem);
        }
      });

      localStorage.removeItem(GUEST_WISHLIST_KEY);
      saveItems(userKey, merged);
      set({ items: merged, userId });
    } catch {
      set({ items: [], userId });
    }
  },

  clearForLogout: () => {
    const state = get();
    if (state.items.length > 0) {
      saveItems(GUEST_WISHLIST_KEY, state.items);
    }
    set({ items: [], userId: null });
  },

  addToWishlist: (product: Product) =>
    set((state) => {
      if (state.items.some((item) => item.id === product.id)) return state;
      const newItems = [...state.items, product];
      const key = state.userId ? getUserWishlistKey(state.userId) : GUEST_WISHLIST_KEY;
      saveItems(key, newItems);
      return { items: newItems };
    }),

  removeFromWishlist: (productId: number) =>
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== productId);
      const key = state.userId ? getUserWishlistKey(state.userId) : GUEST_WISHLIST_KEY;
      saveItems(key, newItems);
      return { items: newItems };
    }),

  isInWishlist: (productId: number) => {
    return get().items.some((item) => item.id === productId);
  },

  clearWishlist: () =>
    set((state) => {
      const key = state.userId ? getUserWishlistKey(state.userId) : GUEST_WISHLIST_KEY;
      try { localStorage.removeItem(key); } catch {}
      return { items: [] };
    }),

  getCount: () => get().items.length,
}));
