"use client";

import { useState } from "react";
import Link from "next/link";

const PROPERTY_TYPES = [
  "Residencia / Casa",
  "Penthouse / Apartamento",
  "Terreno / Chacra",
  "Local comercial",
] as const;

const focusRing =
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink";
const labelClass = "text-xs uppercase tracking-luxury text-ink-muted";
const fieldClass =
  "border border-hairline bg-surface px-4 py-3 text-sm text-ink transition-colors placeholder:text-ink-muted focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ink disabled:opacity-60";
const buttonClass = `inline-flex min-h-11 items-center justify-center border border-ink/30 px-8 text-xs uppercase tracking-luxury transition-colors hover:bg-ink hover:text-surface active:bg-ink/90 active:text-surface disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:text-ink ${focusRing}`;

type Status = "idle" | "loading" | "sent" | "error";

const initial = {
  ownerName: "",
  contactInfo: "",
  propertyTitle: "",
  location: "",
  propertyType: PROPERTY_TYPES[0] as string,
  estimatedPrice: "",
  description: "",
  accepted: false,
};

export function SellForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState(initial);

  const set =
    (key: keyof typeof initial) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.accepted) return;
    setStatus("loading");
    setError("");
    const message = [
      `Propiedad: ${form.propertyTitle}`,
      `Tipo: ${form.propertyType}`,
      `Ubicación: ${form.location}`,
      form.estimatedPrice && `Valor estimado (USD): ${form.estimatedPrice}`,
      form.description && `Comentarios: ${form.description}`,
    ]
      .filter(Boolean)
      .join("\n");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.ownerName,
          phone: form.contactInfo,
          intent: "Vender",
          zone: form.location,
          message,
          source: "seller-submission",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "No pudimos registrar su propiedad. Intente de nuevo.");
      }
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos registrar su propiedad.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col gap-4 border border-hairline bg-surface-raised/50 p-8 md:p-12">
        <h2 className="font-display text-2xl font-normal tracking-tight">
          Propiedad registrada
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-ink-muted">
          Recibimos los datos de su inmueble. Un especialista en tasaciones y
          ventas de Transaction se comunicará con usted a la brevedad.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(initial);
            setStatus("idle");
          }}
          className={`${buttonClass} self-start`}
        >
          Enviar otra propiedad
        </button>
      </div>
    );
  }

  const loading = status === "loading";

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 border border-hairline bg-surface-raised/50 p-8 backdrop-blur-sm md:p-12"
    >
      <div>
        <h2 className="font-display text-2xl font-normal tracking-tight">
          Publique su propiedad
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          Complete los datos básicos y un asesor senior se pondrá en contacto.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Nombre completo</span>
          <input type="text" name="nombre" autoComplete="name" required disabled={loading} value={form.ownerName} onChange={set("ownerName")} placeholder="Ej. Carlos Silva" className={fieldClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Teléfono / WhatsApp o correo</span>
          <input type="text" name="contacto" autoComplete="tel" required disabled={loading} value={form.contactInfo} onChange={set("contactInfo")} placeholder="+598 99 123 456" className={fieldClass} />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Título de la propiedad</span>
          <input type="text" name="titulo" required disabled={loading} value={form.propertyTitle} onChange={set("propertyTitle")} placeholder="Ej. Residencia minimalista en Brava" className={fieldClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Ubicación / zona</span>
          <input type="text" name="ubicacion" required disabled={loading} value={form.location} onChange={set("location")} placeholder="Ej. José Ignacio" className={fieldClass} />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Tipo de inmueble</span>
          <select name="tipo" disabled={loading} value={form.propertyType} onChange={set("propertyType")} className={fieldClass}>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Valor estimado (USD)</span>
          <input type="text" name="valor" inputMode="numeric" disabled={loading} value={form.estimatedPrice} onChange={set("estimatedPrice")} placeholder="Ej. 1.200.000" className={fieldClass} />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>Descripción o comentarios</span>
        <textarea name="descripcion" rows={4} disabled={loading} value={form.description} onChange={set("description")} placeholder="Metrajes aproximados, dormitorios, comodidades destacadas…" className={`${fieldClass} resize-none`} />
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
          Autorizo a Transaction a utilizar mis datos para evaluar la propiedad y
          coordinar el contacto, de acuerdo con la{" "}
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

      <button type="submit" disabled={loading || !form.accepted} className={`${buttonClass} mt-2`}>
        {loading ? "Enviando…" : "Enviar solicitud de venta"}
      </button>
    </form>
  );
}
