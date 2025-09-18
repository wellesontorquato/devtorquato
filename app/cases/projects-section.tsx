"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ---------- helpers ---------- */
function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width:${breakpoint - 1}px)`);

    // inicial
    setIsMobile(mql.matches);

    // listener tipado (sem any) + fallback
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", handleChange);
      return () => mql.removeEventListener("change", handleChange);
    } else {
      // Safari/legacy
      mql.addListener(handleChange);
      return () => mql.removeListener(handleChange);
    }
  }, [breakpoint]);

  return isMobile;
}

/* ---------- data ---------- */
type Project = { title: string; desc: string; href?: string; image: string };

const projects: Project[] = [
  {
    title: "PsiGestor",
    desc:
      "Plataforma para psicólogos, psiquiatras e psicanalistas com agendamento visual, finanças, notificações e relatórios.",
    href: "https://psigestor.com",
    image: "/assets/psigestor-preview.png",
  },
  {
    title: "EvoPlus",
    desc:
      "Sistema para profissionais da saúde gerarem evoluções automáticas com modelos dinâmicos e personalizáveis.",
    href: "https://evoplus.com.br",
    image: "/assets/evoplus-preview.png",
  },
  {
    title: "SellerZone",
    desc:
      "Automações de processos para operações de E-commerce, otimizando gestão e vendas.",
    href: "https://www.sellerzone.com.br",
    image: "/assets/sellerzone-preview.png",
  },

  // —— Landing pages —— 
  {
    title: "Landing — Fotógrafo",
    desc:
      "Landing page para fotógrafo: portfólio com galeria responsiva, destaque para serviços e CTA de orçamento.",
    href: "https://fotografothonynunes.netlify.app/",
    image: "/assets/portfolio1-preview.png",
  },
  {
    title: "Landing — Influenciadora Fitness & Automotivo",
    desc:
      "Landing para influenciadora: mídia kit, cases, depoimentos e blocos de parceria/contato.",
    href: "https://babisouza.netlify.app",
    image: "/assets/portfolio2-preview.png",
  },
  {
    title: "Landing — Maquiadora Profissional",
    desc:
      "Landing para maquiadora com portfólio, depoimentos e CTA de agendamento.",
    href: "https://amandapessoamakeup.netlify.app/",
    image: "/assets/portfolio3-preview.png",
  },

  {
    title: "Projeto Hemodiálise",
    desc:
      "Sistema para gestão de pacientes em clínicas de hemodiálise: cadastro, evoluções e controle de máquinas.",
    image: "/assets/projetohemodialise-preview.png",
  },
];

/* ---------- component ---------- */
export default function ProjectsSection() {
  const [open, setOpen] = useState<Project | null>(null);
  const isMobile = useIsMobile();

  // trava scroll ao abrir + ESC fecha
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // card reutilizável
  function ProjectCard(p: Project) {
    return (
      <article className="card overflow-hidden p-0">
        <motion.button
          type="button"
          className="relative h-44 md:h-56 w-full"
          onClick={() => setOpen(p)}
          {...(!isMobile && { layoutId: `proj-${p.title}` })}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          aria-label={`Ampliar ${p.title}`}
        >
          <Image
            src={p.image}
            alt={p.title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          />
        </motion.button>

        <div className="p-6">
          <h4 className="h3">{p.title}</h4>
          <p className="mt-2 text-white/80">{p.desc}</p>
          {p.href && (
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-4 text-[#7bd8ff] underline"
            >
              Ver projeto →
            </a>
          )}
        </div>
      </article>
    );
  }

  return (
    <section className="container-app section" id="projetos">
      <h2 className="h2">Projetos</h2>
      <p className="muted mt-2">
        Confira alguns dos projetos que construí, com foco em escalabilidade e performance.
      </p>

      {/* MOBILE: galeria horizontal com scroll-snap */}
      <div className="mt-6 -mx-4 md:hidden relative">
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[var(--bg)] to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[var(--bg)] to-transparent" />

        <ul
          className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-2"
          aria-label="Galeria de projetos (arraste para o lado)"
        >
          {projects.map((p) => (
            <li key={p.title} className="snap-start shrink-0 w-[85%] max-w-[520px]">
              {ProjectCard(p)}
            </li>
          ))}
        </ul>
      </div>

      {/* DESKTOP: grid comum */}
      <div className="mt-6 hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p.title}>{ProjectCard(p)}</div>
        ))}
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(null)}
            />

            {!isMobile && (
              <motion.div
                key="desktop-sheet"
                className="fixed inset-0 z-[101] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(null)}
              >
                <motion.div
                  layoutId={`proj-${open.title}`}
                  className="relative w-full max-w-4xl h-[70vh]"
                  transition={{ type: "spring", stiffness: 200, damping: 24 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={open.image}
                    alt={open.title}
                    fill
                    className="object-contain rounded-2xl border"
                    sizes="100vw"
                    priority
                  />
                </motion.div>

                <motion.div
                  className="absolute bottom-6 left-0 right-0 mx-auto w-full max-w-3xl text-center px-4"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h5 className="text-lg font-semibold">{open.title}</h5>
                  <p className="text-white/80 mt-1">{open.desc}</p>
                  {open.href && (
                    <a
                      href={open.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 btn btn-primary"
                    >
                      Abrir projeto
                    </a>
                  )}
                </motion.div>

                <motion.button
                  className="absolute top-5 right-5 btn btn-outline bg-black/40"
                  onClick={() => setOpen(null)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Fechar
                </motion.button>
              </motion.div>
            )}

            {isMobile && (
              <motion.div
                key="mobile-card"
                className="fixed inset-0 z-[102] p-4 pt-[calc(1rem+env(safe-area-inset-top))] pb-[calc(1rem+env(safe-area-inset-bottom))] flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(null)}
              >
                <div className="relative w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    className="absolute -top-1 right-0 translate-y-[-100%] btn btn-outline bg-black/40 z-20"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen(null);
                    }}
                  >
                    Fechar
                  </button>

                  <div className="bg-[var(--bg-elev)] border border-[color:var(--border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                    <motion.div
                      className="relative h-[55vh] bg-black/20"
                      drag="y"
                      dragConstraints={{ top: 0, bottom: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(_, info) => {
                        if (info.offset.y > 120) setOpen(null);
                      }}
                    >
                      <Image
                        src={open.image}
                        alt={open.title}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        priority
                      />
                    </motion.div>

                    <div className="p-4">
                      <h5 className="text-base font-semibold text-center">{open.title}</h5>
                      <p className="text-white/80 text-sm mt-1 text-center">{open.desc}</p>
                      {open.href && (
                        <a
                          href={open.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary w-full mt-3"
                        >
                          Abrir projeto
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
