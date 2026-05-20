"use client";

import { useWishlistStore } from "@/store/useWishlistStore";
import { Product } from "@/interfaces/product";

interface WishlistButtonProps {
  product: Product;
  className?: string;
}

export default function WishlistButton({ product, className = "" }: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className={`text-2xl transition hover:scale-110 ${className}`}
      title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      {inWishlist ? "❤️" : "🤍"}
    </button>
  );
}
