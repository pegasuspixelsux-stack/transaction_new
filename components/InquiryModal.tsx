"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const focusRing =
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink";
const labelClass = "text-xs uppercase tracking-luxury text-ink-muted";
const fieldClass =
  "border border-hairline bg-surface px-4 py-3 text-sm text-ink transition-colors placeholder:text-ink-muted focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ink disabled:opacity-60";
const buttonClass = `inline-flex min-h-11 items-center justify-center border border-ink/30 px-8 text-xs uppercase tracking-luxury transition-colors hover:bg-ink hover:text-surface active:bg-ink/90 active:text-surface disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:text-ink ${focusRing}`;

type Status = "idle" | "loading" | "sent" | "error";

export function InquiryModal({
  propertyTitle,
  triggerLabel = "Consultar por esta propiedad",
}: {
  propertyTitle: string;
  triggerLabel?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", accepted: false });

  const open = () => dialogRef.current?.showModal();
  const close = () => {
    dialogRef.current?.close();
    if (status === "sent") {
      setStatus("idle");
      setForm({ name: "", phone: "", accepted: false });
    }
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.accepted) return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          intent: "Comprar",
          message: `Consulta sobre propiedad: ${propertyTitle}`,
          source: "contact-form",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "No pudimos registrar su consulta. Intente de nuevo.");
      }
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos registrar su consulta.");
      setStatus("error");
    }
  }

  const loading = status === "loading";

  return (
    <>
      <button type="button" onClick={open} className={buttonClass}>
        {triggerLabel}
      </button>

      <dialog
        ref={dialogRef}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto w-[calc(100%-2rem)] max-w-md border border-hairline bg-surface p-8 text-ink backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Cerrar"
          className={`absolute right-2 top-2 inline-flex size-11 items-center justify-center text-ink-muted transition-colors hover:text-ink ${focusRing}`}
        >
          <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
        </button>

        {status === "sent" ? (
          <div role="status" className="flex flex-col gap-4">
            <h2 className="font-display text-2xl font-normal tracking-tight">
              Consulta recibida
            </h2>
            <p className="text-sm leading-relaxed text-ink-muted">
              Registramos sus datos. Un asesor de Oceanus se pondrá en contacto
              por WhatsApp o teléfono a la brevedad.
            </p>
            <button type="button" onClick={close} className={`${buttonClass} self-start`}>
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <div>
              <p className={labelClass}>Asesoría privada</p>
              <h2 className="mt-2 font-display text-2xl font-normal tracking-tight">
                Consultar propiedad
              </h2>
              <p className="mt-1 text-sm text-ink-muted">{propertyTitle}</p>
            </div>

            <label className="flex flex-col gap-2">
              <span className={labelClass}>Nombre completo</span>
              <input
                type="text"
                name="nombre"
                autoComplete="name"
                required
                disabled={loading}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className={fieldClass}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className={labelClass}>Teléfono / WhatsApp</span>
              <input
                type="tel"
                name="telefono"
                autoComplete="tel"
                required
                disabled={loading}
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="+598 99 123 456"
                className={fieldClass}
              />
            </label>

            <label className="flex items-start gap-3 text-xs leading-relaxed text-ink-muted">
              <input
                type="checkbox"
                required
                disabled={loading}
                checked={form.accepted}
                onChange={(e) => setForm((f) => ({ ...f, accepted: e.target.checked }))}
                className={`mt-0.5 size-4 shrink-0 accent-ink ${focusRing}`}
              />
              <span>
                Autorizo a Oceanus a utilizar mis datos de contacto
                exclusivamente para gestionar esta consulta, de acuerdo con la{" "}
                <Link href="/privacidad" className="underline underline-offset-2 hover:text-ink">
                  política de privacidad
                </Link>
                .
              </span>
            </label>

            {status === "error" && (
              <p role="alert" className="text-sm text-ink">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading || !form.accepted} className={buttonClass}>
              {loading ? "Enviando…" : "Enviar consulta"}
            </button>
          </form>
        )}
      </dialog>
    </>
  );
}
