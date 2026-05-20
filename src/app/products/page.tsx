import Link from "next/link";
import { Suspense } from "react";
import { Product } from "../../interfaces/product";
import SearchInput from "../../components/SearchInput";
import ProductCard from "../../components/ProductCard";

type ProductsResponse = {
  products: Product[];
};

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://dummyjson.com/products", {
    next: { revalidate: 3600 },
  });

  const data: ProductsResponse = await res.json();
  return data.products;
}

async function ProductsList({
  query,
  category,
}: {
  query?: string;
  category?: string;
}) {
  const products = await getProducts();

  const filteredProducts = products.filter((p) => {
    const matchesQuery = query
      ? p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      : true;

    const matchesCategory = category ? p.category === category : true;

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; category?: string }>;
}) {
  const params = await searchParams;
  const query = params.query;
  const category = params.category;

  const products = await getProducts();
  const categories: string[] = Array.from(
    new Set(products.map((p) => p.category)),
  ).sort();

  return (
    <section className="px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-4xl font-black">Featured Products</h1>
          <p className="mt-2 text-gray-400">
            Browse live products fetched from the API.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="mb-8 h-12 animate-pulse rounded bg-gray-800"></div>
          }
        >
          <SearchInput />
        </Suspense>

        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href="/products"
            className={`rounded-full px-4 py-2 font-semibold transition ${
              !category
                ? "bg-cyan-500 text-black"
                : "border border-gray-700 bg-gray-900 text-white hover:border-cyan-400"
            }`}
          >
            All
          </Link>

          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${cat}`}
              className={`rounded-full px-4 py-2 font-semibold transition capitalize ${
                category === cat
                  ? "bg-cyan-500 text-black"
                  : "border border-gray-700 bg-gray-900 text-white hover:border-cyan-400"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        <Suspense
          fallback={
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="h-14 w-14 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
            </div>
          }
        >
          <ProductsList query={query} category={category} />
        </Suspense>
      </div>
    </section>
  );
}
