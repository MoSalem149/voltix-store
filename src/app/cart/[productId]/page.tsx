"use client";

import { useCartStore } from "@/store/useCartStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import CartItemCard from "@/components/CartItemCard";
import OrderSummary from "@/components/OrderSummary";

const shippingCosts: Record<string, number> = {
  standard: 5.99,
  express: 14.99,
  overnight: 29.99,
};

export default function CartPage() {
  const router = useRouter();
  const { status } = useSession();
  const { items, removeFromCart, updateQuantity, getTotal } = useCartStore();
  const [shippingOption, setShippingOption] = useState("standard");

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
          <h1 className="text-4xl font-black text-white">Shopping Cart</h1>
          <div className="mt-8 text-center">
            <p className="mb-6 text-gray-400">Your cart is empty</p>
            <Link
              href="/products"
              className="inline-block rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const subtotal = getTotal();
  const shippingCost = shippingCosts[shippingOption] || 5.99;
  const tax = subtotal * 0.1;

  return (
    <section className="px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-black text-white">Shopping Cart</h1>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onQuantityChange={(quantity) => updateQuantity(item.id, quantity)}
                onRemove={() => removeFromCart(item.id)}
              />
            ))}
          </div>
          <div className="space-y-6 h-fit">
            <div className="rounded-lg border border-gray-700 bg-gray-900 p-4">
              <h3 className="mb-3 font-semibold text-white">Shipping Method</h3>
              <select
                value={shippingOption}
                onChange={(e) => setShippingOption(e.target.value)}
                className="w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-white"
              >
                <option value="standard">Standard - $5.99 (5-7 days)</option>
                <option value="express">Express - $14.99 (2-3 days)</option>
                <option value="overnight">Overnight - $29.99 (Next day)</option>
              </select>
            </div>
            <OrderSummary
              subtotal={subtotal}
              shippingCost={shippingCost}
              tax={tax}
              onCheckout={() => router.push("/checkout")}
            />
            <Link
              href="/products"
              className="block rounded-lg border border-gray-700 bg-gray-900 py-3 text-center font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
