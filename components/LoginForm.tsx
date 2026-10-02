"use client";

import Link from "next/link";
import { Lock, Mail } from "lucide-react";

const focusRing =
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink";

const inputClass =
  "w-full border border-hairline bg-surface py-3 pl-10 pr-4 text-sm font-light text-ink placeholder:text-ink-muted/60 transition-colors focus-visible:border-ink focus-visible:outline-none";

export function LoginForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-xs uppercase tracking-luxury text-ink-muted"
        >
          Correo electrónico
        </label>
        <div className="relative">
          <Mail
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-muted"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="nombre@ejemplo.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-xs uppercase tracking-luxury text-ink-muted"
          >
            Contraseña
          </label>
          <Link
            href="/recuperar"
            className={`inline-block py-2 text-xs text-ink-muted transition-colors hover:text-ink ${focusRing}`}
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <div className="relative">
          <Lock
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-muted"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••••••"
            className={inputClass}
          />
        </div>
      </div>

      <button
        type="submit"
        className={`mt-2 min-h-11 w-full bg-ink px-4 py-3 text-xs uppercase tracking-luxury text-surface transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-50 ${focusRing}`}
      >
        Iniciar sesión
      </button>
    </form>
  );
}
