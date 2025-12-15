"use client";

import { useEffect, useMemo, useState } from "react";

type Consent = "accepted" | "rejected";

type CookieConsentProps = {
  title?: string;
  message?: string;
  acceptLabel?: string;
  rejectLabel?: string;
  policyLabel?: string;
  policyHref?: string;
  storageKey?: string;
  maxAgeDays?: number;
  position?: "bottom" | "top";
};

function isExpired(savedAt: number, maxAgeDays: number) {
  const ms = maxAgeDays * 24 * 60 * 60 * 1000;
  return Date.now() - savedAt > ms;
}

export default function CookieConsent({
  title = "Cookies",
  message = "Usamos cookies para melhorar sua experiência e entender como você usa o site. Você pode aceitar ou recusar.",
  acceptLabel = "Aceitar",
  rejectLabel = "Recusar",
  policyLabel = "Política de Privacidade",
  policyHref = "/politica-privacidade",
  storageKey = "cookie_consent_v1",
  maxAgeDays = 180,
  position = "bottom",
}: CookieConsentProps) {
  const [open, setOpen] = useState(false);

  const wrapperPosClass = useMemo(() => {
    return position === "top"
      ? "fixed inset-x-0 top-0 z-50 p-4"
      : "fixed inset-x-0 bottom-0 z-50 p-4";
  }, [position]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) {
        setOpen(true);
        return;
      }
      const parsed = JSON.parse(raw) as { value: Consent; savedAt: number };
      if (!parsed?.value || !parsed?.savedAt || isExpired(parsed.savedAt, maxAgeDays)) {
        localStorage.removeItem(storageKey);
        setOpen(true);
        return;
      }
      setOpen(false);
    } catch {
      setOpen(true);
    }
  }, [storageKey, maxAgeDays]);

  function save(value: Consent) {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ value, savedAt: Date.now() }));
    } catch {
      // ignore
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className={wrapperPosClass} role="dialog" aria-live="polite" aria-label="Aviso de cookies">
      <div className="mx-auto max-w-6xl">
        <div className="glass flex flex-col gap-3 rounded-2xl border p-4 md:flex-row md:items-center md:justify-between md:p-5">
          <div className="text-sm leading-relaxed">
            <p className="font-semibold">{title}</p>
            <p className="muted">
              {message}{" "}
              {policyHref ? (
                <a
                  href={policyHref}
                  className="underline underline-offset-4 hover:opacity-90"
                >
                  {policyLabel}
                </a>
              ) : null}
              .
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="btn btn-outline py-2 cursor-pointer hover:opacity-95 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-b)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
              onClick={() => save("rejected")}
            >
              {rejectLabel}
            </button>

            <button
              type="button"
              className="
                btn btn-primary py-2 cursor-pointer
                transition-all duration-200
                hover:-translate-y-[1px] hover:brightness-110 hover:shadow-[0_14px_36px_rgba(14,165,255,0.22)]
                active:translate-y-0 active:scale-[0.99] active:brightness-105
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-b)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]
              "
              onClick={() => save("accepted")}
            >
              {acceptLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
