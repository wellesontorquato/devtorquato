"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* --- Enums compatíveis com Zod v4 --- */
const PROJETOS = ["institucional", "landing", "saas", "automacao"] as const;
const ORCAMENTOS = ["basico", "profissional", "sobmedida"] as const;

const LABEL_PROJETO: Record<(typeof PROJETOS)[number], string> = {
  institucional: "Site institucional",
  landing: "Landing page",
  saas: "SaaS",
  automacao: "Automações",
};

const LABEL_ORCAMENTO: Record<(typeof ORCAMENTOS)[number], string> = {
  basico: "R$ 2k — 4k",
  profissional: "R$ 5k — 12k",
  sobmedida: "Acima de R$ 12k",
};

const PROJETO_OPTS = PROJETOS.map((p) => ({ value: p, label: LABEL_PROJETO[p] }));
const ORCAMENTO_OPTS = ORCAMENTOS.map((o) => ({ value: o, label: LABEL_ORCAMENTO[o] }));

/* --- Schema Zod v4 --- */
const schema = z.object({
  nome: z.string().min(2, { message: "Informe seu nome" }).trim(),
  email: z.string().email({ message: "E-mail inválido" }).toLowerCase(),

  // chave presente, aceita undefined
  whatsapp: z
    .union([z.string(), z.undefined()])
    .transform((v) => (v ?? "").trim())
    .transform((v) => (v === "" ? undefined : v)),

  projeto: z.enum(PROJETOS, { message: "Escolha o tipo de projeto" }),
  orcamento: z.enum(ORCAMENTOS).optional(),
  mensagem: z
    .string()
    .min(10, { message: "Descreva brevemente o que você precisa" })
    .trim(),
  website: z.string().optional(), // honeypot (deve ficar vazio)
});

type FormData = z.infer<typeof schema>;

/* --- máscara simples BR: (xx) xxxxx-xxxx --- */
function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

type Opt<T extends string> = { value: T; label: string };

