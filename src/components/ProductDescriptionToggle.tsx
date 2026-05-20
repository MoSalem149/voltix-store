"use client";

import { useState } from "react";

const CHAR_LIMIT = 80;

export default function ProductDescriptionToggle({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false);

  if (description.length <= CHAR_LIMIT) {
    return <p className="mb-5 text-sm text-gray-400">{description}</p>;
  }

  return (
    <div className="mb-5">
      <p className="text-sm text-gray-400">
        {expanded ? description : description.slice(0, CHAR_LIMIT) + "…"}
      </p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-1 text-xs font-semibold text-cyan-400 transition hover:text-cyan-300"
      >
        {expanded ? "See less" : "See more"}
      </button>
    </div>
  );
}
