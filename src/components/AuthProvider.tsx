"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useEffect, useRef } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

function StoreSync() {
  const { data: session, status } = useSession();
  const { loadForUser, clearForLogout } = useCartStore();
  const { loadForUser: loadWishlistForUser, clearForLogout: clearWishlistForLogout } = useWishlistStore();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    if (status === "loading") return;

    const userId = session?.user?.id ?? null;

    if (userId && userId !== prevUserIdRef.current) {
      // Logged in — merge guest items and load user data
      loadForUser(userId);
      loadWishlistForUser(userId);
      prevUserIdRef.current = userId;
    } else if (!userId && prevUserIdRef.current !== null && prevUserIdRef.current !== undefined) {
      // Logged out — preserve items as guest cart
      clearForLogout();
      clearWishlistForLogout();
      prevUserIdRef.current = null;
    } else if (!userId && prevUserIdRef.current === undefined) {
      // Initial load while logged out — load guest cart from localStorage
      try {
        const guestCart = localStorage.getItem("cart-store-guest");
        if (guestCart) {
          const items = JSON.parse(guestCart);
          useCartStore.setState({ items, userId: null });
        }
        const guestWishlist = localStorage.getItem("wishlist-store-guest");
        if (guestWishlist) {
          const items = JSON.parse(guestWishlist);
          useWishlistStore.setState({ items, userId: null });
        }
      } catch {}
      prevUserIdRef.current = null;
    }
  }, [session, status, loadForUser, loadWishlistForUser, clearForLogout, clearWishlistForLogout]);

  return null;
}

export default function AuthProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      <StoreSync />
      {children}
    </SessionProvider>
  );
}
