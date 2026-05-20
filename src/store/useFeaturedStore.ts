import { create } from "zustand";
import { Product } from "@/interfaces/product";

interface FeaturedStore {
  featuredProducts: Product[];
  setFeaturedProducts: (products: Product[]) => void;
  addToFeatured: (product: Product) => void;
  removeFromFeatured: (productId: number) => void;
}

export const useFeaturedStore = create<FeaturedStore>((set) => ({
  featuredProducts: [],
  setFeaturedProducts: (products: Product[]) =>
    set({ featuredProducts: products }),
  addToFeatured: (product: Product) =>
    set((state) => ({
      featuredProducts: [...state.featuredProducts, product],
    })),
  removeFromFeatured: (productId: number) =>
    set((state) => ({
      featuredProducts: state.featuredProducts.filter(
        (p) => p.id !== productId,
      ),
    })),
}));
