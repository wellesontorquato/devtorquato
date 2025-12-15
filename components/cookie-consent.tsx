"use client";

import { useEffect, useState } from "react";

type Consent = "accepted" | "rejected";

const STORAGE_KEY = "cookie_consent_v1";
// duração “lógica” via timestamp (pra expirar sem depender de cookie)
const MAX_AGE_DAYS = 180;

function isExpired(savedAt: number) {
  const ms = MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
  return Date.now() - savedAt > ms;
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setOpen(true);
        return;
      }
      const parsed = JSON.parse(raw) as { value: Consent; savedAt: number };
      if (!parsed?.value || !parsed?.savedAt || isExpired(parsed.savedAt)) {
        localStorage.removeItem(STORAGE_KEY);
        setOpen(true);
        return;
      }
      setOpen(false);
    } catch {
      // se der qualquer erro, mostra o banner
      setOpen(true);
    }
  }, []);

  function save(value: Consent) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ value, savedAt: Date.now() })
      );
    } catch {
      // ignore
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <div className="mx-auto max-w-6xl">
        <div className="glass flex flex-col gap-3 rounded-2xl border p-4 md:flex-row md:items-center md:justify-between md:p-5">
          <div className="text-sm leading-relaxed">
            <p className="font-semibold">Cookies</p>
            <p className="muted">
              Usamos cookies para melhorar sua experiência e entender como você
              usa o site. Você pode aceitar ou recusar.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              className="btn btn-outline py-2"
              onClick={() => save("rejected")}
            >
              Recusar
            </button>
            <button
              className="btn btn-primary py-2"
              onClick={() => save("accepted")}
            >
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
