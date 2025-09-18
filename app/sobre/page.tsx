import Hero from "./hero";
import ValuesGrid from "./values-grid";
import StackAside from "./stack-aside";
import Timeline from "./timeline";
import Stats from "./stats-counters";

export const metadata = {
  title: "Sobre — DevTorquato",
  description:
    "Quem é a DevTorquato: desenvolvedor com experiência em sistemas SaaS, sites institucionais, landing pages e automações.",
};

const stack = [
  "Next.js (App Router)",
  "Tailwind CSS",
  "shadcn/ui",
  "Laravel (APIs)",
  "SEO técnico + JSON-LD",
  "Integrações (WhatsApp/CRMs)",
  "Stripe / Assinaturas",
];

const valores = [
  { t: "Código limpo", d: "padrões consistentes, testes e manutenção simples." },
  { t: "Desempenho & SEO", d: "Core Web Vitals, acessibilidade e estrutura semântica." },
  { t: "Conversão", d: "copy clara, CTAs medidos e formulários que funcionam." },
  { t: "Automação", d: "menos planilha, mais integração e rotina sem atrito." },
];

// edite os números para os seus reais
const stats = [
  { label: "Anos construindo web", value: 7 },
  { label: "Projetos entregues", value: 40 },
  { label: "Core Web Vitals 90+", value: 90, suffix: "%" },
];

const timeline = [
  {
    period: "2025 — Hoje",
    title: "DevTorquato Studio",
    desc:
      "Sites institucionais rápidos, landing pages que convertem, SaaS multi-tenant e automações sob medida.",
    highlights: ["Prazo curto", "7 dias de ajustes"],
  },
  {
    period: "2023 — 2024",
    title: "Produtos SaaS & Billing",
    desc:
      "Stripe, RBAC, filas/jobs e webhooks com observabilidade (logs, métricas, alertas).",
    highlights: ["Stripe", "Filas/Webhooks"],
  },
  {
    period: "2021 — 2022",
    title: "Integrações & Automação",
    desc:
      "Conectores com WhatsApp/CRMs/ERPs, rotinas programadas e dashboards operacionais.",
    highlights: ["–62% tempo operacional"],
  },
  {
    period: "2019 — 2020",
    title: "Performance Web & SEO",
    desc:
      "Landing pages sob medida, testes A/B e SEO técnico para ganho de tráfego e conversão.",
    highlights: ["+38% leads", "–2s carregamento"],
  },
  {
    period: "2016 — 2018",
    title: "Fundação",
    desc: "Base em HTML/CSS/JS, Laravel e UX; disciplina de código limpo e acessibilidade.",
    highlights: ["Clean code", "A11y/SEO"],
  },
];

export default function SobrePage() {
  return (
    <>
      <Hero />

      {/* Split: narrativa + stack (7/5) */}
      <section className="container-app section grid md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-7 space-y-6">
          <div className="card">
            <p className="text-white/85">
              Desenvolvo e coloco no ar soluções que resolvem problemas reais. De sites
              institucionais enxutos a SaaS escaláveis, foco em <strong>velocidade, conversão e
              estabilidade</strong> — sem descuidar de acessibilidade e SEO técnico.
            </p>
            <p className="text-white/85 mt-4">
              O combo é simples: <strong>código limpo + design que converte + automações</strong>.
              Menos erro humano, mais tempo para o que importa, base pronta para crescer.
            </p>
          </div>

          <Stats itens={stats} />
        </div>

        <div className="md:col-span-5">
          <StackAside stack={stack} />
        </div>
      </section>

      {/* Valores em largura total (fica mais coeso visualmente) */}
      <section className="container-app section">
        <ValuesGrid itens={valores} />
      </section>

      {/* Linha do tempo vertical enxuta */}
      <section className="container-app section">
        <Timeline itens={timeline} />
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="/cases" className="btn btn-outline">Ver cases</a>
          <a href="/contato" className="btn btn-primary">Solicitar proposta</a>
        </div>
      </section>
    </>
  );
}
