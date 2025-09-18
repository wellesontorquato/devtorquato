import Link from "next/link";

/* ícones minimalistas (com suppressHydrationWarning) */
function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden suppressHydrationWarning {...props}>
      <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth={1.6} suppressHydrationWarning />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth={1.6} suppressHydrationWarning />
    </svg>
  );
}
function WhatsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden suppressHydrationWarning {...props}>
      <path d="M8.5 20l-3 1 1-3A8 8 0 1012 21a8.2 8.2 0 01-3.5-.9" stroke="currentColor" strokeWidth={1.6} suppressHydrationWarning />
      <path d="M8.5 9.5c.3 2 2.7 4.5 4.7 5 .7.2 2-.4 2.3-1.2" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" suppressHydrationWarning />
    </svg>
  );
}
function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden suppressHydrationWarning {...props}>
      <path
        suppressHydrationWarning
        d="M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-3 .7-3.6-1.2-3.6-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.5 1.1 3.1.8.1-.7.4-1.1.7-1.4-2.4-.3-5-1.2-5-5.5 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.5.1-3 0 0 .9-.3 3 .9a10.4 10.4 0 015.4 0c2-.2 3-.9 3-.9.6 1.5.2 2.7.1 3 .7.8 1.1 1.7 1.1 2.9 0 4.3-2.6 5.2-5 5.5.4.3.7.9.7 1.9v2.7c0 .3.2.6.7.5A10 10 0 0012 2z"
      />
    </svg>
  );
}
function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden suppressHydrationWarning {...props}>
      <path
        suppressHydrationWarning
        d="M4.98 3.5A2.5 2.5 0 107.5 6 2.5 2.5 0 004.98 3.5zM3.5 8.5h3v12h-3zM10 8.5h2.8v1.7h.1c.4-.8 1.5-1.7 3-1.7 3.2 0 3.8 2.1 3.8 4.8v7.2h-3v-6.4c0-1.5 0-3.3-2-3.3s-2.3 1.6-2.3 3.2v6.5h-3z"
      />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-[color:var(--border)]">
      <div className="container-app py-10">

        {/* ================= MOBILE (md:hidden) ================= */}
        <div className="md:hidden space-y-6">
          <div className="flex items-start gap-3">
            <img src="/logo-devtorquato.png" alt="DevTorquato" className="h-6 mt-0.5" />
            <p className="text-sm text-white/60">
              Sites institucionais, landing pages e SaaS — performance e conversão.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <a
              href="https://wa.me/5582999405099?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20DevTorquato%20e%20gostaria%20de%20falar%20sobre%20um%20projeto%20(site%20institucional%20/%20landing%20page%20/%20SaaS%20/%20automa%C3%A7%C3%B5es)."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary inline-flex items-center justify-center gap-2 min-h-[44px]"
            >
              <WhatsIcon className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href="mailto:contato@devtorquato.com.br"
              className="btn btn-outline inline-flex items-center justify-center gap-2 min-h-[44px]"
            >
              <MailIcon className="h-4 w-4" /> E-mail
            </a>
          </div>

          <div className="rounded-2xl border border-[color:var(--border)] overflow-hidden divide-y divide-white/10">
            <details>
              <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm">
                <span className="font-medium text-white/85">Navegação</span>
                <span className="text-white/50">+</span>
              </summary>
              <ul className="px-4 pb-3 pt-1 space-y-2 text-sm">
                <li><Link href="/servicos" className="hover:text-white">Serviços</Link></li>
                <li><Link href="/cases" className="hover:text-white">Cases</Link></li>
                <li><Link href="/sobre" className="hover:text-white">Sobre</Link></li>
              </ul>
            </details>

            <details>
              <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm">
                <span className="font-medium text-white/85">Legal</span>
                <span className="text-white/50">+</span>
              </summary>
              <ul className="px-4 pb-3 pt-1 space-y-2 text-sm">
                <li><Link href="/politica-privacidade" className="hover:text-white">Política de Privacidade</Link></li>
                <li><Link href="/termos" className="hover:text-white">Termos de Uso</Link></li>
              </ul>
            </details>
          </div>

          <div className="flex items-center gap-5 text-white/60">
            <a href="https://wellesontorquato.github.io" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-white">
              <GitHubIcon className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/welleson-torquato/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white">
              <LinkedInIcon className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* ================= DESKTOP (hidden md:grid) ================= */}
        <div className="hidden md:grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-2">
              <img src="/logo-devtorquato.png" alt="DevTorquato" className="h-6" />
              <span className="sr-only">DevTorquato</span>
            </Link>
            <p className="text-sm text-white/60">
              Sites institucionais, landing pages e sistemas SaaS escaláveis — com foco em performance e conversão.
            </p>
          </div>

          <nav className="text-sm">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="mb-2 font-medium text-white/80">Navegação</p>
                <ul className="space-y-2">
                  <li><Link href="/servicos" className="hover:text-white">Serviços</Link></li>
                  <li><Link href="/cases" className="hover:text-white">Cases</Link></li>
                  <li><Link href="/sobre" className="hover:text-white">Sobre</Link></li>
                </ul>
              </div>
              <div>
                <p className="mb-2 font-medium text-white/80">Legal</p>
                <ul className="space-y-2">
                  <li><Link href="/politica-privacidade" className="hover:text-white">Política de Privacidade</Link></li>
                  <li><Link href="/termos" className="hover:text-white">Termos de Uso</Link></li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="space-y-3">
            <p className="font-medium text-white/80">Contato</p>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:contato@devtorquato.com.br" className="btn btn-outline inline-flex items-center gap-2">
                <MailIcon className="h-4 w-4" /> E-mail
              </a>
              <a
                href="https://wa.me/5582999405099?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20DevTorquato%20e%20gostaria%20de%20falar%20sobre%20um%20projeto%20(site%20institucional%20/%20landing%20page%20/%20SaaS%20/%20automa%C3%A7%C3%B5es)."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary inline-flex items-center gap-2"
              >
                <WhatsIcon className="h-4 w-4" /> WhatsApp
              </a>
            </div>
            <div className="flex items-center gap-4 text-white/60">
              <a href="https://wellesontorquato.github.io" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-white">
                <GitHubIcon className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/welleson-torquato/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white">
                <LinkedInIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* divisor com gradiente da marca */}
        <div className="mt-8 h-px w-full bg-[linear-gradient(90deg,transparent,var(--brand-b),transparent)]" />

        {/* linha final */}
        <div className="mt-6 flex flex-col items-start justify-between gap-2 text-xs text-white/60 md:flex-row">
          <p suppressHydrationWarning>© {year} DevTorquato — Feito no Brasil.</p>
        </div>
      </div>
    </footer>
  );
}
