import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for nginx serving
  output: "export",
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Trailing slash for proper static file serving
  trailingSlash: true,
};

export default nextConfig;
