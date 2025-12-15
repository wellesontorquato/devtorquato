import "./globals.css";
import { ReactNode } from "react";
import { Sora, Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CookieConsent from "@/components/cookie-consent";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "DevTorquato — Sites, Landing Pages e SaaS escalável",
  description:
    "Soluções rápidas, bonitas e com automações que economizam tempo e reduzem erros.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`dark ${sora.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[var(--bg)] text-[var(--fg)] antialiased font-[var(--font-sora)]">
        <Navbar />

        <main className="flex-1">{children}</main>

        <Footer />

        <CookieConsent
          title="Cookies"
          message="Usamos cookies para melhorar sua experiência e entender como você usa o site."
          acceptAllLabel="Aceitar tudo"
          rejectAllLabel="Recusar"
          settingsLabel="Configurar"
          saveLabel="Salvar preferências"
          backLabel="Voltar"
          policyLabel="Política de Privacidade"
          policyHref="/politica-privacidade"
          maxAgeDays={180}
          position="bottom"
        />
      </body>
    </html>
  );
}
