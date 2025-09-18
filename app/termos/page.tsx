export const metadata = {
  title: "Termos de Uso — DevTorquato",
  description:
    "Condições de uso do site DevTorquato: escopo, elegibilidade, propriedade intelectual, limitações de responsabilidade e foro.",
};

export default function TermosPage() {
  // manter estático para evitar hydration mismatch
  const updatedAt = "17/09/2025";

  return (
    <section className="container-app section">
      {/* Cabeçalho */}
      <header className="max-w-3xl">
        <h1 className="h1">Termos de Uso</h1>
        <p className="muted mt-3">
          Ao acessar e utilizar o site e os materiais da <strong>DevTorquato</strong>, você concorda com os termos abaixo.
          Se não concordar, interrompa o uso imediatamente.
        </p>
        <div className="mt-3 text-xs text-white/60">Última atualização: {updatedAt}</div>

        {/* Sumário */}
        <nav aria-label="Sumário" className="mt-6">
          <ul className="flex flex-wrap gap-2 text-sm">
            <li><a className="rounded-full border border-token px-3 py-1 text-white/85 hover:text-white" href="#aceitacao">Aceitação</a></li>
            <li><a className="rounded-full border border-token px-3 py-1 text-white/85 hover:text-white" href="#escopo">Escopo do serviço</a></li>
            <li><a className="rounded-full border border-token px-3 py-1 text-white/85 hover:text-white" href="#elegibilidade">Elegibilidade & Conduta</a></li>
            <li><a className="rounded-full border border-token px-3 py-1 text-white/85 hover:text-white" href="#propriedade">Propriedade intelectual</a></li>
            <li><a className="rounded-full border border-token px-3 py-1 text-white/85 hover:text-white" href="#links">Links de terceiros</a></li>
            <li><a className="rounded-full border border-token px-3 py-1 text-white/85 hover:text-white" href="#propostas">Propostas & Preços</a></li>
            <li><a className="rounded-full border border-token px-3 py-1 text-white/85 hover:text-white" href="#garantias">Isenções de garantias</a></li>
            <li><a className="rounded-full border border-token px-3 py-1 text-white/85 hover:text-white" href="#responsabilidade">Limitação de responsabilidade</a></li>
            <li><a className="rounded-full border border-token px-3 py-1 text-white/85 hover:text-white" href="#alteracoes">Alterações</a></li>
            <li><a className="rounded-full border border-token px-3 py-1 text-white/85 hover:text-white" href="#foro">Legislação & Foro</a></li>
            <li><a className="rounded-full border border-token px-3 py-1 text-white/85 hover:text-white" href="#contato">Contato</a></li>
          </ul>
        </nav>
      </header>

      {/* Conteúdo */}
      <div className="mt-10 space-y-6">
        <article id="aceitacao" className="card">
          <h2 className="h2">1) Aceitação dos Termos</h2>
          <p className="text-white/80 mt-2">
            Estes Termos regem o uso do site, conteúdos e materiais disponibilizados pela DevTorquato.
            Ao navegar, você declara ter lido e concordado com as condições aqui descritas.
          </p>
        </article>

        <article id="escopo" className="card">
          <h2 className="h2">2) Escopo do serviço</h2>
          <p className="text-white/80 mt-2">
            O site tem caráter informativo e comercial, apresentando portfólio, serviços e canais de contato.
            A prestação efetiva de serviços é regulada por contratos e propostas específicas firmadas entre as partes.
          </p>
        </article>

        <article id="elegibilidade" className="card">
          <h2 className="h2">3) Elegibilidade & Conduta de uso</h2>
          <ul className="mt-2 space-y-1 text-white/80">
            <li>• Você deve ter capacidade civil para contratar e utilizar o site de forma lícita.</li>
            <li>• É vedado qualquer uso que viole leis, direitos de terceiros, segurança ou operação do site.</li>
            <li>• É proibida a reprodução massiva, scraping automatizado e engenharia reversa do código.</li>
          </ul>
        </article>

        <article id="propriedade" className="card">
          <h2 className="h2">4) Propriedade intelectual & Licença limitada</h2>
          <p className="text-white/80 mt-2">
            Textos, imagens, identidades visuais, componentes de interface e código deste site pertencem à DevTorquato
            ou a seus licenciadores. É concedida uma licença <em>limitada, não exclusiva e revogável</em> para
            visualizar o conteúdo apenas para fins informativos. Qualquer reprodução, distribuição, modificação,
            publicação ou exploração comercial exige autorização prévia por escrito.
          </p>
        </article>

        <article id="links" className="card">
          <h2 className="h2">5) Links e serviços de terceiros</h2>
          <p className="text-white/80 mt-2">
            O site pode conter links para páginas externas. A DevTorquato não se responsabiliza por conteúdos,
            práticas de privacidade ou disponibilidade desses terceiros.
          </p>
        </article>

        <article id="propostas" className="card">
          <h2 className="h2">6) Propostas, prazos e valores</h2>
          <p className="text-white/80 mt-2">
            Informações exibidas no site não constituem oferta vinculante. Prazos, escopo, preços e responsabilidades
            são definidos exclusivamente em propostas/contratos individuais. Qualquer cronograma é estimativo
            até assinatura e alinhamento técnico.
          </p>
        </article>

        <article id="garantias" className="card">
          <h2 className="h2">7) Isenções de garantias</h2>
          <p className="text-white/80 mt-2">
            O site é fornecido “no estado em que se encontra” (<em>as is</em>). Não garantimos funcionamento ininterrupto,
            livre de erros, compatibilidade com todo dispositivo/navegador, ou adequação a objetivos específicos.
          </p>
        </article>

        <article id="responsabilidade" className="card">
          <h2 className="h2">8) Limitação de responsabilidade</h2>
          <p className="text-white/80 mt-2">
            Na extensão máxima permitida pela lei, a DevTorquato não responderá por danos indiretos, incidentais,
            especiais, perda de lucros, perda de dados, indisponibilidade temporária ou uso indevido do site por terceiros.
          </p>
        </article>

        <article id="alteracoes" className="card">
          <h2 className="h2">9) Alterações destes Termos</h2>
          <p className="text-white/80 mt-2">
            Podemos ajustar estes Termos para refletir melhorias técnicas, legais ou operacionais.
            A versão vigente é a publicada nesta página, com a data de atualização indicada no topo.
          </p>
        </article>

        <article id="foro" className="card">
          <h2 className="h2">10) Legislação aplicável & Foro</h2>
          <p className="text-white/80 mt-2">
            Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro da Comarca de Maceió/AL,
            com renúncia a qualquer outro, por mais privilegiado que seja, salvo competência legal diversa.
          </p>
        </article>

        <article id="contato" className="card">
          <h2 className="h2">11) Contato</h2>
          <p className="text-white/80 mt-2">
            Dúvidas sobre estes Termos? Fale com a gente em{" "}
            <a href="mailto:contato@devtorquato.com.br" className="underline text-[#7bd8ff]">
              contato@devtorquato.com.br
            </a>.
          </p>
        </article>
      </div>
    </section>
  );
}
