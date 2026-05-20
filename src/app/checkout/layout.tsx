import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout - Voltix Store",
  description: "Complete your purchase at Voltix Store",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
