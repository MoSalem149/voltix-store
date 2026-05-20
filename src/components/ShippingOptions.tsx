"use client";

import { ShippingOption } from "@/interfaces/types";

interface ShippingOptionsProps {
  selectedOption: string;
  onSelectOption: (option: string) => void;
}

const shippingOptions: ShippingOption[] = [
  {
    id: "standard",
    label: "Standard Shipping",
    cost: 5.99,
    days: "5-7 business days",
  },
  {
    id: "express",
    label: "Express Shipping",
    cost: 14.99,
    days: "2-3 business days",
  },
  {
    id: "overnight",
    label: "Overnight Shipping",
    cost: 29.99,
    days: "Next business day",
  },
];

export default function ShippingOptions({
  selectedOption,
  onSelectOption,
}: ShippingOptionsProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-white">Shipping Method</h3>

      {shippingOptions.map((option) => (
        <label
          key={option.id}
          className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-700 bg-gray-900 p-3 transition hover:border-cyan-500"
        >
          <input
            type="radio"
            name="shipping"
            value={option.id}
            checked={selectedOption === option.id}
            onChange={() => onSelectOption(option.id)}
            className="h-4 w-4"
          />

          <div className="flex-1">
            <p className="font-medium text-white">{option.label}</p>
            <p className="text-sm text-gray-400">{option.days}</p>
          </div>

          <p className="font-semibold text-cyan-400">
            ${option.cost.toFixed(2)}
          </p>
        </label>
      ))}
    </div>
  );
}
