"use client";

import { useEffect, useMemo, useState } from "react";

/* ================== TIPOS ================== */

type Preferences = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
};

const DEFAULT_PREFS: Preferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

type CookieConsentProps = {
  /* textos */
  title?: string;
  message?: string;

  acceptAllLabel?: string;
  rejectAllLabel?: string;
  settingsLabel?: string;
  saveLabel?: string;
  backLabel?: string;

  policyLabel?: string;
  policyHref?: string;

  /* comportamento */
  storageKey?: string;
  maxAgeDays?: number;
  position?: "bottom" | "top";
};

/* ================== HELPERS ================== */

function isExpired(savedAt: number, maxAgeDays: number) {
  const ms = maxAgeDays * 24 * 60 * 60 * 1000;
  return Date.now() - savedAt > ms;
}

/* ================== COMPONENT ================== */

export default function CookieConsent({
  /* textos */
  title = "Cookies",
  message =
    "Usamos cookies para melhorar sua experiência. Você pode aceitar, recusar ou personalizar.",
  acceptAllLabel = "Aceitar tudo",
  rejectAllLabel = "Recusar",
  settingsLabel = "Configurar",
  saveLabel = "Salvar preferências",
  backLabel = "Voltar",

  policyLabel = "Política de Privacidade",
  policyHref = "/politica-privacidade",

  /* comportamento */
  storageKey = "cookie_consent_v2",
  maxAgeDays = 180,
  position = "bottom",
}: CookieConsentProps) {
  const [open, setOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState<Preferences>(DEFAULT_PREFS);

  const wrapperPosClass = useMemo(
    () =>
      position === "top"
        ? "fixed inset-x-0 top-0 z-50 p-4"
        : "fixed inset-x-0 bottom-0 z-50 p-4",
    [position]
  );

  /* ================== INIT ================== */

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) {
        setOpen(true);
        return;
      }

      const parsed = JSON.parse(raw) as {
        prefs: Preferences;
        savedAt: number;
      };

      if (!parsed?.prefs || !parsed?.savedAt || isExpired(parsed.savedAt, maxAgeDays)) {
        localStorage.removeItem(storageKey);
        setOpen(true);
        return;
      }

      setPrefs(parsed.prefs);
      setOpen(false);
    } catch {
      setOpen(true);
    }
  }, [storageKey, maxAgeDays]);

  /* ================== ACTIONS ================== */

  function savePreferences(newPrefs: Preferences) {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ prefs: newPrefs, savedAt: Date.now() })
      );
    } catch {
      // ignore
    }
    setPrefs(newPrefs);
    setOpen(false);
    setShowPrefs(false);
  }

  if (!open) return null;

  /* ================== RENDER ================== */

  return (
    <div className={wrapperPosClass} role="dialog" aria-live="polite">
      <div className="mx-auto max-w-6xl">
        <div className="glass rounded-2xl border p-4 md:p-5">
          {!showPrefs ? (
            /* ===== BANNER ===== */
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-sm leading-relaxed">
                <p className="font-semibold">{title}</p>
                <p className="muted">
                  {message}{" "}
                  {policyHref && (
                    <a
                      href={policyHref}
                      className="underline underline-offset-4 hover:opacity-90"
                    >
                      {policyLabel}
                    </a>
                  )}
                  .
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  className="btn btn-outline py-2 cursor-pointer"
                  onClick={() =>
                    savePreferences({
                      essential: true,
                      analytics: false,
                      marketing: false,
                    })
                  }
                >
                  {rejectAllLabel}
                </button>

                <button
                  className="btn btn-outline py-2 cursor-pointer"
                  onClick={() => setShowPrefs(true)}
                >
                  {settingsLabel}
                </button>

                <button
                  className="
                    btn btn-primary py-2 cursor-pointer
                    transition-all duration-200
                    hover:-translate-y-[1px] hover:brightness-110
                  "
                  onClick={() =>
                    savePreferences({
                      essential: true,
                      analytics: true,
                      marketing: true,
                    })
                  }
                >
                  {acceptAllLabel}
                </button>
              </div>
            </div>
          ) : (
            /* ===== PREFERÊNCIAS ===== */
            <div className="flex flex-col gap-4">
              <p className="font-semibold">Preferências de Cookies</p>

              <div className="space-y-3 text-sm">
                <label className="flex items-center justify-between gap-4">
                  <span>
                    <strong>Essenciais</strong>
                    <p className="muted text-xs">
                      Necessários para o funcionamento do site.
                    </p>
                  </span>
                  <input type="checkbox" checked disabled />
                </label>

                <label className="flex items-center justify-between gap-4">
                  <span>
                    <strong>Analytics</strong>
                    <p className="muted text-xs">
                      Nos ajudam a entender como o site é usado.
                    </p>
                  </span>
                  <input
                    type="checkbox"
                    checked={prefs.analytics}
                    onChange={(e) =>
                      setPrefs({ ...prefs, analytics: e.target.checked })
                    }
                  />
                </label>

                <label className="flex items-center justify-between gap-4">
                  <span>
                    <strong>Marketing</strong>
                    <p className="muted text-xs">
                      Usados para anúncios e campanhas personalizadas.
                    </p>
                  </span>
                  <input
                    type="checkbox"
                    checked={prefs.marketing}
                    onChange={(e) =>
                      setPrefs({ ...prefs, marketing: e.target.checked })
                    }
                  />
                </label>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <button
                  className="btn btn-outline py-2 cursor-pointer"
                  onClick={() => setShowPrefs(false)}
                >
                  {backLabel}
                </button>

                <button
                  className="btn btn-primary py-2 cursor-pointer"
                  onClick={() => savePreferences(prefs)}
                >
                  {saveLabel}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
