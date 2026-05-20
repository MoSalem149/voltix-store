"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSubmit: (data: Omit<RegisterFormData, "confirmPassword">) => Promise<void>;
  isLoading?: boolean;
}

export default function RegisterForm({
  onSubmit,
  isLoading = false,
}: RegisterFormProps) {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmitHandler = async (data: RegisterFormData) => {
    setError("");
    try {
      const { confirmPassword: _, ...registerData } = data;
      await onSubmit(registerData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-900/30 p-3 text-red-400">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium text-white">Full Name</label>
        <input
          type="text"
          {...register("name")}
          className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-2 text-white placeholder-gray-500"
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-white">Email</label>
        <input
          type="email"
          {...register("email")}
          className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-2 text-white placeholder-gray-500"
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-white">Password</label>
        <input
          type="password"
          {...register("password")}
          className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-2 text-white placeholder-gray-500"
          placeholder="••••••"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-white">Confirm Password</label>
        <input
          type="password"
          {...register("confirmPassword")}
          className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-2 text-white placeholder-gray-500"
          placeholder="••••••"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-400">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-cyan-500 py-2 font-semibold text-black transition disabled:opacity-50 hover:bg-cyan-400"
      >
        {isLoading ? "Creating account..." : "Register"}
      </button>

      <p className="text-center text-gray-400">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-cyan-400 hover:text-cyan-300">
          Login
        </Link>
      </p>
    </form>
  );
}
