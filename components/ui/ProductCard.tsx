import Image from "next/image";
import Link from "next/link";
import { Tilt } from "@/components/fx/Tilt";
import type { Product } from "@/lib/data";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Tilt max={5} className="rounded-3xl">
      <Link
        href={`/product/${product.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-line transition-shadow hover:shadow-lift"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-strong">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.alt ?? product.name}
              fill
              sizes="(min-width:1024px) 25vw, (min-width:640px) 45vw, 90vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-end bg-gradient-to-br from-surface-strong to-surface p-5">
              <span className="font-display text-5xl leading-none text-brand/25">{product.name.slice(0, 2)}</span>
            </div>
          )}
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold tracking-wide text-brand backdrop-blur">
            {product.brand}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-1 p-5">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">{product.group}</p>
          <h3 className="font-display text-xl leading-snug text-ink">{product.name}</h3>
          <span className="mt-auto pt-3 text-sm font-medium text-accent-ink">View details →</span>
        </div>
      </Link>
    </Tilt>
  );
}
