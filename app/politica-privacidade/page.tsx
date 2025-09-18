export const metadata = {
  title: "Política de Privacidade — DevTorquato",
  description:
    "Como a DevTorquato trata dados pessoais: coleta, bases legais (LGPD), cookies, analytics, retenção e contato do controlador.",
};

export default function PoliticaPage() {
  // use conteúdo estático para evitar hydration-mismatch (nada de Date.now)
  const updatedAt = "17/09/2025";

  return (
    <section className="container-app section">
      {/* Cabeçalho */}
      <header className="max-w-3xl">
        <h1 className="h1">Política de Privacidade</h1>
        <p className="muted mt-3">
          Esta Política descreve como coletamos, usamos e protegemos seus dados pessoais ao utilizar
          os serviços e o site da <strong>DevTorquato</strong>.
        </p>
        <div className="mt-3 text-xs text-white/60">Última atualização: {updatedAt}</div>

        {/* Sumário/Navegação */}
        <nav aria-label="Sumário" className="mt-6">
          <ul className="flex flex-wrap gap-2 text-sm">
            <li><a className="rounded-full border border-token px-3 py-1 text-white/85 hover:text-white" href="#coleta">Coleta de informações</a></li>
            <li><a className="rounded-full border border-token px-3 py-1 text-white/85 hover:text-white" href="#uso">Como usamos os dados</a></li>
            <li><a className="rounded-full border border-token px-3 py-1 text-white/85 hover:text-white" href="#bases">Bases legais (LGPD)</a></li>
            <li><a className="rounded-full border border-token px-3 py-1 text-white/85 hover:text-white" href="#cookies">Cookies & Analytics</a></li>
            <li><a className="rounded-full border border-token px-3 py-1 text-white/85 hover:text-white" href="#compart">Compartilhamento</a></li>
            <li><a className="rounded-full border border-token px-3 py-1 text-white/85 hover:text-white" href="#retencao">Retenção & Segurança</a></li>
            <li><a className="rounded-full border border-token px-3 py-1 text-white/85 hover:text-white" href="#direitos">Seus direitos</a></li>
            <li><a className="rounded-full border border-token px-3 py-1 text-white/85 hover:text-white" href="#contato">Contato</a></li>
          </ul>
        </nav>
      </header>

      {/* Conteúdo */}
      <div className="mt-10 space-y-6">
        <article id="coleta" className="card">
          <h2 className="h2">1) Coleta de informações</h2>
          <p className="text-white/80 mt-2">
            Coletamos dados que você fornece voluntariamente (por exemplo, nome, e-mail, telefone e
            detalhes do projeto em formulários) e dados técnicos gerados pelo uso do site
            (endereço IP, identificadores de cookies, páginas visitadas, dispositivo e navegador).
          </p>
          <ul className="mt-3 grid md:grid-cols-2 gap-2 text-white/75">
            <li>• Dados de contato enviados em <em>formulários</em>;</li>
            <li>• Logs e métricas de acesso para segurança e performance;</li>
            <li>• Dados de uso para análises de tráfego e melhoria de UX;</li>
            <li>• Comunicações via e-mail/WhatsApp quando você inicia o contato.</li>
          </ul>
        </article>

        <article id="uso" className="card">
          <h2 className="h2">2) Como usamos os dados</h2>
          <p className="text-white/80 mt-2">
            Utilizamos os dados para responder solicitações, elaborar propostas,
            prestar e melhorar nossos serviços, personalizar conteúdo, fazer análises
            agregadas e enviar comunicações de suporte ou administrativas.
          </p>
        </article>

        <article id="bases" className="card">
          <h2 className="h2">3) Bases legais (LGPD)</h2>
          <p className="text-white/80 mt-2">
            Tratamos dados pessoais com fundamento nas bases legais da Lei nº 13.709/2018:
          </p>
          <ul className="mt-3 space-y-1 text-white/75">
            <li>• <strong>Execução de contrato</strong> ou procedimentos preliminares (ex.: elaboração de proposta);</li>
            <li>• <strong>Legítimo interesse</strong> (melhoria do site, prevenção a fraudes, segurança);</li>
            <li>• <strong>Consentimento</strong> (quando aplicável, p.ex. para comunicações de marketing);</li>
            <li>• <strong>Cumprimento de obrigação legal/regulatória</strong> (ex.: registros fiscais).</li>
          </ul>
        </article>

        <article id="cookies" className="card">
          <h2 className="h2">4) Cookies & Analytics</h2>
          <p className="text-white/80 mt-2">
            Podemos usar cookies estritamente necessários (funcionamento do site) e cookies de
            medição (como Plausible ou Google Analytics 4) para entender o uso do site
            de forma agregada. Você pode gerenciar cookies nas configurações do seu navegador.
          </p>
          <ul className="mt-3 space-y-1 text-white/75">
            <li>• <strong>Necessários:</strong> autenticação de sessão, segurança, anti-abuso;</li>
            <li>• <strong>Estatísticos:</strong> métricas anônimas de tráfego e performance;</li>
            <li>• <strong>Preferências:</strong> lembrar escolhas (quando disponíveis).</li>
          </ul>
          <p className="text-white/70 mt-3 text-sm">
            Observação: alguns provedores podem processar dados fora do Brasil. Nesse caso, buscamos
            adotar cláusulas e salvaguardas adequadas compatíveis com a LGPD.
          </p>
        </article>

        <article id="compart" className="card">
          <h2 className="h2">5) Compartilhamento</h2>
          <p className="text-white/80 mt-2">
            Não vendemos seus dados. Podemos compartilhar informações com fornecedores que
            nos auxiliam na operação (hospedagem, e-mail transacional, analytics) estritamente
            para a finalidade contratada, ou quando exigido por lei/ordem de autoridade.
          </p>
        </article>

        <article id="retencao" className="card">
          <h2 className="h2">6) Retenção & Segurança</h2>
          <p className="text-white/80 mt-2">
            Mantemos dados pelo tempo necessário ao atendimento das finalidades declaradas
            e prazos legais aplicáveis. Adotamos medidas técnicas e organizacionais razoáveis
            contra acesso não autorizado, alteração e destruição indevida.
          </p>
        </article>

        <article id="direitos" className="card">
          <h2 className="h2">7) Seus direitos (LGPD)</h2>
          <p className="text-white/80 mt-2">
            Você pode exercer, dentre outros, os direitos de confirmação de tratamento,
            acesso, correção, anonimização, portabilidade, exclusão e revogação do consentimento,
            nos termos da LGPD.
          </p>
        </article>

        <article id="contato" className="card">
          <h2 className="h2">8) Contato do controlador</h2>
          <p className="text-white/80 mt-2">
            Para dúvidas, solicitações de direitos ou questões sobre esta Política:
          </p>
          <div className="mt-2">
            <a
              href="mailto:contato@devtorquato.com.br"
              className="underline text-[#7bd8ff]"
            >
              contato@devtorquato.com.br
            </a>
          </div>
        </article>

        <article className="card">
          <h2 className="h2">9) Alterações desta Política</h2>
          <p className="text-white/80 mt-2">
            Podemos atualizar esta Política para refletir melhorias ou requisitos legais.
            A versão vigente será sempre a publicada nesta página, com a data de atualização.
          </p>
        </article>
      </div>
    </section>
  );
}
