import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/lib/site";
import "./globals.css";

const display = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap" });
const body = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "VIJIN | Veneers, ACP & Panel Sheets, Indore", template: "%s | VIJIN" },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: "VIJIN",
    title: "VIJIN | Veneers, ACP & Panel Sheets, Indore",
    description: site.description,
    locale: "en_IN",
  },
};

export const viewport: Viewport = { themeColor: "#f7f4ee" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} antialiased`}>
      <body className="min-h-svh">
        <SmoothScroll />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
