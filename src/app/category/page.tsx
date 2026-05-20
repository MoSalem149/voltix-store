import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: "beauty",
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "fragrances",
    name: "Fragrances",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "furniture",
    name: "Furniture",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "groceries",
    name: "Groceries",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Category() {
  return (
    <section className="px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-4xl font-black">Shop by Category</h1>
          <p className="mt-2 text-gray-400">
            Explore our trending product categories.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={{
                pathname: "/products",
                query: { category: category.id },
              }}
              className="overflow-hidden rounded-3xl border border-gray-800 bg-gray-900 text-left transition hover:-translate-y-1 hover:border-cyan-400"
            >
              <Image
                width={500}
                height={500}
                src={category.image}
                alt={category.name}
                className="h-52 w-full object-cover"
              />

              <div className="p-6">
                <h2 className="text-2xl font-bold">{category.name}</h2>
                <p className="mt-3 text-gray-400">
                  Browse products in this category.
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
