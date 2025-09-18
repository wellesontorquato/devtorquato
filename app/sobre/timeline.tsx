"use client";

import { motion } from "framer-motion";

type T = {
  period: string;
  title: string;
  desc: string;
  highlights?: string[];
};

export default function Timeline({ itens }: { itens: T[] }) {
  return (
    <div className="card relative overflow-hidden">
      <h2 className="h2">Linha do tempo</h2>

      <div className="mt-6 relative">
        {/* trilho vertical com animação */}
        <motion.div
          className="absolute left-4 top-0 bottom-0 w-[2px] bg-white/10"
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />

        <ul className="space-y-5 pl-10">
          {itens.map((t, i) => (
            <motion.li
              key={t.title + i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="relative"
            >
              {/* dot com pulso */}
              <motion.span
                aria-hidden
                className="absolute left-[-26px] top-2 h-3 w-3 rounded-full bg-brand-grad"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />

              {/* card compacto com glow no hover */}
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="relative overflow-hidden rounded-2xl border bg-[var(--bg-elev)] p-4"
              >
                {/* barra de marca no topo */}
                <div className="absolute top-0 left-0 h-1 w-0 bg-brand-grad transition-all duration-500 group-hover:w-full pointer-events-none" />

                <div className="text-xs uppercase tracking-wider text-white/60">
                  {t.period}
                </div>
                <div className="font-semibold mt-0.5">{t.title}</div>
                <p className="text-white/80 mt-1">{t.desc}</p>

                {t.highlights?.length ? (
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {t.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="rounded-full border border-token px-2.5 py-1 text-xs text-white/85"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </motion.article>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
