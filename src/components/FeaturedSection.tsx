import Image from "next/image";
import Link from "next/link";
import { Product } from "@/interfaces/product";
import AddToCartClient from "./AddToCartClient";

type ProductsResponse = {
  products: Product[];
};

async function getFeaturedProducts(): Promise<Product[]> {
  const res = await fetch("https://dummyjson.com/products?limit=6", {
    next: { revalidate: 3600 },
  });

  const data: ProductsResponse = await res.json();
  return data.products;
}

export default async function FeaturedSection() {
  const products = await getFeaturedProducts();

  return (
    <section className="px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h2 className="text-4xl font-black">Featured Products</h2>
          <p className="mt-2 text-gray-400">
            Check out our handpicked selection of premium products
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-3xl border border-gray-800 bg-gray-900 p-6 transition hover:-translate-y-1 hover:border-cyan-400"
            >
              <div className="mb-6 overflow-hidden rounded-2xl bg-white">
                <Image
                  width={500}
                  height={500}
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-56 w-full object-cover transition hover:scale-105"
                />
              </div>

              <h3 className="mb-3 text-xl font-bold">{product.title}</h3>

              <p className="mb-2 text-sm text-gray-400 capitalize">
                {product.category}
              </p>

              <p className="mb-5 text-lg font-semibold text-cyan-400">
                ${product.price}
              </p>

              <div className="flex gap-2">
                <Link
                  href={`/product/${product.id}`}
                  className="flex-1 rounded-xl bg-gray-700 px-4 py-3 text-center font-semibold text-white transition hover:bg-gray-600"
                >
                  Details
                </Link>
                <AddToCartClient product={product} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
