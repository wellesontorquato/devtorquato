// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ❌ Remova isto se existir:
  // output: 'export',

  // ✅ Use serverful em container (ótimo para Railway):
  output: 'standalone',

  // (opcional) se você tinha outras configs, mantenha-as aqui
};

module.exports = nextConfig;
