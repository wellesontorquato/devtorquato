"use client";

import { useEffect, useRef } from "react";
import { motion, animate, useInView, useReducedMotion } from "framer-motion";

type Stat = { label: string; value: number; suffix?: string };

export default function Stats({ itens }: { itens: Stat[] }) {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {itens.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
}

function StatCard({ label, value, suffix }: Stat) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-10% 0px" });
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      ref={cardRef}
      className="card relative text-center group overflow-hidden"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* barra de marca no topo */}
      <div className="absolute top-0 left-0 h-1 w-0 bg-brand-grad group-hover:w-full transition-all duration-500" />

      <div className="text-3xl font-semibold">
        <AnimatedNumber
          target={value}
          suffix={suffix}
          run={inView && !prefersReduced}
        />
      </div>
      <div className="text-white/70 mt-1 text-sm">{label}</div>
    </motion.div>
  );
}

/**
 * Anima números de 0 até `target` apenas no cliente,
 * evitando qualquer formatação que possa divergir no SSR.
 */
function AnimatedNumber({
  target,
  suffix,
  run,
  duration = 1.2,
}: {
  target: number;
  suffix?: string;
  run: boolean;
  duration?: number;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!nodeRef.current) return;

    // estado inicial consistente com o HTML do servidor
    nodeRef.current.textContent = formatNumber(0, suffix);

    if (!run) return;

    const controls = animate(0, target, {
      duration,
      onUpdate: (v) => {
        if (!nodeRef.current) return;
        nodeRef.current.textContent = formatNumber(v, suffix);
      },
    });

    return () => controls.stop();
  }, [run, target, suffix, duration]);

  // suppressHydrationWarning evita alerta se alguma extensão mexer nesse texto
  return (
    <span ref={nodeRef} suppressHydrationWarning>
      {formatNumber(0, suffix)}
    </span>
  );
}

function formatNumber(n: number, suffix?: string) {
  // Mantém inteiro arredondado; se quiser decimais, troque para toFixed(1/2)
  const rounded = Math.round(n);
  return `${rounded}${suffix ?? ""}`;
}
