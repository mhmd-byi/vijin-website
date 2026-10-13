import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-svh max-w-3xl flex-col items-start justify-center px-5 py-32 md:px-8">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-accent-ink">404</p>
      <h1 className="font-display text-5xl md:text-7xl">This page could not be found</h1>
      <p className="mt-5 text-lg text-ink-muted">The link may be out of date. Try the products page or head back home.</p>
      <div className="mt-8 flex gap-4">
        <Link href="/" className="rounded-full bg-brand px-7 py-3.5 font-medium text-white">Home</Link>
        <Link href="/products" className="rounded-full border border-ink/25 px-7 py-3.5 font-medium">Products</Link>
      </div>
    </section>
  );
}
