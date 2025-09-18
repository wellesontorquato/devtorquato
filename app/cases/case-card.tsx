"use client";

import { motion } from "framer-motion";

type CaseItem = {
  cliente: string;
  problema: string;
  solucao: string;
  metricas: string[];
};

export default function CaseCard({ item }: { item: CaseItem }) {
  return (
    <motion.article
      className="card relative overflow-hidden group scroll-mt-nav"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {/* linha superior que acende */}
      <div
        className="
          absolute top-0 left-0 h-1 w-0
          group-hover:w-full transition-all duration-500
          bg-[linear-gradient(90deg,var(--brand-a),var(--brand-b))]
        "
        aria-hidden
      />

      {/* brilho sutil na borda ao passar o mouse */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 rounded-2xl opacity-0
          group-hover:opacity-100 transition-opacity duration-300
          shadow-[inset_0_0_0_1px_rgba(14,165,255,.35),_0_10px_30px_rgba(0,0,0,.35)]
        "
      />

      {/* glow de fundo discreto */}
      <div
        aria-hidden
        className="
          absolute -top-24 -right-24 h-56 w-56 rounded-full blur-3xl
          opacity-0 group-hover:opacity-25 transition-opacity duration-500
          bg-[radial-gradient(closest-side,rgba(14,165,255,.35),transparent)]
        "
      />

      <h2 className="h2">{item.cliente}</h2>

      <p className="mt-2 text-white/80">
        <strong className="text-white">Problema:</strong> {item.problema}
      </p>

      <p className="mt-2 text-white/80">
        <strong className="text-white">Solução:</strong> {item.solucao}
      </p>

      <ul className="mt-4 grid md:grid-cols-2 gap-2 text-white/80">
        {item.metricas.map((m) => (
          <li
            key={m}
            className="flex items-start gap-2 transition-transform duration-300 group-hover:translate-x-1"
          >
            <span
              className="
                mt-1 h-2 w-2 rounded-full
                transition-transform duration-300 group-hover:scale-125
                bg-[linear-gradient(90deg,var(--brand-a),var(--brand-b))]
              "
              aria-hidden
            />
            {m}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
