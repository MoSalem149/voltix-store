import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products - Voltix Store",
  description: "Browse our complete collection of electronic products and gadgets at Voltix Store",
  keywords: ["products", "electronics", "gadgets", "shop"],
  openGraph: {
    title: "Products - Voltix Store",
    description: "Browse our complete collection of electronic products and gadgets",
    type: "website",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export const revalidate = 3600;
