import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/LoginForm";
import { Trident } from "@/components/Trident";

export const metadata: Metadata = {
  title: "Ingreso al panel · Oceanus",
  robots: { index: false },
};

const focusRing =
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink";

export default function LoginPage() {
  return (
    <main className="fixed inset-0 z-[60] flex bg-surface text-ink">
      <div className="relative hidden h-full lg:block lg:w-7/12">
        <Image
          src="/images/hero/serena.png"
          alt=""
          fill
          priority
          sizes="60vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute bottom-16 left-16 z-10 max-w-lg text-white">
          <p className="mb-3 text-xs uppercase tracking-luxury text-white/80">
            Portafolio Oceanus
          </p>
          <h1 className="font-display text-3xl font-normal leading-snug tracking-tight">
            Residencias frente al mar y oportunidades de inversión, a su medida.
          </h1>
          <p className="mt-4 text-sm font-light text-white/75">
            Ingrese a su panel privado para gestionar propiedades y consultas de
            clientes.
          </p>
        </div>
      </div>

      <div className="flex h-full w-full flex-col justify-between overflow-y-auto border-l border-hairline bg-surface p-8 sm:p-12 lg:w-5/12 lg:p-16">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className={`group inline-flex min-h-11 items-center gap-2 text-xs uppercase tracking-luxury text-ink-muted transition-colors hover:text-ink ${focusRing}`}
          >
            <ArrowLeft
              className="size-4 transition-transform duration-200 ease-out group-hover:-translate-x-1"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            Volver al sitio
          </Link>
          <span className="border border-hairline px-3 py-1 text-xs uppercase tracking-luxury text-ink-muted">
            Acceso seguro
          </span>
        </div>

        <div className="mx-auto w-full max-w-md py-8">
          <div className="mb-10 text-center">
            <Trident className="mx-auto size-8 text-sky-600" />
            <h2 className="mt-4 text-xl uppercase tracking-wordmark text-ink">
              Oceanus
            </h2>
            <p className="mt-2 text-xs uppercase tracking-luxury text-ink-muted">
              Portal de clientes y asesores
            </p>
          </div>
          <LoginForm />
        </div>

        <p className="text-center text-xs text-ink-muted">
          © 2026 Oceanus. Todos los derechos reservados.
        </p>
      </div>
    </main>
  );
}
