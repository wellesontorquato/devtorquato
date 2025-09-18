"use client";

import { motion } from "framer-motion";
import ServiceCard from "@/components/service-card";
import type { SVGProps } from "react";

/* =========================
   ÍCONES SEGUROS P/ Hidratação
   ========================= */
function IconBase({
  children,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      suppressHydrationWarning
      {...props}
    >
      {children}
    </svg>
  );
}

function IconInstitutional(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path
        suppressHydrationWarning
        d="M4 20h16M6 20V9l6-4 6 4v11M8 12h3m2 0h3M8 16h3m2 0h3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}
function IconLanding(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path
        suppressHydrationWarning
        d="M5 19h14M12 3v8m0 0l3-3m-3 3L9 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}
function IconSaaS(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path
        suppressHydrationWarning
        d="M7 18h10a4 4 0 0 0 0-8 5 5 0 0 0-9.6-1.8A4 4 0 0 0 7 18Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}
function IconAutomation(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path
        suppressHydrationWarning
        d="M12 8v8m-4-4h8M4 12a8 8 0 1 0 16 0A8 8 0 0 0 4 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

/* =========================
   Dados
   ========================= */
const services = [
  {
    id: "institucionais",
    title: "Sites Institucionais",
    desc: "Presença sólida, rápido e SEO básico.",
    href: "/servicos#institucionais",
    tag: "SEO/Performance",
    icon: <IconInstitutional className="h-5 w-5" />,
  },
  {
    id: "landing",
    title: "Landing Pages",
    desc: "Conversão alta + testes A/B e integrações.",
    href: "/servicos#landing",
    tag: "Crescimento",
    icon: <IconLanding className="h-5 w-5" />,
  },
  {
    id: "saas",
    title: "SaaS Escalável",
    desc: "Multi-tenant, billing, filas, observabilidade.",
    href: "/servicos#saas",
    tag: "Produto",
    icon: <IconSaaS className="h-5 w-5" />,
  },
  {
    id: "automacoes",
    title: "Automações de Processos",
    desc: "Integrações com WhatsApp, planilhas e ERPs.",
    href: "/servicos#automacoes",
    tag: "Eficiência",
    icon: <IconAutomation className="h-5 w-5" />,
  },
];

/* =========================
   Página
   ========================= */
export default function Home() {
  return (
    <div className="container-app">
      {/* HERO */}
      <section className="section">
        <div className="hero-panel">
          {/* decoração */}
          <motion.div
            aria-hidden
            className="hero-glow hero-glow-a"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="hero-glow hero-glow-b"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <div aria-hidden className="hero-grid" />

          {/* conteúdo do hero */}
          <div className="grid md:grid-cols-2 gap-10 items-center p-8 md:p-12">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="h1"
              >
                Sites institucionais, landing pages sob medida e{" "}
                <span className="brand-text">sistemas SaaS escaláveis</span>
              </motion.h1>

              <p className="mt-5 muted">
                Soluções rápidas, bonitas e com automações que economizam tempo e reduzem erros.
              </p>

              <div className="mt-7 flex gap-3">
                <a href="/contato" className="btn btn-primary">Solicitar proposta</a>
                <a href="/cases" className="btn btn-outline">Ver cases</a>
              </div>
            </div>

            <div
              className="hidden md:flex glass items-center justify-center h-full"
              aria-hidden="true"
            >
              <img src="/logo-devtorquato.png" alt="" className="mx-auto h-24 opacity-90" />
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="section">
        <h2 className="h2">Serviços</h2>
        <p className="muted mt-2">Do institucional ao SaaS, com foco em resultado.</p>

        {/* Mobile: carrossel horizontal com snap */}
        <div className="mt-6 md:hidden -mx-4 px-4">
          <div
            aria-label="Galeria de serviços"
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none mask-edges pb-2"
          >
            {services.map((s) => (
              <div
                key={s.id}
                className="snap-start shrink-0 w-[84%] max-w-[360px]"
              >
                <ServiceCard
                  title={s.title}
                  desc={s.desc}
                  href={s.href}
                  tag={s.tag}
                  icon={s.icon}
                  cta="Ver detalhes"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: grade padrão */}
        <div className="mt-6 hidden md:grid md:grid-cols-2 gap-6">
          {services.map((s) => (
            <ServiceCard
              key={s.id}
              title={s.title}
              desc={s.desc}
              href={s.href}
              tag={s.tag}
              icon={s.icon}
              cta="Ver detalhes"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
