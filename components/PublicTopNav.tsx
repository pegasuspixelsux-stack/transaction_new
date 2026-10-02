"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import type { Locale } from "@/lib/translations";
import { TransactionMark } from "@/components/TransactionMark";

interface PublicTopNavProps {
  locale: Locale;
  nav: {
    inicio: string;
    propiedades: string;
    vender: string;
    contacto: string;
    panel: string;
  };
}

export function PublicTopNav({ locale, nav }: PublicTopNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-surface/75 backdrop-blur-md">
      <div className="bg-ink text-surface">
        <div className="container-page flex items-center justify-between gap-3 py-1 text-[11px] font-light tracking-wide sm:gap-4 sm:py-1.5 sm:text-xs">
          <p className="flex items-center gap-1.5">
            <span className="sm:hidden">José Ignacio</span>
            <span className="hidden sm:inline">Ruta 10, km 161 · José Ignacio</span>
          </p>
          <p className="flex items-center gap-1.5">
            <span className="sm:hidden">9–19 h</span>
            <span className="hidden sm:inline">Lun–Sáb · 9 a 19 h</span>
          </p>
          <a href="tel:+59842771234" className="flex items-center gap-1.5 whitespace-nowrap transition-opacity hover:opacity-80">
            +598 42 77 1234
          </a>
        </div>
      </div>

      <nav className="container-page flex items-center justify-between py-3 sm:py-5">
        <Link href={`/${locale}`} className="flex items-center gap-2.5">
          <TransactionMark className="size-4 text-sky-600" />
          <span className="text-sm font-bold uppercase tracking-widest text-ink">Transaction</span>
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          <li>
            <Link
              href={`/${locale}`}
              className="text-xs uppercase tracking-luxury text-ink/85 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              {nav.inicio}
            </Link>
          </li>
          <li>
            <Link
              href={`/${locale}/propiedades`}
              className="text-xs uppercase tracking-luxury text-ink/85 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              {nav.propiedades}
            </Link>
          </li>
          <li>
            <Link
              href={`/${locale}/vender`}
              className="text-xs uppercase tracking-luxury text-ink/85 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              {nav.vender}
            </Link>
          </li>
          <li>
            <Link
              href={`/${locale}/#contacto`}
              className="text-xs uppercase tracking-luxury text-ink/85 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              {nav.contacto}
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3 md:gap-4">
          <select
            value={locale}
            onChange={(e) => handleLanguageChange(e.target.value)}
            aria-label="Select language"
            className="border border-hairline bg-surface px-2 py-1 text-xs uppercase tracking-luxury text-ink outline-none focus-visible:border-ink"
          >
            <option value="es">ES</option>
            <option value="en">EN</option>
            <option value="pt">PT</option>
          </select>

          <Link
            href="/dashboard"
            className="inline-flex min-h-11 items-center justify-center border border-ink/30 px-4 text-xs uppercase tracking-luxury transition-colors hover:bg-ink hover:text-surface"
          >
            {nav.panel}
          </Link>
        </div>
      </nav>
    </header>
  );
}
