"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">Oops!</h1>
        <h2 className="text-3xl font-semibold mb-4">Something went wrong</h2>
        <p className="text-gray-400 mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
