'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Locale } from '@/lib/translations';
import { dashboardConfig } from '@/config/dashboardConfig';
import { TransactionMark } from '@/components/TransactionMark';
import { MapPin, Clock, Phone, Globe, Menu } from 'lucide-react';

interface PublicTopNavProps {
  locale: Locale;
  dict: {
    inicio: string;
    propiedades: string;
    vender: string;
    contacto: string;
    panel: string;
  };
  stripe: {
    address: string;
    hours: string;
    buy: string;
    sell: string;
    rent: string;
  };
}

export default function PublicTopNav({ locale, dict, stripe }: PublicTopNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { contact } = dashboardConfig;

  const handleLanguageChange = (newLocale: string) => {
    const segments = pathname.split('/').filter(Boolean);
    if (['es', 'en', 'pt'].includes(segments[0])) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    router.push(`/${segments.join('/')}`);
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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/5 border-b border-white/10">

      {/* =========================================================
          1. MOBILE LAYOUT (< md breakpoint: phones only)
          Logo/Title left, Burger menu right
          Icon stripe below (transparent, no boxes)
          ========================================================= */}
      <div className="flex md:hidden flex-col">
        {/* TOP ROW: Logo/Title left, Language selector and Burger menu right */}
        <div className="flex items-center justify-between px-4 py-2 text-black backdrop-blur-md bg-black/5 border-b border-white/10">
          {/* LEFT: Brand Logo & Title */}
          <a href={`/${locale}`} className="flex items-center gap-1.5">
            <TransactionMark className="size-6" />
            <span className="font-serif tracking-widest text-lg uppercase font-bold">Transaction</span>
          </a>

          {/* RIGHT: Language selector and Burger Menu */}
          <div className="flex items-center gap-1">
            {/* Language Selector */}
            <select
              value={locale}
              onChange={(e) => handleLanguageChange(e.target.value)}
              aria-label="Select language"
              className="bg-white/10 text-xs text-black outline-none cursor-pointer px-2 py-1 rounded border border-white/20 hover:bg-white/15 transition-colors"
            >
              <option value="es" className="bg-neutral-950 text-white">ES</option>
              <option value="en" className="bg-neutral-950 text-white">EN</option>
              <option value="pt" className="bg-neutral-950 text-white">PT</option>
            </select>

            {/* Burger Menu */}
            <button
              aria-label="Abrir menú"
              className="p-1.5 text-black hover:text-primary transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* ICON STRIPE: Transparent, no boxes */}
        <div className="flex items-center justify-between px-4 py-2 text-black bg-black/5">
          {/* LEFT: Icon Buttons (Map & Clock only) */}
          <div className="flex items-center gap-3">
            {/* Map Button */}
            <button
              onClick={openMap}
              aria-label="Ver ubicación"
              className="text-black/70 hover:text-primary transition-colors"
              title="Ver ubicación"
            >
              <MapPin className="w-4 h-4" />
            </button>

            {/* Clock Button */}
            <button
              onClick={scrollToHours}
              aria-label="Ver horarios"
              className="text-black/70 hover:text-primary transition-colors"
              title="Ver horarios"
            >
              <Clock className="w-4 h-4" />
            </button>
          </div>

          {/* CENTER: Buy, Sell, Rent Links */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-medium">
            <a href={`/${locale}/comprar`} className="text-black/70 hover:text-primary transition-colors">
              {stripe.buy}
            </a>
            <span className="text-black/70">/</span>
            <a href={`/?tab=listing#contacto`} className="text-black/70 hover:text-primary transition-colors">
              {stripe.sell}
            </a>
            <span className="text-black/70">/</span>
            <a href={`/${locale}/alquilar`} className="text-black/70 hover:text-primary transition-colors">
              {stripe.rent}
            </a>
          </div>

          {/* RIGHT: Phone Number */}
          <a
            href={contact.phoneHref}
            className="flex items-center gap-2 text-black hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="text-xs font-medium">{contact.phone}</span>
          </a>
        </div>
      </div>

      {/* =========================================================
          2. TABLET & DESKTOP LAYOUT (>= md breakpoint)
          Main Nav first, followed seamlessly by the info/action bar below
          ========================================================= */}
      <div className="hidden md:flex flex-col">

        {/* Stripe (Info Bar on TOP) */}
        <div className="flex items-center justify-between px-6 py-2 text-xs text-black/70">
          {/* Address with Map Link */}
          <button onClick={openMap} className="flex items-center gap-2 hover:text-primary transition-colors text-left">
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{stripe.address}</span>
          </button>

          {/* CENTER: Buy/Sell/Rent Links */}
          <div className="flex items-center gap-2 font-medium">
            <a href={`/${locale}/comprar`} className="text-black/70 hover:text-black transition-colors">{stripe.buy}</a>
            <span className="text-black/40">/</span>
            <a href={`/${locale}/vender`} className="text-black/70 hover:text-black transition-colors">{stripe.sell}</a>
            <span className="text-black/40">/</span>
            <a href={`/${locale}/alquilar`} className="text-black/70 hover:text-black transition-colors">{stripe.rent}</a>
          </div>

          {/* Hours - Right aligned */}
          <button onClick={scrollToHours} className="flex items-center gap-2 hover:text-primary transition-colors">
            <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{stripe.hours}</span>
          </button>
        </div>

        {/* Main Navigation Row (BELOW the stripe) */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/20">
          {/* Brand Logo with Icon */}
          <a href={`/${locale}`} className="flex items-center gap-2.5 font-serif tracking-widest text-lg uppercase font-bold text-black hover:opacity-80 transition-opacity">
            <TransactionMark className="size-6" />
            Transaction
          </a>

          {/* CENTER: Main Pages */}
          <nav className="flex items-center gap-8 text-xs uppercase tracking-wider text-black/70">
            <a href={`/${locale}`} className="hover:text-black transition-colors">{dict.inicio}</a>
            <a href={`/${locale}/propiedades`} className="hover:text-black transition-colors">{dict.propiedades}</a>
            <a href={`/${locale}/#contacto`} className="hover:text-black transition-colors">{dict.contacto}</a>
          </nav>

          {/* Language Switcher & Phone */}
          <div className="flex items-center gap-4">
            <div className="relative flex items-center gap-1 bg-white/10 border border-white/20 rounded-lg px-2.5 py-1.5 hover:bg-white/15 transition-colors">
              <Globe className="w-3.5 h-3.5 text-primary shrink-0" />
              <select
                value={locale}
                onChange={(e) => handleLanguageChange(e.target.value)}
                aria-label="Select language"
                className="bg-transparent text-xs text-black uppercase tracking-wider outline-none cursor-pointer appearance-none pr-1"
              >
                <option value="es" className="bg-neutral-950 text-white py-1">ES</option>
                <option value="en" className="bg-neutral-950 text-white py-1">EN</option>
                <option value="pt" className="bg-neutral-950 text-white py-1">PT</option>
              </select>
            </div>

            <a href={contact.phoneHref} className="flex items-center gap-2 text-black hover:text-primary transition-colors text-xs font-medium">
              <Phone className="w-3.5 h-3.5 text-primary" />
              <span>{contact.phone}</span>
            </a>
          </div>
        </div>

      </div>

    </header>
  );
}
