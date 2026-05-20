"use client";

import { useState } from "react";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  max?: number;
}

export default function QuantitySelector({
  quantity,
  onQuantityChange,
  max = 100,
}: QuantitySelectorProps) {
  const [value, setValue] = useState(quantity);

  const handleIncrement = () => {
    if (value < max) {
      const newValue = value + 1;
      setValue(newValue);
      onQuantityChange(newValue);
    }
  };

  const handleDecrement = () => {
    if (value > 1) {
      const newValue = value - 1;
      setValue(newValue);
      onQuantityChange(newValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value) || 0;
    if (num > 0 && num <= max) {
      setValue(num);
      onQuantityChange(num);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleDecrement}
        disabled={value <= 1}
        className="h-10 w-10 rounded border border-gray-600 bg-gray-800 text-white transition disabled:opacity-50 hover:bg-gray-700"
      >
        −
      </button>

      <input
        type="number"
        value={value}
        onChange={handleChange}
        min="1"
        max={max}
        className="h-10 w-16 appearance-none rounded border border-gray-600 bg-gray-900 text-center text-white"
      />

      <button
        onClick={handleIncrement}
        disabled={value >= max}
        className="h-10 w-10 rounded border border-gray-600 bg-gray-800 text-white transition disabled:opacity-50 hover:bg-gray-700"
      >
        +
      </button>
    </div>
  );
}
