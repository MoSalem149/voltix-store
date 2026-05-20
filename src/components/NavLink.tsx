"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useIsClient, useProfileDisplayName } from "@/hooks/useClientOnly";

export default function NavLink() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const cartCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.getCount());
  const isClient = useIsClient();
  const displayName = useProfileDisplayName(session ?? null);

  const initials = displayName.charAt(0).toUpperCase() || "U";

  const links = [
    { href: "/", label: "Home", exact: true },
    { href: "/category", label: "Category", exact: false },
    { href: "/products", label: "Products", exact: false },
  ];

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="flex items-center gap-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`transition ${
            isActive(link.href, link.exact)
              ? "font-bold text-cyan-400"
              : "text-gray-300 hover:text-cyan-300"
          }`}
        >
          {link.label}
        </Link>
      ))}

      {/* Cart */}
      <Link
        href="/cart/0"
        className={`relative transition ${
          pathname.startsWith("/cart")
            ? "font-bold text-cyan-400"
            : "text-gray-300 hover:text-cyan-300"
        }`}
        title="Shopping Cart"
      >
        🛒
        {isClient && cartCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </Link>

      {/* Wishlist */}
      <Link
        href="/wishlist"
        className={`relative transition ${
          pathname === "/wishlist"
            ? "font-bold text-cyan-400"
            : "text-gray-300 hover:text-cyan-300"
        }`}
        title="Wishlist"
      >
        ♥️
        {isClient && wishlistCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {wishlistCount > 99 ? "99+" : wishlistCount}
          </span>
        )}
      </Link>

      {/* Auth */}
      {!session?.user ? (
        <div className="flex gap-3">
          <Link
            href="/auth/login"
            className={`rounded-lg px-3 py-1 text-sm transition ${
              pathname === "/auth/login"
                ? "bg-gray-600 text-white"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className={`rounded-lg px-3 py-1 text-sm font-semibold transition ${
              pathname === "/auth/register"
                ? "bg-cyan-400 text-black"
                : "bg-cyan-500 text-black hover:bg-cyan-400"
            }`}
          >
            Register
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            href="/profile"
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              pathname === "/profile"
                ? "border border-cyan-500/40 bg-cyan-500/20 text-cyan-400"
                : "border border-gray-700 bg-gray-800 text-gray-200 hover:border-cyan-500/40 hover:text-cyan-300"
            }`}
            title="My Profile"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-xs font-black text-black">
              {initials}
            </span>
            {isClient && displayName && <span>{displayName}</span>}
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-lg border border-gray-700 px-3 py-1.5 text-sm text-gray-400 transition hover:border-red-500/50 hover:text-red-400"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