function SelectCustom<T extends string>(props: {
  label: string;
  value?: T;
  onChange: (v: T | undefined) => void;
  options: Opt<T>[];
  placeholder?: string;
  required?: boolean;
  error?: string;
}) {
  const { label, value, onChange, options, placeholder = "Selecione", required, error } = props;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    const idx = options.findIndex((o) => o.value === value);
    return idx >= 0 ? idx : 0;
  });

  const id = useId();
  const ref = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const currentIndex = useMemo(() => {
    const idx = options.findIndex((o) => o.value === value);
    return idx >= 0 ? idx : -1;
  }, [options, value]);

  const currentLabel = useMemo(() => {
    const found = options.find((o) => o.value === value);
    return found?.label ?? "";
  }, [options, value]);

  // fecha clicando fora
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // quando abre, seta índice ativo
  useEffect(() => {
    if (!open) return;
    setActiveIndex(currentIndex >= 0 ? currentIndex : 0);
  }, [open, currentIndex]);

  // teclado: ↑ ↓ Enter Esc Home End
  function onKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      btnRef.current?.focus();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, options.length - 1));
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
      return;
    }

    if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
      return;
    }

    if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(options.length - 1);
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const opt = options[activeIndex];
      if (opt) {
        onChange(opt.value);
        setOpen(false);
        btnRef.current?.focus();
      }
      return;
    }
  }

  // typeahead simples (digitar para buscar)
  const typeRef = useRef("");
  const typeTimer = useRef<number | null>(null);
  function onTypeAhead(char: string) {
    const c = char.toLowerCase();
    typeRef.current = (typeRef.current + c).slice(0, 32);

    const idx = options.findIndex((o) => o.label.toLowerCase().startsWith(typeRef.current));
    if (idx >= 0) setActiveIndex(idx);

    if (typeTimer.current) window.clearTimeout(typeTimer.current);
    typeTimer.current = window.setTimeout(() => {
      typeRef.current = "";
      typeTimer.current = null;
    }, 650);
  }

  const listboxId = `${id}-listbox`;

  return (
    <div ref={ref}>
      <label className="block text-sm text-white/80 mb-1" htmlFor={id}>
        {label}
        {required ? "*" : ""}
      </label>

      <button
        ref={btnRef}
        id={id}
        type="button"
        onClick={() => setOpen((s) => !s)}
        onKeyDown={(e) => {
          // typeahead no botão também
          if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            onTypeAhead(e.key);
          }
          onKeyDown(e);
        }}
        className={[
          "w-full rounded-2xl bg-white/5 p-3 border outline-none text-left",
          "focus:ring-2 focus:ring-[color:var(--brand-b)]",
          error ? "border-red-400" : "border-white/10",
          "flex items-center justify-between gap-3",
        ].join(" ")}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
      >
        <span className={currentLabel ? "text-white/90" : "text-white/50"}>
          {currentLabel || placeholder}
        </span>
        <span className="text-white/60">▼</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="dropdown"
            id={listboxId}
            role="listbox"
            initial={{ opacity: 0, y: 6, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.99 }}
            transition={{ duration: 0.14 }}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-[color:var(--bg-elev)] shadow-xl overflow-hidden"
            onKeyDown={(e) => {
              if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                onTypeAhead(e.key);
              }
              onKeyDown(e);
            }}
          >
            {options.map((opt, idx) => {
              const selected = opt.value === value;
              const active = idx === activeIndex;

              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                    btnRef.current?.focus();
                  }}
                  className={[
                    "w-full px-4 py-3 text-left text-sm",
                    "hover:bg-white/5",
                    selected ? "text-white" : "text-white/85",
                    active ? "bg-white/10" : "",
                  ].join(" ")}
                >
                  {opt.label}
                </button>
              );
            })}

            {!required && (
              <button
                type="button"
                onClick={() => {
                  onChange(undefined);
                  setOpen(false);
                  btnRef.current?.focus();
                }}
                className="w-full px-4 py-3 text-left text-sm text-white/60 hover:bg-white/5 border-t border-white/10"
              >
                Limpar seleção
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default function ContatoPage() {
  const [status, setStatus] = useState<"idle" | "ok" | "erro">("idle");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      whatsapp: undefined,
      orcamento: undefined,
    } as Partial<FormData>,
  });

  const nome = watch("nome") ?? "";
  const email = watch("email") ?? "";
  const mensagem = watch("mensagem") ?? "";
  const projetoSel = watch("projeto");

  const waHref = useMemo(() => {
    const base = "https://wa.me/5582999405099";
    const projetoTxt = projetoSel ? LABEL_PROJETO[projetoSel] : "(tipo de projeto)";
    const text = encodeURIComponent(
      `Olá! Sou ${nome || "(seu nome)"}.\nQuero falar sobre: ${projetoTxt}.\nResumo: ${mensagem || "(sua mensagem)"}\nEmail: ${email || ""}`
    );
    return `${base}?text=${text}`;
  }, [nome, email, mensagem, projetoSel]);

  async function onSubmit(data: FormData) {
    try {
      if (data.website) return; // honeypot
      setLoading(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("fail");
      setStatus("ok");
      reset();
    } catch {
      setStatus("erro");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus("idle"), 5000);
    }
  }

  const baseField =
    "w-full rounded-2xl bg-white/5 p-3 border outline-none focus:ring-2 focus:ring-[color:var(--brand-b)]";

  return (
    <section className="container-app section grid md:grid-cols-2 gap-10 items-start">
      {/* FORM */}
      <motion.div className="card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="h1">Vamos conversar</h1>
        <p className="muted mt-2">Respondo rápido. Me diga o que você precisa.</p>

        <form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4">
          {/* Honeypot invisível */}
          <input type="text" {...register("website")} className="hidden" tabIndex={-1} autoComplete="off" />

          <div>
            <label className="block text-sm text-white/80 mb-1" htmlFor="nome">
              Nome*
            </label>
            <input
              id="nome"
              {...register("nome")}
              placeholder="Seu nome"
              className={`${baseField} ${errors.nome ? "border-red-400" : "border-white/10"}`}
              aria-invalid={!!errors.nome}
              aria-describedby={errors.nome ? "err-nome" : undefined}
              autoComplete="name"
            />
            {errors.nome && (
              <p id="err-nome" className="text-red-400 text-sm mt-1">
                {errors.nome.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-1" htmlFor="email">
              E-mail*
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="voce@empresa.com"
              className={`${baseField} ${errors.email ? "border-red-400" : "border-white/10"}`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "err-email" : undefined}
              autoComplete="email"
            />
            {errors.email && (
              <p id="err-email" className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-1" htmlFor="whatsapp">
              WhatsApp (opcional)
            </label>
            <input
              id="whatsapp"
              {...register("whatsapp")}
              placeholder="(82) 99999-9999"
              onChange={(e) => setValue("whatsapp", maskPhone(e.target.value), { shouldValidate: true })}
              className={`${baseField} border-white/10`}
              inputMode="tel"
              autoComplete="tel"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Controller
              name="projeto"
              control={control}
              render={({ field }) => (
                <SelectCustom
                  label="Tipo de projeto"
                  required
                  value={field.value}
                  onChange={(v) => field.onChange(v)}
                  options={PROJETO_OPTS}
                  error={errors.projeto?.message as string | undefined}
                />
              )}
            />

            <Controller
              name="orcamento"
              control={control}
              render={({ field }) => (
                <SelectCustom
                  label="Faixa de orçamento (opcional)"
                  value={field.value}
                  onChange={(v) => field.onChange(v)}
                  options={ORCAMENTO_OPTS}
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-1" htmlFor="mensagem">
              Mensagem*
            </label>
            <textarea
              id="mensagem"
              {...register("mensagem")}
              placeholder="Descreva objetivo, prazo e referências"
              className={`min-h-[140px] ${baseField} ${errors.mensagem ? "border-red-400" : "border-white/10"}`}
              aria-invalid={!!errors.mensagem}
              aria-describedby={errors.mensagem ? "err-msg" : undefined}
            />
            {errors.mensagem && (
              <p id="err-msg" className="text-red-400 text-sm mt-1">
                {errors.mensagem.message}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button disabled={loading || isSubmitting} className="btn btn-primary disabled:opacity-60" type="submit">
              {loading ? "Enviando..." : "Enviar"}
            </button>

            <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Falar no WhatsApp
            </a>
          </div>

          <AnimatePresence>
            {status === "ok" && (
              <motion.p
                key="ok"
                className="text-green-400"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                aria-live="polite"
              >
                Obrigado! Recebi sua mensagem e retorno em breve.
              </motion.p>
            )}
            {status === "erro" && (
              <motion.p
                key="erro"
                className="text-red-400"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                aria-live="assertive"
              >
                Não consegui enviar. Tente novamente.
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </motion.div>

      {/* LATERAL */}
      <motion.aside className="card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="h2">Como funciona</h2>
        <ul className="mt-4 space-y-3 text-white/80">
          <li>
            ⏱️ Tempo médio de resposta: <strong>em até 1h útil</strong>
          </li>
          <li>🧪 Protótipo inicial em poucos dias</li>
          <li>
            🔧 <strong>7 dias de ajustes finos</strong> incluídos
          </li>
          <li>📈 Foco em desempenho, SEO técnico e conversão</li>
        </ul>

        <div className="mt-6 border-t border-white/10 pt-6">
          <p className="muted">
            Prefere contato direto? Clique no botão de WhatsApp ao lado com a mensagem já pronta.
          </p>
        </div>
      </motion.aside>
    </section>
  );
}
