"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Product } from "@/interfaces/product";

// Zod validation schema for quantity input
const AddToCartSchema = z.object({
  quantity: z
    .number()
    .int("Quantity must be a whole number")
    .min(1, "Quantity must be at least 1")
    .max(100, "Quantity cannot exceed 100"),
});

type AddToCartFormData = z.infer<typeof AddToCartSchema>;

interface AddToCartProps {
  product: Product;
  onAddToCart?: (product: Product, quantity: number) => void;
}

export default function AddToCart({ product, onAddToCart }: AddToCartProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<AddToCartFormData>({
    resolver: zodResolver(AddToCartSchema),
    defaultValues: { quantity: 1 },
  });

  const quantity = useWatch({
    control,
    name: "quantity",
  });

  const onSubmit = async (data: AddToCartFormData) => {
    setIsAdding(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Call parent callback if provided
      if (onAddToCart) {
        onAddToCart(product, data.quantity);
      }

      setSuccess(true);
      reset();

      // Hide success message after 2 seconds
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300">
            Quantity
          </label>
          <input
            type="number"
            {...register("quantity", { valueAsNumber: true })}
            className={`mt-1 w-full rounded-lg border bg-gray-800 px-3 py-2 text-white transition focus:outline-none ${
              errors.quantity
                ? "border-red-500 focus:border-red-600"
                : "border-gray-600 focus:border-cyan-500"
            }`}
            disabled={isAdding}
          />
          {errors.quantity && (
            <p className="mt-1 text-sm text-red-400">
              {errors.quantity.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isAdding}
        className="w-full rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-black transition hover:bg-cyan-400 disabled:bg-gray-600 disabled:text-gray-400"
      >
        {isAdding ? "Adding..." : success ? "✓ Added!" : "Add to Cart"}
      </button>

      {success && (
        <div className="rounded-lg bg-green-500/20 p-2 text-center text-sm text-green-400">
          {product.title} x{quantity} added to cart!
        </div>
      )}
    </form>
  );
}
