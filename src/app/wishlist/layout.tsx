import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Wishlist - Voltix Store",
  description: "View your saved items and wishlist at Voltix Store",
};

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
