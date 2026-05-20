import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart - Voltix Store",
  description: "View and manage your shopping cart at Voltix Store",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
