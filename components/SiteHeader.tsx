import Link from "next/link";
import { dashboardConfig } from "@/config/dashboardConfig";
import { Clock, MapPin, Phone, Menu } from "lucide-react";
import { TransactionMark } from "@/components/TransactionMark";

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Inicio", href: "/" },
  { label: "Propiedades", href: "/propiedades" },
  { label: "Zonas", href: "/#zonas" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
];

const focusRing =
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink";

const { contact } = dashboardConfig;

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-surface/75 backdrop-blur-md">
      <div className="bg-ink text-surface">
        <div className="container-page flex items-center justify-between gap-3 py-1 text-[11px] sm:py-1.5 sm:gap-4 sm:text-xs font-light tracking-wide">
          <p className="flex items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            <span className="sm:hidden">{contact.addressShort}</span>
            <span className="hidden sm:inline">{contact.address}</span>
          </p>
          <p className="flex items-center gap-1.5">
            <Clock className="size-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            <span className="sm:hidden">{contact.hoursShort}</span>
            <span className="hidden sm:inline">{contact.hours}</span>
          </p>
          <a
            href={contact.phoneHref}
            className="flex items-center gap-1.5 whitespace-nowrap transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-surface"
          >
            <Phone className="size-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            {contact.phone}
          </a>
        </div>
      </div>
      <nav className="container-page flex items-center justify-between py-3 sm:py-5">
        <Link
          href="/"
          aria-label="Transaction — inicio"
          className={`flex items-center gap-2.5 ${focusRing}`}
        >
          <TransactionMark className="size-4 text-sky-600" />
          <span className="text-sm font-bold uppercase tracking-widest text-ink">
            Transaction
          </span>
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`text-xs uppercase tracking-luxury text-ink/85 transition-colors hover:text-ink ${focusRing}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label="Abrir menú"
          className={`-m-3 p-3 text-ink/85 transition-colors hover:text-ink md:hidden ${focusRing}`}
        >
          <Menu size={20} strokeWidth={1.5} />
        </button>
      </nav>
    </header>
  );
}
