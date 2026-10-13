import type { Metadata } from "next";
import { PageHeroFrame } from "@/components/fx/PageHeroFrame";
import { CTABand } from "@/components/ui/CTABand";
import { ProductBrowser } from "@/components/ui/ProductBrowser";
import { products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse 41 VIJIN products: ACP, WPC/PVC sheets, door skins, partition panels, louvers, copper and zinc sheets, aluminium windows and Enox hardware.",
  alternates: { canonical: "/products" },
};

const filters = ["Sheets", "Louvers", "Doors & Interiors", "Facade & Openings", "Door Hardware", "Glass Fittings", "Shower", "Sliding Systems", "Furniture Fittings", "Profiles"];

export default function ProductsPage() {
  return (
    <>
      <PageHeroFrame
        eyebrow="Products"
        title="Everything for the elevation, inside and out"
        text={`${products.length} products across Vijin, Viva and Enox.`}
        image="/images/projects/520.jpg"
        alt="Commercial building with brown panels and blue glass bands"
      />
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <ProductBrowser products={products} filters={filters} />
      </section>
      <CTABand />
    </>
  );
}
