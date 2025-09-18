// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Gera bundle 'standalone' (menor superfície no deploy)
  output: "standalone",
};

export default nextConfig;
