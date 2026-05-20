"use client";

import { useWishlistStore } from "@/store/useWishlistStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import WishlistButton from "@/components/WishlistButton";

export default function WishlistPage() {
  const { status } = useSession();
  const router = useRouter();
  const { items } = useWishlistStore();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl text-center text-gray-400">
          {status === "loading" ? "Loading..." : "Redirecting to login..."}
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-black text-white">My Wishlist</h1>
          <div className="mt-12 text-center">
            <p className="mb-6 text-gray-400">Your wishlist is empty</p>
            <Link
              href="/products"
              className="inline-block rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-black text-white">My Wishlist</h1>
        <p className="mt-2 text-gray-400">{items.length} items saved</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-3xl border border-gray-800 bg-gray-900 p-6 transition hover:-translate-y-1 hover:border-cyan-400"
            >
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
              <p className="mb-2 text-sm text-gray-400 capitalize">
                {product.category}
              </p>
              <p className="mb-5 text-lg font-semibold text-cyan-400">
                ${product.price}
              </p>
              <div className="flex gap-2">
                <Link
                  href={`/product/${product.id}`}
                  className="flex-1 rounded-xl bg-gray-700 px-4 py-3 text-center font-semibold text-white transition hover:bg-gray-600"
                >
                  Details
                </Link>
                <Link
                  href={`/cart/${product.id}`}
                  className="flex-1 rounded-xl bg-cyan-500 px-4 py-3 text-center font-semibold text-black transition hover:bg-cyan-400"
                >
                  Add to Cart
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
