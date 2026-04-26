import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable gzip/brotli compression for all responses
  compress: true,

  // Optimize images — allow unoptimized for static sequence frames (PNGs),
  // but still use Next.js optimization for component images
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year cache for images
  },

  // Production-friendly headers for Netlify CDN caching
  async headers() {
    return [
      {
        // Cache static sequence frames aggressively (1 year)
        source: "/sequence/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
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
