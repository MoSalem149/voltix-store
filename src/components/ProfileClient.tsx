"use client";

import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";

interface ProfileUser {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const getProfileKey = (userId: string) => `profile-${userId}`;

export default function ProfileClient({ user }: { user: ProfileUser }) {
  const userId = user.id ?? user.email ?? "default";
  const storageKey = getProfileKey(userId);

  // Load saved profile from localStorage (overrides session data)
  const [savedUser, setSavedUser] = useState<ProfileUser>(() => {
    if (typeof window === "undefined") return user;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...user, ...parsed };
      }
    } catch {}
    return user;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: savedUser.name ?? "",
      email: savedUser.email ?? "",
    },
  });

  // Re-sync form defaults if savedUser changes
  useEffect(() => {
    reset({ name: savedUser.name ?? "", email: savedUser.email ?? "" });
  }, [savedUser, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const updated = { ...savedUser, name: data.name, email: data.email };
      // Persist to localStorage so it survives page refreshes
      localStorage.setItem(storageKey, JSON.stringify({ name: data.name, email: data.email }));
      window.dispatchEvent(new Event("profile-updated"));
      setSavedUser(updated);
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    reset({ name: savedUser.name ?? "", email: savedUser.email ?? "" });
    setIsEditing(false);
  };

  const firstName = (savedUser.name ?? "").split(" ")[0] || savedUser.email?.split("@")[0] || "U";
  const initials = firstName.charAt(0).toUpperCase();

  return (
    <section className="px-6 py-14">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-black text-white">My Profile</h1>

        {saveSuccess && (
          <div className="mt-4 rounded-lg bg-green-900/30 border border-green-700/50 p-3 text-green-400">
            ✓ Profile updated successfully!
          </div>
        )}

        <div className="mt-8 space-y-6">
          {/* Avatar */}
          <div className="flex justify-center">
            {savedUser.image ? (
              <Image
                src={savedUser.image}
                alt={savedUser.name ?? "User"}
                width={88}
                height={88}
                className="rounded-full border-2 border-cyan-500"
              />
            ) : (
              <div className="flex h-22 w-22 items-center justify-center rounded-full bg-cyan-500 text-3xl font-black text-black" style={{ width: 88, height: 88 }}>
                {initials}
              </div>
            )}
          </div>

          {/* Name display below avatar */}
          <p className="text-center text-xl font-bold text-white">{savedUser.name ?? savedUser.email}</p>

          {/* Account Info Card */}
          <div className="rounded-xl border border-gray-700 bg-gray-900 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Account Information</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="rounded-lg border border-cyan-500 px-4 py-1.5 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-500 hover:text-black"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400">Full Name</label>
                  <input
                    type="text"
                    {...register("name")}
                    className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2.5 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400">Email</label>
                  <input
                    type="email"
                    {...register("email")}
                    className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2.5 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 rounded-lg bg-cyan-500 py-2.5 font-semibold text-black transition hover:bg-cyan-400 disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 rounded-lg border border-gray-600 py-2.5 font-semibold text-gray-300 transition hover:border-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-5">
                <div className="flex items-center gap-4 rounded-lg bg-gray-800/50 px-4 py-3">
                  <span className="text-gray-400 text-sm w-16 shrink-0">Name</span>
                  <span className="font-semibold text-white">{savedUser.name ?? "—"}</span>
                </div>
                <div className="flex items-center gap-4 rounded-lg bg-gray-800/50 px-4 py-3">
                  <span className="text-gray-400 text-sm w-16 shrink-0">Email</span>
                  <span className="font-semibold text-white">{savedUser.email ?? "—"}</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">Quick Actions</h2>
            <Link
              href="/orders"
              className="flex items-center justify-between rounded-xl border border-gray-700 bg-gray-900 p-4 transition hover:border-cyan-500"
            >
              <div>
                <p className="font-semibold text-cyan-400">Order History</p>
                <p className="text-sm text-gray-400">View your past orders</p>
              </div>
              <span className="text-gray-500">→</span>
            </Link>
            <Link
              href="/wishlist"
              className="flex items-center justify-between rounded-xl border border-gray-700 bg-gray-900 p-4 transition hover:border-cyan-500"
            >
              <div>
                <p className="font-semibold text-cyan-400">My Wishlist</p>
                <p className="text-sm text-gray-400">Browse your saved items</p>
              </div>
              <span className="text-gray-500">→</span>
            </Link>
            <Link
              href="/products"
              className="flex items-center justify-between rounded-xl border border-gray-700 bg-gray-900 p-4 transition hover:border-cyan-500"
            >
              <div>
                <p className="font-semibold text-cyan-400">Continue Shopping</p>
                <p className="text-sm text-gray-400">Browse more products</p>
              </div>
              <span className="text-gray-500">→</span>
            </Link>
          </div>

          {/* Logout */}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full rounded-xl bg-red-600/20 border border-red-700/50 py-3 font-semibold text-red-400 transition hover:bg-red-600 hover:text-white"
          >
            Sign Out
          </button>
        </div>
      </div>
    </section>
  );
}
