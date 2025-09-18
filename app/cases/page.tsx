import ProjectsSection from "./projects-section";
import CaseCard from "./case-card";

export const metadata = {
  title: "Cases — DevTorquato",
  description:
    "Estudos de caso: como resolvemos problemas reais com sites institucionais, landing pages, SaaS e automações.",
};

type CaseItem = {
  cliente: string;
  problema: string;
  solucao: string;
  metricas: string[];
};

const cases: CaseItem[] = [
  {
    cliente: "Startup SaaS de Finanças",
    problema:
      "Sistema em planilhas, lento, sem controle de acesso e risco alto de erro humano.",
    solucao:
      "Criamos um SaaS multi-tenant Laravel, com login seguro, dashboard financeiro e relatórios automatizados.",
    metricas: ["-62% tempo em processos", "↑ 40% eficiência da equipe"],
  },
  {
    cliente: "Agência de Marketing",
    problema:
      "Landing pages genéricas em construtores prontos, sem foco em conversão e lentas no mobile.",
    solucao:
      "Desenvolvemos landing pages sob medida, com copy otimizada, testes A/B e integrações diretas com CRM.",
    metricas: ["↑ 38% geração de leads", "↓ 2s no tempo de carregamento"],
  },
  {
    cliente: "Consultoria Jurídica",
    problema:
      "Site institucional antigo, pouco responsivo e sem SEO técnico implementado.",
    solucao:
      "Refizemos o site com Next.js + Tailwind, SEO otimizado e design responsivo, incluindo blog para inbound marketing.",
    metricas: ["↑ 52% tráfego orgânico", "↑ 21% captação de contatos"],
  },
];

export default function CasesPage() {
  return (
    <>
      <section className="container-app section">
        <h1 className="h1">Estudos de Caso</h1>
        <p className="muted mt-2 max-w-2xl">
          Alguns exemplos de como transformamos problemas reais em resultados mensuráveis.
        </p>

        {/* MOBILE: carrossel horizontal por scroll-snap */}
        <div className="mt-10 -mx-4 md:hidden">
          <ul
            className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-2"
            aria-label="Estudos de caso (arraste para o lado)"
          >
            {cases.map((c, i) => (
              <li
                key={i}
                className="snap-start shrink-0 w-[85%] max-w-[520px]"
                aria-roledescription="slide"
              >
                <CaseCard item={c} />
              </li>
            ))}
          </ul>
        </div>

        {/* DESKTOP: grid normal */}
        <div className="mt-10 hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <CaseCard key={i} item={c} />
          ))}
        </div>
      </section>

      <ProjectsSection />
    </>
  );
}
