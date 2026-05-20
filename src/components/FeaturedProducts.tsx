import Image from "next/image";
import { Product } from "@/interfaces/product";

async function FeaturedProducts() {
  let featuredProducts: Product[] = [];

  // Fetch featured products from API or database
  // Example: fetching from DummyJSON API
  try {
    const response = await fetch(
      "https://dummyjson.com/products?limit=6&skip=0",
      { next: { revalidate: 3600 } }, // Revalidate every hour
    );

    const data = (await response.json()) as { products: Product[] };

    featuredProducts = data.products.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      brand: product.brand,
      category: product.category,
    }));
  } catch (error) {
    console.error("Error fetching featured products:", error);
  }

  if (featuredProducts.length === 0) {
    return (
      <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400">
        Failed to load featured products. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {featuredProducts.map((product) => (
        <div
          key={product.id}
          className="overflow-hidden rounded-lg border border-gray-700 bg-gray-900/50 transition hover:border-cyan-500"
        >
          <div className="relative h-48 overflow-hidden bg-gray-800">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-400">{product.category}</p>
            <h3 className="mt-2 line-clamp-2 font-semibold text-white">
              {product.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-gray-400">
              {product.description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-bold text-cyan-400">
                ${product.price}
              </span>
              <span className="text-xs text-gray-500">{product.brand}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeaturedProducts;
