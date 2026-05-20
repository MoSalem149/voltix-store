"use client";

import { useCartStore } from "@/store/useCartStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ShippingOptions from "@/components/ShippingOptions";
import OrderSummary from "@/components/OrderSummary";
import CartItemCard from "@/components/CartItemCard";
import Link from "next/link";

const shippingCosts: Record<string, number> = {
  standard: 5.99,
  express: 14.99,
  overnight: 29.99,
};

export default function CheckoutPage() {
  const { items, getTotal } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();
  const [shippingOption, setShippingOption] = useState("standard");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!session?.user) {
    return (
      <section className="px-6 py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-black text-white">Please Login</h1>
          <p className="mt-4 text-gray-400">You need to login to checkout</p>
          <Link
            href="/auth/login"
            className="mt-6 inline-block rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
          >
            Go to Login
          </Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="px-6 py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-black text-white">Your Cart is Empty</h1>
          <p className="mt-4 text-gray-400">Add some items to proceed with checkout</p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  const subtotal = getTotal();
  const shippingCost = shippingCosts[shippingOption] || 5.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingCost + tax;

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert(
        `Order placed successfully! Order Total: $${total.toFixed(2)}\n\nThis is a demo. In a real app, payment would be processed here.`
      );
      router.push("/orders");
    } catch (_error) {
      alert("Order processing failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-black text-white">Checkout</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-white">Order Items</h2>
            {items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onQuantityChange={() => {}}
                onRemove={() => {}}
              />
            ))}
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-gray-700 bg-gray-900 p-4">
              <h3 className="mb-3 font-semibold text-white">Shipping To</h3>
              <p className="text-sm text-gray-300">{session.user.name}</p>
              <p className="text-sm text-gray-300">{session.user.email}</p>
            </div>

            <ShippingOptions
              selectedOption={shippingOption}
              onSelectOption={setShippingOption}
            />

            <OrderSummary
              subtotal={subtotal}
              shippingCost={shippingCost}
              tax={tax}
              onCheckout={handleCheckout}
              isLoading={isProcessing}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
