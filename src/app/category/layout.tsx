import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories - Voltix Store",
  description: "Browse our electronic products by category at Voltix Store",
  keywords: ["categories", "electronics", "gadgets", "shop"],
  openGraph: {
    title: "Categories - Voltix Store",
    description: "Browse our electronic products by category",
    type: "website",
  },
};

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
