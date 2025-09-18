"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* blobs de fundo */}
      <motion.div
        aria-hidden
        suppressHydrationWarning
        className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl opacity-25 bg-blob-b"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        suppressHydrationWarning
        className="absolute -bottom-28 -right-28 h-96 w-96 rounded-full blur-3xl opacity-20 bg-blob-a"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-app section">
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs tracking-widest uppercase text-white/60"
        >
          Sobre
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="h1"
        >
          Quem é a <span className="brand-text">DevTorquato</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="muted mt-3 max-w-3xl"
        >
          Tecnologia e estratégia a serviço do resultado: sites institucionais, landing pages que
          convertem, SaaS escalável e automações que tiram trabalho repetitivo do seu time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-6 flex gap-3"
        >
          <a href="/contato" className="btn btn-primary">Solicitar proposta</a>
          <a href="/cases" className="btn btn-outline">Ver cases</a>
        </motion.div>

        {/* linha decorativa */}
        <div className="mt-8 h-px w-full hr-brand" />
      </div>
    </section>
  );
}
