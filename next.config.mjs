// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ❌ Remover o export estático
  // output: 'export',

  // ✅ Usar standalone (gera build server + otimizado p/ Docker/Railway)
  output: 'standalone',

  images: {
    unoptimized: true, // pode manter se não quiser otimização server-side
  },

  trailingSlash: true, // pode manter se precisa da barra no final
};

export default nextConfig;
