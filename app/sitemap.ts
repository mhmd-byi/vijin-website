import type { MetadataRoute } from "next";
import { products } from "@/lib/data";
import { site } from "@/lib/site";

const pages = ["", "/about", "/products", "/enox", "/catalogues", "/our-works", "/our-dealers-distributors", "/contact-us", "/privacy-policy", "/terms-and-conditions"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...pages, ...products.map((p) => `/product/${p.slug}`)].map((path) => ({
    url: `${site.url}${path}`,
    priority: path === "" ? 1 : path.startsWith("/product/") ? 0.6 : 0.8,
  }));
}
