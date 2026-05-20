import Image from "next/image";
import type { Metadata } from "next";
import { Product } from "../../../interfaces/product";
import ProductDetailsClient from "@/components/ProductDetailsClient";

async function getProduct(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product: Product = await getProduct(id) as Product;

  return {
    title: `${product.title} - Voltix Store`,
    description: product.description || `Buy ${product.title} at Voltix Store`,
    keywords: [product.title, product.category, "electronics"],
    openGraph: {
      title: `${product.title} - Voltix Store`,
      description: product.description,
      type: "website",
      images: [
        {
          url: product.thumbnail,
          width: 500,
          height: 500,
        },
      ],
    },
  };
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product: Product = await getProduct(id);

  return (
    <section className="px-6 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-gray-800 bg-white">
          <Image
            width={500}
            height={500}
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>

        <ProductDetailsClient product={product} />
      </div>
    </section>
  );
}
