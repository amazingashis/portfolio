import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable gzip/brotli compression for all responses
  compress: true,

  // Allow the dev server (HMR/dev assets) to be reached over the LAN, e.g. when
  // previewing on a phone at http://192.168.1.67:3000. Dev-only; ignored in prod.
  allowedDevOrigins: ["192.168.1.67", "192.168.1.*"],

  // Use Next.js optimization (AVIF/WebP) for component images
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year cache for images
  },

  // Production-friendly headers for Netlify CDN caching
  async headers() {
    return [
      {
        // Cache achievement / certification images (1 week)
        source: "/(achievements|certiications|certified engineer)/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
    ];
  },

  // Reduce bundle size — strip console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
