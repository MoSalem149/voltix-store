"use client";

import { useState } from "react";
import { Product } from "@/interfaces/product";
import { useCartStore } from "@/store/useCartStore";

interface AddToCartClientProps {
  product: Product;
}

export default function AddToCartClient({ product }: AddToCartClientProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCartStore();

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      addToCart(product, 1);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      {showSuccess ? (
        <div className="flex-1 rounded-xl bg-green-600 px-4 py-3 text-center font-semibold text-white">
          Added! ✓
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="flex-1 rounded-xl bg-cyan-500 px-4 py-3 text-center font-semibold text-black transition disabled:opacity-70 hover:bg-cyan-400"
        >
          {isAdding ? "Adding..." : "Add to Cart"}
        </button>
      )}
    </>
  );
}
