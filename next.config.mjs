// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',                 // gera HTML estático em /out
  images: { unoptimized: true },    // next/image sem otimização server-side
  trailingSlash: true,              // garante /servicos/ → /servicos/index.html no Apache
};
export default nextConfig;
