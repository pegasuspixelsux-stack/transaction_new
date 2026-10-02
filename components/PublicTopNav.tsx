'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Locale } from '@/lib/translations';
import { MapPin, Clock, Phone, Globe } from 'lucide-react';

interface PublicTopNavProps {
  locale: Locale;
  dict: {
    inicio: string;
    propiedades: string;
    vender: string;
    contacto: string;
    panel: string;
  };
}

export default function PublicTopNav({ locale, dict }: PublicTopNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  const scrollToHours = (e: React.MouseEvent) => {
    e.preventDefault();
    const hoursSection = document.getElementById('horarios-section') || document.getElementById('hours');
    if (hoursSection) {
      hoursSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openMap = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('https://maps.google.com/?q=Punta+del+Este+Maldonado+Uruguay', '_blank');
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/85 border-b border-white/10">

      {/* =========================================================
          1. MOBILE LAYOUT (< md breakpoint: phones only)
          Simple icons left, Comprar/Vender/Alquilar center, Phone right
          ========================================================= */}
      <div className="flex md:hidden items-center justify-between px-3 py-2.5 text-white">

        {/* LEFT: Map Pointer & Clock Icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={openMap}
            aria-label="Ver ubicación"
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-primary hover:bg-white/10 transition-colors"
          >
            <MapPin className="w-4 h-4" />
          </button>

          <button
            onClick={scrollToHours}
            aria-label="Ver horarios"
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Clock className="w-4 h-4" />
          </button>
        </div>

        {/* CENTER: Comprar / Vender / Alquilar */}
        <nav className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider">
          <a href={`/${locale}/comprar`} className="text-neutral-200 hover:text-primary transition-colors">
            Comprar
          </a>
          <span className="text-neutral-600">/</span>
          <a href={`/${locale}/vender`} className="text-neutral-200 hover:text-primary transition-colors">
            Vender
          </a>
          <span className="text-neutral-600">/</span>
          <a href={`/${locale}/alquilar`} className="text-neutral-200 hover:text-primary transition-colors">
            Alquilar
          </a>
        </nav>

        {/* RIGHT: Direct Phone Link */}
        <a
          href="tel:+59899000000"
          aria-label="Llamar"
          className="p-1.5 rounded-lg bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 transition-colors"
        >
          <Phone className="w-4 h-4" />
        </a>
      </div>

      {/* =========================================================
          2. TABLET & DESKTOP LAYOUT (>= md breakpoint)
          Main Nav first, followed seamlessly by the info/action bar below
          ========================================================= */}
      <div className="hidden md:flex flex-col">

        {/* Main Navigation Row */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/5">
          {/* Brand Logo */}
          <a href={`/${locale}`} className="font-serif tracking-widest text-sm uppercase text-white hover:opacity-80 transition-opacity">
            Transaction
          </a>

          {/* CENTER: Main Pages */}
          <nav className="flex items-center gap-8 text-xs uppercase tracking-wider text-neutral-300">
            <a href={`/${locale}`} className="hover:text-white transition-colors">{dict.inicio}</a>
            <a href={`/${locale}/propiedades`} className="hover:text-white transition-colors">{dict.propiedades}</a>
            <a href={`/${locale}/#contacto`} className="hover:text-white transition-colors">{dict.contacto}</a>
          </nav>

          {/* Actions: Language Switcher & Dashboard Link */}
          <div className="flex items-center gap-4">
            <div className="relative flex items-center gap-1 bg-white/5 border border-white/15 rounded-lg px-2 py-1">
              <Globe className="w-3.5 h-3.5 text-neutral-400" />
              <select
                value={locale}
                onChange={(e) => handleLanguageChange(e.target.value)}
                aria-label="Select language"
                className="bg-transparent text-xs text-white uppercase tracking-wider outline-none cursor-pointer"
              >
                <option value="es" className="bg-neutral-900 text-white">ES</option>
                <option value="en" className="bg-neutral-900 text-white">EN</option>
                <option value="pt" className="bg-neutral-900 text-white">PT</option>
              </select>
            </div>

            <a
              href="/dashboard"
              className="px-3.5 py-1.5 rounded-lg bg-primary text-black text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity shadow-sm shadow-primary/20"
            >
              {dict.panel}
            </a>
          </div>
        </div>

        {/* Secondary Info Bar (Placed BELOW the main nav, matching the same transparent color theme) */}
        <div className="flex items-center justify-between px-6 py-2 text-xs text-neutral-300">
          <div className="flex items-center gap-6">
            {/* Address with Map Link */}
            <button onClick={openMap} className="flex items-center gap-2 hover:text-primary transition-colors text-left">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Av. Gorlero, Punta del Este, Maldonado</span>
            </button>

            {/* Hours with Scroll Link */}
            <button onClick={scrollToHours} className="flex items-center gap-2 hover:text-primary transition-colors">
              <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Lun - Sáb: 9:00 - 19:00</span>
            </button>
          </div>

          {/* CENTER: Comprar, Vender, Alquilar */}
          <div className="flex items-center gap-4 uppercase tracking-wider text-xs font-medium">
            <a href={`/${locale}/comprar`} className="text-white hover:text-primary transition-colors">Comprar</a>
            <span className="text-neutral-600">/</span>
            <a href={`/${locale}/vender`} className="text-white hover:text-primary transition-colors">Vender</a>
            <span className="text-neutral-600">/</span>
            <a href={`/${locale}/alquilar`} className="text-white hover:text-primary transition-colors">Alquilar</a>
          </div>

          {/* Phone Number */}
          <div className="flex items-center gap-4">
            <a href="tel:+59899000000" className="flex items-center gap-2 text-white hover:text-primary transition-colors">
              <Phone className="w-3.5 h-3.5 text-primary" />
              <span className="font-medium">+598 99 000 000</span>
            </a>
          </div>
        </div>

      </div>

    </header>
  );
}
