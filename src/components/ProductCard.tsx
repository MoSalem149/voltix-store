"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/interfaces/product";
import WishlistButton from "./WishlistButton";
import AddToCartClient from "./AddToCartClient";
import ProductDescriptionToggle from "./ProductDescriptionToggle";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-800 bg-gray-900 p-6 transition hover:-translate-y-1 hover:border-cyan-400">
      <div className="mb-4 flex justify-end">
        <WishlistButton product={product} />
      </div>

      <div className="mb-6 overflow-hidden rounded-2xl bg-white">
        <Image
          width={500}
          height={500}
          src={product.thumbnail}
          alt={product.title}
          className="h-56 w-full object-cover transition hover:scale-105"
        />
      </div>

      <h3 className="mb-3 text-xl font-bold">{product.title}</h3>

      <p className="mb-2 text-sm text-gray-400 capitalize">{product.category}</p>

      <ProductDescriptionToggle description={product.description} />

      <p className="mb-5 text-lg font-semibold text-cyan-400">${product.price}</p>

      <div className="flex gap-2">
        <Link
          href={`/product/${product.id}`}
          className="flex-1 rounded-xl bg-gray-700 px-4 py-3 text-center font-semibold text-white transition hover:bg-gray-600"
        >
          Details
        </Link>
        <AddToCartClient product={product} />
      </div>
    </div>
  );
}
