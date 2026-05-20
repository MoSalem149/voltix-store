"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading?: boolean;
}

export default function LoginForm({
  onSubmit,
  isLoading = false,
}: LoginFormProps) {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmitHandler = async (data: LoginFormData) => {
    setError("");
    try {
      await onSubmit(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-900/30 p-3 text-red-400">{error}</div>
      )}

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

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-cyan-500 py-2 font-semibold text-black transition disabled:opacity-50 hover:bg-cyan-400"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>

      <p className="text-center text-gray-400">
        Do not have an account?{" "}
        <Link
          href="/auth/register"
          className="text-cyan-400 hover:text-cyan-300"
        >
          Register
        </Link>
      </p>
    </form>
  );
}
