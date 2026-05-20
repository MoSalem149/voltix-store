"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search products..."
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full rounded-2xl border border-gray-700 bg-gray-900 px-5 py-3 text-white outline-none transition placeholder:text-gray-400 focus:border-cyan-400"
      />
    </div>
  );
}
