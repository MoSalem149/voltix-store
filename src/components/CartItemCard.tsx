"use client";

import Image from "next/image";
import { CartItem } from "@/interfaces/types";
import QuantitySelector from "./QuantitySelector";

interface CartItemCardProps {
  item: CartItem;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export default function CartItemCard({
  item,
  onQuantityChange,
  onRemove,
}: CartItemCardProps) {
  const total = item.price * item.quantity;

  return (
    <div className="flex gap-4 rounded-lg border border-gray-700 bg-gray-900 p-4">
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-white">
        <Image
          width={100}
          height={100}
          src={item.thumbnail}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="font-semibold text-white">{item.title}</h3>
          <p className="text-sm text-gray-400">{item.category}</p>
          <p className="mt-1 text-cyan-400">${item.price}</p>
        </div>

        <div className="flex items-center justify-between">
          <QuantitySelector
            quantity={item.quantity}
            onQuantityChange={onQuantityChange}
          />

          <button
            onClick={onRemove}
            className="px-3 py-1 text-sm text-red-400 transition hover:text-red-300"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <p className="text-lg font-bold text-cyan-400">${total.toFixed(2)}</p>
      </div>
    </div>
  );
}
