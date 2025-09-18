"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { SVGProps } from "react";

type Props = {
  title: string;
  desc: string;
  href?: string;           // torna o card clicável
  icon?: React.ReactNode;  // ícone opcional (ex.: <Icon />)
  tag?: string;            // badge opcional (ex.: "SEO", "SaaS")
  cta?: string;            // texto do CTA (padrão: "Saiba mais")
};

function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      suppressHydrationWarning
      {...props}
    >
      <path
        suppressHydrationWarning
        d="M7 17L17 7M17 7H9M17 7v8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardContent({
  title,
  desc,
  icon,
  tag,
  cta,
}: Pick<Props, "title" | "desc" | "icon" | "tag" | "cta">) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="group relative overflow-hidden rounded-2xl border border-token bg-[var(--bg-elev)] p-6 focus-within:ring-2 focus-within:ring-[color:var(--brand-b)]"
    >
      {/* barra superior de marca (agora responde ao hover do card) */}
      <div className="absolute top-0 left-0 h-1 w-0 bg-brand-grad transition-all duration-500 group-hover:w-full" />

      {/* brilho sutil atravessando */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      >
        <div className="absolute -inset-y-10 -left-40 w-40 rotate-12 bg-white/10 blur-2xl" />
      </div>

      {/* header do card */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* ícone ou bolinha de marca */}
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-token bg-black/20">
            {icon ? (
              <span className="text-white/90">{icon}</span>
            ) : (
              <span aria-hidden className="h-2 w-2 rounded-full bg-brand-grad" />
            )}
          </div>
          <h3 className="h3">{title}</h3>
        </div>

        {tag && (
          <span className="rounded-full border border-token px-2.5 py-1 text-xs text-white/80">
            {tag}
          </span>
        )}
      </div>

      <p className="text-white/70 mt-3">{desc}</p>

      {/* CTA opcional */}
      {cta && (
        <div className="mt-4">
          <span className="inline-flex items-center gap-2 text-sm text-white/85">
            {cta}
            <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      )}
    </motion.article>
  );
}

export default function ServiceCard({
  title,
  desc,
  href,
  icon,
  tag,
  cta = "Saiba mais",
}: Props) {
  // Se tiver href, envolve no Link para card inteiro clicável
  if (href) {
    return (
      <Link
        href={href}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-b)] rounded-2xl"
        aria-label={`${title} — abrir`}
      >
        <CardContent title={title} desc={desc} icon={icon} tag={tag} cta={cta} />
      </Link>
    );
  }

  // Sem href: mantém foco acessível no card
  return (
    <div className="rounded-2xl" tabIndex={0}>
      <CardContent title={title} desc={desc} icon={icon} tag={tag} cta={cta} />
    </div>
  );
}
