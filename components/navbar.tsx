"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  // sombra/fundo ao rolar + progresso de leitura
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setScrolled(y > 6);

      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? Math.min(100, (y / max) * 100) : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // trava o scroll quando o menu mobile abre
  useEffect(() => {
    if (open) document.documentElement.classList.add("overflow-hidden");
    else document.documentElement.classList.remove("overflow-hidden");
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b border-token backdrop-blur transition-colors",
        scrolled || open ? "bg-black/60" : "bg-black/40",
        scrolled ? "shadow-[0_8px_32px_-16px_rgba(0,0,0,0.6)]" : "shadow-none",
      ].join(" ")}
    >
      {/* progress bar superior */}
      <div className="h-[2px] bg-white/10">
        <div
          className="h-[2px] bg-brand-grad"
          style={{ width: `${progress}%` }}
          aria-hidden
        />
      </div>

      <nav className="container-app flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo-devtorquato.png" alt="DevTorquato" className="h-8" />
          <span className="sr-only">DevTorquato</span>
        </Link>

        {/* desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <NavLink href="/servicos" active={pathname?.startsWith("/servicos")}>
            Serviços
          </NavLink>
          <NavLink href="/cases" active={pathname?.startsWith("/cases")}>
            Cases
          </NavLink>
          <NavLink href="/sobre" active={pathname === "/sobre"}>
            Sobre
          </NavLink>
          <Link href="/contato" className="btn btn-primary">
            Contato
          </Link>
        </div>

        {/* mobile button */}
        <button
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-token"
        >
          <span className="sr-only">Menu</span>
          <div className="relative h-4 w-5">
            <span
              className={[
                "absolute left-0 top-0 h-0.5 w-full bg-white transition-transform",
                open ? "translate-y-2 rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 top-2 h-0.5 w-full bg-white transition-opacity",
                open ? "opacity-0" : "opacity-100",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 top-4 h-0.5 w-full bg-white transition-transform",
                open ? "-translate-y-2 -rotate-45" : "",
              ].join(" ")}
            />
          </div>
        </button>
      </nav>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden border-t border-token bg-black/70 backdrop-blur"
          >
            <div className="container-app py-4">
              <ul className="flex flex-col gap-2 text-sm">
                <li>
                  <NavLink
                    href="/servicos"
                    onClick={() => setOpen(false)}
                    active={pathname?.startsWith("/servicos")}
                    mobile
                  >
                    Serviços
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    href="/cases"
                    onClick={() => setOpen(false)}
                    active={pathname?.startsWith("/cases")}
                    mobile
                  >
                    Cases
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    href="/sobre"
                    onClick={() => setOpen(false)}
                    active={pathname === "/sobre"}
                    mobile
                  >
                    Sobre
                  </NavLink>
                </li>
                <li className="pt-2">
                  <Link href="/contato" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  href,
  children,
  active,
  onClick,
  mobile = false,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  mobile?: boolean;
}) {
  const base =
    "group relative inline-flex items-center gap-2 py-2 transition-colors";
  const color = active ? "text-white" : "text-white/80 hover:text-white";
  const pad = mobile ? "pr-2" : "px-1";

  return (
    <Link href={href} onClick={onClick} className={[base, color, pad].join(" ")}>
      <span>{children}</span>
      {/* underline gradiente */}
      <span
        aria-hidden
        className={[
          "pointer-events-none absolute left-0 right-0 -bottom-0.5 h-[2px] origin-left bg-brand-grad transition-transform",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        ].join(" ")}
      />
    </Link>
  );
}
