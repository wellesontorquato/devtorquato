import Link from "next/link";

export const metadata = {
  title: "Serviços — DevTorquato",
  description:
    "Sites institucionais, landing pages sob medida, SaaS escalável e automações de processos.",
};

type Item = { title: string; lead: string; bullets: string[]; id: string };

const items: Item[] = [
  {
    id: "institucionais",
    title: "Sites Institucionais",
    lead: "Presença sólida, rápido e com SEO técnico básico para ranquear bem.",
    bullets: [
      "Next.js + Tailwind (altíssimo desempenho)",
      "SEO técnico: OG tags, sitemap, robots, JSON-LD",
      "Design profissional e responsivo",
      "Integração com analytics (GA4/Plausible)",
    ],
  },
  {
    id: "landing",
    title: "Landing Pages Personalizadas",
    lead:
      "Páginas focadas em conversão, com copy clara, testes A/B e integrações.",
    bullets: [
      "Headlines de impacto e CTAs medidos",
      "Teste A/B de seções críticas",
      "Integração com CRM, WhatsApp e formulários",
      "Componentes reutilizáveis para novas campanhas",
    ],
  },
  {
    id: "saas",
    title: "SaaS Escalável",
    lead:
      "Arquitetura sólida para crescer: multi-tenant, billing e observabilidade.",
    bullets: [
      "Autenticação, RBAC e multi-tenant",
      "Billing (Stripe) e testes de assinatura",
      "Filas/Jobs e Webhooks",
      "Logs, métricas e monitoramento",
    ],
  },
  {
    id: "automacoes",
    title: "Automações de Processos",
    lead:
      "Bots e integrações que reduzem tarefas repetitivas e erros operacionais.",
    bullets: [
      "Integração com WhatsApp, planilhas e ERPs",
      "Importação/Exportação (CSV/Excel/PDF)",
      "Rotinas programadas e notificações",
      "Dashboards operacionais",
    ],
  },
];

export default function ServicosPage() {
  return (
    <section className="container-app section">
      <header className="max-w-2xl">
        <h1 className="h1">Serviços que entregam resultado</h1>
        <p className="muted mt-3">
          Do institucional ao SaaS, com foco em velocidade, conversão e automação.
        </p>

        {/* navegação por âncoras */}
        <nav aria-label="Navegação de serviços" className="mt-6">
          <ul className="flex flex-wrap gap-2 text-sm">
            {items.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="rounded-full border border-token px-3 py-1 text-white/85 hover:text-white hover:border-white/40 transition-colors"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="mt-10 grid gap-6">
        {items.map((s) => (
          <article key={s.id} id={s.id} className="card relative overflow-hidden group scroll-mt-nav">
            {/* barra de gradiente no topo */}
            <div className="absolute top-0 left-0 h-1 w-0 bg-brand-grad group-hover:w-full transition-all duration-500" />

            <h2 className="h2">{s.title}</h2>
            <p className="mt-2 text-white/80">{s.lead}</p>

            <ul className="mt-4 grid md:grid-cols-2 gap-2 text-white/80">
              {s.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-brand-grad" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/contato?projeto=${encodeURIComponent(s.id)}`}
                className="btn btn-primary"
              >
                Solicitar proposta
              </Link>
              <Link href="/cases" className="btn btn-outline">
                Ver cases
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
