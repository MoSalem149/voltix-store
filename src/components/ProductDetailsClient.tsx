"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/interfaces/product";
import { useCartStore } from "@/store/useCartStore";
import WishlistButton from "./WishlistButton";
import QuantitySelector from "./QuantitySelector";

interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCartStore();

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      addToCart(product, quantity);
      setShowSuccess(true);
      setQuantity(1);
      setTimeout(() => setShowSuccess(false), 2000);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm text-cyan-300">
            {product.category}
          </span>
          <h1 className="mt-4 text-5xl font-black">{product.title}</h1>
        </div>
        <WishlistButton product={product} className="shrink-0" />
      </div>

      <p className="text-lg leading-relaxed text-gray-300">{product.description}</p>

      <div className="space-y-2 border-y border-gray-700 py-4">
        <p className="text-xl">
          Brand: <span className="ml-2 font-semibold text-cyan-400">{product.brand}</span>
        </p>
        <p className="text-3xl font-black text-cyan-400">${product.price}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-300">Quantity</label>
          <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full rounded-xl px-6 py-4 font-semibold text-black transition ${
            showSuccess ? "bg-green-600 hover:bg-green-700" : "bg-cyan-500 hover:bg-cyan-400"
          } disabled:opacity-70`}
        >
          {isAdding ? "Adding to cart..." : showSuccess ? "Added to cart! ✓" : "Add to Cart"}
        </button>

        <Link
          href="/products"
          className="block rounded-xl border border-gray-700 px-6 py-4 text-center font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-300"
        >
          Continue Shopping
        </Link>
      </div>

      <div className="space-y-2 rounded-lg border border-gray-700 bg-gray-900/50 p-4 text-sm">
        <p className="flex items-center gap-2 text-gray-300">
          <span className="text-cyan-400">✓</span> Free shipping on orders over $50
        </p>
        <p className="flex items-center gap-2 text-gray-300">
          <span className="text-cyan-400">✓</span> 30-day money-back guarantee
        </p>
        <p className="flex items-center gap-2 text-gray-300">
          <span className="text-cyan-400">✓</span> 2-year warranty
        </p>
      </div>
    </div>
  );
}
