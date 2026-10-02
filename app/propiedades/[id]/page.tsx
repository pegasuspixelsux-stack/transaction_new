import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BedDouble, MapPin } from "lucide-react";
import { formatPrice, properties, propertyTypeLabel } from "@/lib/properties";
import { InquiryModal } from "@/components/InquiryModal";
import { SiteFooter } from "@/components/SiteFooter";

type Params = Promise<{ id: string }>;

const find = (id: string) => properties.find((p) => p.id === id);

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const property = find((await params).id);
  if (!property) return {};
  return {
    title: `${property.title} · Transaction`,
    description: `${propertyTypeLabel(property.type)} en ${property.zone}, Punta del Este.`,
  };
}

export default async function PropertyDetailPage({ params }: { params: Params }) {
  const property = find((await params).id);
  if (!property) notFound();

  const { id, title, zone, price, bedrooms, type, imageUrl } = property;

  return (
    <>
      <main className="container-page pb-24 pt-28 sm:pt-32">
        <div className="flex items-center justify-between">
          <Link
            href="/propiedades"
            className="group inline-flex min-h-11 items-center gap-2 text-xs uppercase tracking-luxury text-ink-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            <ArrowLeft
              className="size-4 transition-transform duration-200 ease-out group-hover:-translate-x-1"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            Volver a propiedades
          </Link>
          <span className="text-xs uppercase tracking-luxury text-ink-muted">Ref. {id}</span>
        </div>

        <header className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-luxury text-ink-muted">
              <MapPin className="size-4" strokeWidth={1.5} aria-hidden="true" />
              {zone}
            </p>
            <h1 className="mt-3 font-display text-3xl font-normal tracking-tight sm:text-5xl">
              {title}
            </h1>
          </div>
          <div className="md:text-right">
            <p className="font-display text-3xl font-normal tracking-tight">
              {formatPrice(price)}
            </p>
            <p className="mt-1 text-xs uppercase tracking-luxury text-ink-muted">
              Precio de lista
            </p>
          </div>
        </header>

        <div className="relative mt-10 aspect-[16/10] overflow-hidden border border-hairline bg-mist/20">
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
          <dl className="grid grid-cols-2 gap-px border border-hairline bg-hairline sm:max-w-md">
            <div className="bg-surface p-6">
              <dt className="text-xs uppercase tracking-luxury text-ink-muted">Tipo</dt>
              <dd className="mt-2 font-display text-lg tracking-tight">
                {propertyTypeLabel(type)}
              </dd>
            </div>
            <div className="bg-surface p-6">
              <dt className="text-xs uppercase tracking-luxury text-ink-muted">Dormitorios</dt>
              <dd className="mt-2 flex items-center gap-2 font-display text-lg tracking-tight">
                {bedrooms > 0 ? (
                  <>
                    <BedDouble className="size-5" strokeWidth={1.25} aria-hidden="true" />
                    {bedrooms}
                  </>
                ) : (
                  "—"
                )}
              </dd>
            </div>
          </dl>

          <aside className="h-fit self-start border border-hairline bg-surface-raised/50 p-8 backdrop-blur-sm lg:sticky lg:top-28">
            <h2 className="font-display text-xl font-normal tracking-tight">
              Asesoría privada
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Reciba asesoramiento personalizado y coordine una visita privada a
              esta propiedad.
            </p>
            <div className="mt-6">
              <InquiryModal propertyTitle={title} />
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
