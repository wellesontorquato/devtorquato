// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

// Garante runtime Node (necessário para Nodemailer)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
      return num || undefined;
    }),
  projeto: z.enum(PROJETO, { message: "Escolha o tipo de projeto" }),
  orcamento: z.enum(ORCAMENTO).optional(),
  mensagem: z.string().min(10, { message: "Descreva seu projeto" }).trim(),
});

// --- Variáveis de ambiente (SMTP KingHost)
const SMTP_HOST = process.env.SMTP_HOST ?? "smtpi.kinghost.net";
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 465); // 465=SSL, 587=STARTTLS
const SMTP_USER = process.env.SMTP_USER; // contato@seu-dominio.com.br
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_SECURE = (process.env.SMTP_SECURE ?? "true") === "true"; // true p/ 465

const TO_EMAIL = process.env.CONTACT_TO ?? "welleson.ism@gmail.com";
const FROM_EMAIL =
  process.env.CONTACT_FROM ?? 'Site DevTorquato <no-reply@devtorquato.com.br>';

function makeTransport() {
  if (!SMTP_USER || !SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE, // true: SSL direto (465); false: usa STARTTLS (587)
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export async function POST(req: Request) {
  try {
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

    // Se não houver SMTP configurado, faz mock (útil em dev/local/preview)
    const transporter = makeTransport();
    if (!transporter) {
      console.log("Lead recebido (mock, sem SMTP_USER/SMTP_PASS):", data);
      return NextResponse.json({ ok: true, mocked: true });
    }

    const subject = `Novo lead — ${data.projeto.toUpperCase()}`;
    const text = [
      `Nome: ${data.nome}`,
      `E-mail: ${data.email}`,
      `WhatsApp: ${data.whatsapp ?? "-"}`,
      `Projeto: ${data.projeto}`,
      `Orçamento: ${data.orcamento ?? "-"}`,
      "",
      data.mensagem,
    ].join("\n");

    const html = `
      <div style="font-family:system-ui,Arial,sans-serif;line-height:1.4">
        <h2 style="margin:0 0 10px">${subject}</h2>
        <p><b>Nome:</b> ${escapeHtml(data.nome)}</p>
        <p><b>E-mail:</b> ${escapeHtml(data.email)}</p>
        <p><b>WhatsApp:</b> ${escapeHtml(data.whatsapp ?? "-")}</p>
        <p><b>Projeto:</b> ${escapeHtml(data.projeto)}</p>
        <p><b>Orçamento:</b> ${escapeHtml(data.orcamento ?? "-")}</p>
        <hr style="margin:16px 0;border:none;border-top:1px solid #e5e7eb" />
        <p>${escapeHtml(data.mensagem).replace(/\n/g, "<br/>")}</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: FROM_EMAIL,     // deve ser do SEU domínio (configurado no KingHost)
      to: TO_EMAIL,         // para onde você recebe os leads
      subject,
      text,
      html,
      replyTo: data.email,  // facilita responder direto ao lead
    });

    // Log minimally útil
    console.log("Email enviado:", info.messageId);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact_api_error:", err);
    return NextResponse.json(
      { ok: false, error: "invalid_or_failed" },
      { status: 400 }
    );
  }
}

// Saneador simples para HTML
function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
