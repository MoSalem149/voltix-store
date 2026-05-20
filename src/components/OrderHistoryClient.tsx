"use client";

import Image from "next/image";
import Link from "next/link";

interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  shippingOption: "standard" | "express" | "overnight";
  shippingCost: number;
  status: "pending" | "shipped" | "delivered";
  createdAt: Date;
}

const statusColors = {
  pending: "bg-yellow-900/40 text-yellow-400 border-yellow-700",
  shipped: "bg-blue-900/40 text-blue-400 border-blue-700",
  delivered: "bg-green-900/40 text-green-400 border-green-700",
};

const statusLabels = {
  pending: "⏳ Pending",
  shipped: "🚚 Shipped",
  delivered: "✅ Delivered",
};

export default function OrderHistoryClient({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <section className="px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-black text-white">Order History</h1>
          <div className="mt-12 text-center">
            <p className="mb-6 text-gray-400">You haven&apos;t placed any orders yet.</p>
            <Link
              href="/products"
              className="inline-block rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-14">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-white">Order History</h1>
            <p className="mt-2 text-gray-400">{orders.length} orders placed</p>
          </div>
          <Link
            href="/profile"
            className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 transition hover:border-cyan-500 hover:text-cyan-400"
          >
            ← Back to Profile
          </Link>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-gray-700 bg-gray-900 overflow-hidden"
            >
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-700 bg-gray-800/50 px-6 py-4">
                <div className="space-y-1">
                  <p className="font-mono text-sm font-semibold text-cyan-400">{order.id}</p>
                  <p className="text-xs text-gray-400">
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusColors[order.status]}`}
                  >
                    {statusLabels[order.status]}
                  </span>
                  <span className="text-lg font-bold text-white">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="divide-y divide-gray-800 px-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-4">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-semibold text-white">{item.title}</p>
                      <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-cyan-400">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-700 bg-gray-800/30 px-6 py-3">
                <p className="text-sm text-gray-400 capitalize">
                  Shipping: <span className="text-white">{order.shippingOption}</span>{" "}
                  (${order.shippingCost.toFixed(2)})
                </p>
                <Link
                  href="/products"
                  className="text-sm text-cyan-400 transition hover:text-cyan-300"
                >
                  Buy Again →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
