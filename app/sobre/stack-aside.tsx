"use client";

import { motion } from "framer-motion";

export default function StackAside({ stack }: { stack: string[] }) {
  return (
    <aside className="card p-0 overflow-hidden">
      <div className="glass rounded-b-none p-6 flex items-center justify-center">
        <motion.img
          src="/logo-devtorquato.png"
          alt="DevTorquato"
          className="h-16"
          initial={{ y: 0 }}
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="p-6">
        <h2 className="h3">Stack principal</h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {stack.map((s) => (
            <motion.span
              key={s}
              whileHover={{ y: -2, scale: 1.02 }}
              className="rounded-full border border-token px-3 py-1 text-sm text-white/85"
            >
              {s}
            </motion.span>
          ))}
        </div>

        <h3 className="h3 mt-6">Certificações & Autoridade</h3>
        <ul className="mt-3 space-y-2 text-white/80">
          <li>✔️ Projetos com foco em conversão digital</li>
          <li>✔️ Boas práticas de segurança e performance</li>
          <li>✔️ Integrações e automações confiáveis</li>
        </ul>
      </div>
    </aside>
  );
}
