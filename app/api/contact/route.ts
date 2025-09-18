import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

// --- enums compatíveis com Zod v4
const PROJETO = ["institucional", "landing", "saas", "automacao"] as const;
const ORCAMENTO = ["basico", "profissional", "sobmedida"] as const;

// --- schema com mensagens e pequenos saneamentos
const schema = z.object({
  nome: z.string().min(2, { message: "Informe seu nome" }).trim(),
  email: z.string().email({ message: "E-mail inválido" }).toLowerCase(),
  whatsapp: z
    .string()
    .optional()
    .transform((v) => {
      const num = (v ?? "").replace(/\D/g, "");
      return num || undefined; // guarda só dígitos ou vira undefined
    }),
  projeto: z.enum(PROJETO, { message: "Escolha o tipo de projeto" }),
  orcamento: z.enum(ORCAMENTO).optional(),
  mensagem: z.string().min(10, { message: "Descreva seu projeto" }).trim(),
});

const resendApiKey = process.env.RESEND_API_KEY;
const toEmail = process.env.CONTACT_TO ?? "welleson.ism@gmail.com";
// IMPORTANTE: o remetente precisa ser de domínio verificado no Resend
const fromEmail =
  process.env.CONTACT_FROM ?? "Site DevTorquato <contato@devtorquato.com.br>";

export async function POST(req: Request) {
  try {
    // Garante JSON
    const ctype = req.headers.get("content-type") || "";
    if (!ctype.includes("application/json")) {
      return NextResponse.json(
        { ok: false, error: "invalid_content_type" },
        { status: 415 }
      );
    }

    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "invalid_payload", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Sem chave → loga e retorna ok (útil em dev/ambiente estático)
    if (!resendApiKey) {
      console.log("Lead recebido (mock, sem RESEND_API_KEY):", data);
      return NextResponse.json({ ok: true, mocked: true });
    }

    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `Novo lead — ${data.projeto.toUpperCase()}`,
      reply_to: data.email, // facilita responder direto ao lead
      text: [
        `Nome: ${data.nome}`,
        `E-mail: ${data.email}`,
        `WhatsApp: ${data.whatsapp ?? "-"}`,
        `Projeto: ${data.projeto}`,
        `Orçamento: ${data.orcamento ?? "-"}`,
        "",
        data.mensagem,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "email_send_failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "invalid_or_failed" },
      { status: 400 }
    );
  }
}
