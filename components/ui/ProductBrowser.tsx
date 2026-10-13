"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import type { Product } from "@/lib/data";

export function ProductBrowser({ products, filters }: { products: Product[]; filters: string[] }) {
  const [filter, setFilter] = useState("All");
  const all = ["All", ...filters];
  const shown = products.filter((p) => filter === "All" || p.group === filter);

  return (
    <div>
      <div role="group" aria-label="Filter products" className="mb-10 flex flex-wrap gap-2">
        {all.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              filter === f ? "bg-brand text-white" : "bg-white text-ink ring-1 ring-line hover:ring-ink/40"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shown.map((p) => (
          <li key={p.slug}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-ink-muted" aria-live="polite">
        Showing {shown.length} of {products.length} products
      </p>
    </div>
  );
}
