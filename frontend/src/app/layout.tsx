import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/client-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harsh Kamble | Web & App Developer",
  description:
    "Portfolio of Harsh Kamble — Web & App Developer, Co-Founder of Fusionexlabs. Building modern digital solutions with React, Next.js, Flutter, and more.",
  keywords: [
    "Harsh Kamble",
    "Web Developer",
    "App Developer",
    "Fusionexlabs",
    "React",
    "Next.js",
    "Flutter",
    "Mumbai",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
