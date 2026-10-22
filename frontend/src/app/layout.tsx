import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

// One family, three voices via the width axis (expanded mark, text, condensed labels)
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} — Developer & Creative Technologist`,
    template: `%s — ${site.brand}`,
  },
  description: site.description,
  authors: [{ name: site.legalName }],
  keywords: [site.brand, site.legalName, "Full-stack developer", "Flutter", "Next.js", "AI engineer", "RAG", "Mumbai"],
  openGraph: {
    title: `${site.brand} — Developer & Creative Technologist`,
    description: site.description,
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${archivo.variable} antialiased`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
