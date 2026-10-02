'use client';

import Link from "next/link";
import { useParams } from "next/navigation";
import { properties } from "@/lib/properties";
import { PropertyCard } from "@/components/PropertyCard";
import { dictionary, type Locale } from "@/lib/translations";

export function FeaturedProperties() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'es';
  const t = dictionary[locale];

  // Group properties into rows: [2, 3] - exactly 5 properties
  const rows = [];
  let idx = 0;
  const rowSizes = [2, 3];

  for (let i = 0; i < rowSizes.length && idx < properties.length; i++) {
    const size = rowSizes[i];
    rows.push(properties.slice(idx, idx + size));
    idx += size;
  }

  return (
    <section className="container-page py-24 sm:py-32">
      <header className="mb-14">
        <p className="text-xs uppercase tracking-luxury text-ink-muted">Selección</p>
        <h2 className="mt-3 font-display text-3xl font-normal tracking-tight sm:text-4xl">
          {t.featuredProperties.title}
        </h2>
      </header>

      {/* Grid: 5 properties (2 + 3) */}
      <div className="space-y-14">
        {rows.map((row, rowIdx) => {
          const isTwoUp = rowIdx % 2 === 0;
          return (
            <div
              key={rowIdx}
              className={`grid gap-x-6 gap-y-14 ${isTwoUp ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}
            >
              {row.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          );
        })}
      </div>

      {/* Link to full inventory */}
      <div className="mt-16 flex justify-center">
        <Link
          href={`/${locale}/propiedades`}
          className="px-8 py-3 rounded-lg bg-primary text-ink font-semibold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          {t.featuredProperties.viewAll}
        </Link>
      </div>
    </section>
  );
}
