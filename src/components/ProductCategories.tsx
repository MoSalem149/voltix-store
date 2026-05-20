import Link from "next/link";

async function ProductCategories() {
  let displayCategories: string[] = [];

  // Fetch product categories from API or database
  try {
    const response = await fetch("https://dummyjson.com/products/categories", {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    const categories = (await response.json()) as string[];
    // Limit to first 8 categories
    displayCategories = categories.slice(0, 8);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  if (displayCategories.length === 0) {
    return (
      <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400">
        Failed to load categories. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {displayCategories.map((category) => (
        <Link
          key={category}
          href={`/category/${category}`}
          className="group overflow-hidden rounded-lg border border-gray-700 bg-linear-to-br from-gray-900/50 to-gray-800/50 p-6 transition hover:border-cyan-500 hover:from-cyan-500/10 hover:to-cyan-400/5"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white capitalize transition group-hover:text-cyan-400">
              {category.replace(/-/g, " ")}
            </h3>
            <svg
              className="h-5 w-5 text-gray-400 transition group-hover:translate-x-1 group-hover:text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            Browse our collection of {category.replace(/-/g, " ")}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default ProductCategories;
