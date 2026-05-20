import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders - Voltix Store",
  description: "View your order history at Voltix Store",
};

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
