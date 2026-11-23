import type { NextConfig } from "next";

const mediaHost = process.env.R2_PUBLIC_BASE_URL
  ? new URL(process.env.R2_PUBLIC_BASE_URL).hostname
  : null;

const nextConfig: NextConfig = {
  compress: true, // Enable gzip compression
  productionBrowserSourceMaps: false, // Disable source maps in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Remove console.* in production
  },
  images: {
    remotePatterns: mediaHost
      ? [{ protocol: "https", hostname: mediaHost, pathname: "/blog/**" }]
      : [],
  },
};

export default nextConfig;
