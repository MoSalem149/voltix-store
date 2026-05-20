"use client";

interface OrderSummaryProps {
  subtotal: number;
  shippingCost: number;
  tax?: number;
  onCheckout: () => void;
  isLoading?: boolean;
}

export default function OrderSummary({
  subtotal,
  shippingCost,
  tax = 0,
  onCheckout,
  isLoading = false,
}: OrderSummaryProps) {
  const total = subtotal + shippingCost + tax;

  return (
    <div className="space-y-4 rounded-lg border border-gray-700 bg-gray-900 p-6">
      <h3 className="text-lg font-semibold text-white">Order Summary</h3>

      <div className="space-y-2 border-b border-gray-700 pb-4">
        <div className="flex justify-between text-gray-300">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-300">
          <span>Shipping</span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>

        {tax > 0 && (
          <div className="flex justify-between text-gray-300">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between text-xl font-bold text-cyan-400">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button
        onClick={onCheckout}
        disabled={isLoading || subtotal === 0}
        className="w-full rounded-lg bg-cyan-500 py-3 font-semibold text-black transition disabled:opacity-50 hover:bg-cyan-400"
      >
        {isLoading ? "Processing..." : "Proceed to Checkout"}
      </button>
    </div>
  );
}
