"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
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
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      whatsapp: undefined, // garante a presença da chave desde o início
    } as Partial<FormData>,
  });

  const nome = watch("nome") ?? "";
  const email = watch("email") ?? "";
  const mensagem = watch("mensagem") ?? "";
  const projetoSel = watch("projeto"); // "institucional" | ... | undefined

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

  // classes reaproveitáveis (inputs e selects com o mesmo visual)
  const baseField =
    "w-full rounded-2xl bg-white/5 p-3 border outline-none focus:ring-2 focus:ring-[color:var(--brand-b)]";

  // select: remove aparência nativa e habilita tema dark quando suportado
  const selectField =
    `${baseField} pr-10 appearance-none [-webkit-appearance:none] [color-scheme:dark]`;

  return (
    <section className="container-app section grid md:grid-cols-2 gap-10 items-start">
      {/* CSS local para forçar options em dark quando o browser respeita */}
      <style jsx global>{`
        :root { color-scheme: dark; }
        select option {
          background: #0b1220;
          color: #eaf0fb;
        }
        select option[disabled] {
          color: rgba(234,240,251,.55);
        }
      `}</style>

      {/* FORM */}
      <motion.div className="card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="h1">Vamos conversar</h1>
        <p className="muted mt-2">Respondo rápido. Me diga o que você precisa.</p>

        <form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4">
          {/* Honeypot invisível */}
          <input
            type="text"
            {...register("website")}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div>
            <label className="block text-sm text-white/80 mb-1" htmlFor="nome">Nome*</label>
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
            <label className="block text-sm text-white/80 mb-1" htmlFor="email">E-mail*</label>
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
            <label className="block text-sm text-white/80 mb-1" htmlFor="whatsapp">WhatsApp (opcional)</label>
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
            {/* SELECT PROJETO */}
            <div>
              <label className="block text-sm text-white/80 mb-1" htmlFor="projeto">Tipo de projeto*</label>

              <div className="relative">
                <select
                  id="projeto"
                  {...register("projeto")}
                  defaultValue=""
                  className={`${selectField} ${errors.projeto ? "border-red-400" : "border-white/10"}`}
                  aria-invalid={!!errors.projeto}
                  aria-describedby={errors.projeto ? "err-projeto" : undefined}
                >
                  <option value="" disabled>Selecione</option>
                  {PROJETOS.map((p) => (
                    <option key={p} value={p}>
                      {LABEL_PROJETO[p]}
                    </option>
                  ))}
                </select>

                {/* setinha custom (não clicável) */}
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
                  ▼
                </span>
              </div>

              {errors.projeto && (
                <p id="err-projeto" className="text-red-400 text-sm mt-1">
                  {errors.projeto.message}
                </p>
              )}
            </div>

            {/* SELECT ORÇAMENTO */}
            <div>
              <label className="block text-sm text-white/80 mb-1" htmlFor="orcamento">
                Faixa de orçamento (opcional)
              </label>

              <div className="relative">
                <select
                  id="orcamento"
                  {...register("orcamento")}
                  defaultValue=""
                  className={`${selectField} border-white/10`}
                >
                  <option value="" disabled>Selecione</option>
                  {ORCAMENTOS.map((o) => (
                    <option key={o} value={o}>
                      {LABEL_ORCAMENTO[o]}
                    </option>
                  ))}
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
                  ▼
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-1" htmlFor="mensagem">Mensagem*</label>
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

          {/* mensagens de status com animação */}
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
          <li>⏱️ Tempo médio de resposta: <strong>em até 1h útil</strong></li>
          <li>🧪 Protótipo inicial em poucos dias</li>
          <li>🔧 <strong>7 dias de ajustes finos</strong> incluídos</li>
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
