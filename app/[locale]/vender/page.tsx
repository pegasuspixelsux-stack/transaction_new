import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import { SellForm } from "@/components/SellForm";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Venda su propiedad · Transaction",
  description:
    "Consigne su propiedad con Transaction: exposición cuidada y discreción absoluta en Punta del Este.",
};

const BENEFITS = [
  {
    icon: Sparkles,
    title: "Exposición global y local",
    description:
      "Estrategias de marketing a medida con fotografía profesional, presentaciones digitales y difusión dirigida.",
  },
  {
    icon: ShieldCheck,
    title: "Discreción absoluta",
    description:
      "Manejo confidencial de las operaciones y filtrado riguroso de interesados antes de cada visita.",
  },
];

export default function VenderPage() {
  return (
    <>
      <main className="container-page pb-24 pt-28 sm:pt-32">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex min-h-11 items-center gap-2 text-xs uppercase tracking-luxury text-ink-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            <ArrowLeft
              className="size-4 transition-transform duration-200 ease-out group-hover:-translate-x-1"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            Volver al sitio
          </Link>
          <span className="border border-hairline px-3 py-1 text-xs uppercase tracking-luxury text-ink-muted">
            Consignaciones exclusivas
          </span>
        </div>

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-luxury text-ink-muted">
              Transaction Advisory
            </p>
            <h1 className="mt-3 font-display text-3xl font-normal tracking-tight sm:text-4xl">
              Confíe la venta de su propiedad a los más altos estándares.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-muted">
              Conectamos propiedades excepcionales de Punta del Este y la costa
              con una red internacional de inversores calificados y compradores
              privados.
            </p>

            <ul className="mt-10 space-y-6 border-t border-hairline pt-8">
              {BENEFITS.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex items-start gap-4">
                  <Icon className="mt-1 size-5 shrink-0" strokeWidth={1.25} aria-hidden="true" />
                  <div>
                    <h2 className="font-display text-lg font-normal tracking-tight">{title}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <SellForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
