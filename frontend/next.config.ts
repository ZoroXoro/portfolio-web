import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The old multi-page routes now live as sections of the home page
  async redirects() {
    return [
      { source: "/projects", destination: "/#work", permanent: false },
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
  },
};

export default nextConfig;
