import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import FeaturedSection from "@/components/FeaturedSection";

export const metadata: Metadata = {
  title: "Voltix Store - Modern Electronics E-commerce",
  description:
    "Shop the latest electronics and gadgets at Voltix Store. Fast shipping, secure checkout, and exclusive deals on premium products.",
  keywords: ["electronics", "gadgets", "online store", "e-commerce"],
  authors: [{ name: "Voltix Store" }],
  openGraph: {
    title: "Voltix Store - Modern Electronics E-commerce",
    description:
      "Shop the latest electronics and gadgets at Voltix Store. Fast shipping, secure checkout, and exclusive deals.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voltix Store - Modern Electronics E-commerce",
    description: "Shop the latest electronics and gadgets at Voltix Store.",
  },
};

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden px-6 py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.15),transparent_55%)]" />
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Voltix Store
          </p>
          <h1 className="max-w-3xl text-5xl font-black leading-tight text-white md:text-6xl">
            Modern electronics for the way you live.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-400">
            Discover premium products, fast shipping, and unbeatable prices.
            Browse freely — sign in when you want to save your cart and wishlist.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
            >
              Shop Products
            </Link>
            <Link
              href="/category"
              className="rounded-lg border border-gray-700 px-6 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-300"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="flex min-h-[40vh] items-center justify-center px-6">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
          </div>
        }
      >
        <FeaturedSection />
      </Suspense>
    </>
  );
}
