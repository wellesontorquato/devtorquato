"use client";

import { motion } from "framer-motion";

type V = { t: string; d: string };

export default function ValuesGrid({
  itens,
  className = "",
}: {
  itens: V[];
  className?: string;
}) {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="card">
        <h2 className="h2">Como trabalho</h2>
        <p className="text-white/80 mt-2">
          Entrega rápida, base sólida e foco em conversão — sem sacrificar performance e SEO.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {itens.map((v) => (
          <motion.article
            key={v.t}
            className="card relative overflow-hidden group scroll-mt-nav"
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
          >
            {/* barra de gradiente no topo */}
            <div
              aria-hidden
              className="absolute top-0 left-0 h-1 w-0 bg-brand-grad group-hover:w-full transition-all duration-500"
            />

            {/* brilho que atravessa */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            >
              <div className="absolute -inset-y-10 -left-40 w-40 rotate-12 bg-white/10 blur-2xl" />
            </div>

            <div className="flex items-center gap-2">
              <span aria-hidden className="h-2 w-2 rounded-full bg-brand-grad" />
              <h3 className="h3">{v.t}</h3>
            </div>

            <p className="text-white/70 mt-2">{v.d}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
