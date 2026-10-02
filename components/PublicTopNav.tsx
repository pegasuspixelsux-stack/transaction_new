'use client';

import { useState, useEffect } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { contact } = dashboardConfig;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors ${isScrolled ? 'backdrop-blur-md bg-black/20 border-b border-white/10' : 'bg-transparent border-b border-transparent'}`}>

      {/* =========================================================
          1. MOBILE LAYOUT (< md breakpoint: phones only)
          Logo/Title left, Burger menu right
          Icon stripe below (transparent, no boxes)
          ========================================================= */}
      <div className="flex md:hidden flex-col">
        {/* TOP ROW: Logo/Title left, Language selector and Burger menu right */}
        <div className={`flex items-center justify-between px-4 py-2 transition-colors text-white ${isScrolled ? 'backdrop-blur-md bg-black/20 border-b border-white/10' : 'bg-transparent border-b border-black'}`}>
          {/* LEFT: Brand Logo & Title */}
          <a href={`/${locale}`} className={`flex flex-shrink-0 items-center gap-2.5 whitespace-nowrap text-white`}>
            <TransactionMark className={`size-7 shrink-0 text-white`} />
            <span className="font-serif tracking-[0.15em] text-lg uppercase font-bold">Transaction</span>
          </a>

          {/* RIGHT: Language selector and Burger Menu */}
          <div className="flex items-center gap-1">
            {/* Language Selector */}
            <select
              value={locale}
              onChange={(e) => handleLanguageChange(e.target.value)}
              aria-label="Select language"
              className={`text-xs outline-none cursor-pointer px-2 py-1 rounded border transition-colors ${isScrolled ? 'bg-white/20 text-white border-white/30 hover:bg-white/25' : 'bg-white/10 text-black border-white/20 hover:bg-white/15'}`}
            >
              <option value="es" className="bg-neutral-950 text-white">ES</option>
              <option value="en" className="bg-neutral-950 text-white">EN</option>
              <option value="pt" className="bg-neutral-950 text-white">PT</option>
            </select>

            {/* Burger Menu */}
            <button
              aria-label="Abrir menú"
              className={`p-1.5 transition-colors ${isScrolled ? 'text-white hover:text-white/80' : 'text-black hover:text-primary'}`}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* ICON STRIPE: Transparent, no boxes */}
        <div className={`flex items-center justify-between px-4 py-2 transition-colors text-white ${isScrolled ? 'bg-black/20' : 'bg-transparent border-b border-black'}`}>
          {/* LEFT: Map Icon */}
          <button
            onClick={openMap}
            aria-label="Ver ubicación"
            className="text-black/70 hover:text-primary transition-colors"
            title="Ver ubicación"
          >
            <MapPin className="w-4 h-4" />
          </button>

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

          {/* RIGHT: Clock Icon */}
          <button
            onClick={scrollToHours}
            aria-label="Ver horarios"
            className="text-black/70 hover:text-primary transition-colors"
            title="Ver horarios"
          >
            <Clock className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* =========================================================
          2. TABLET & DESKTOP LAYOUT (>= md breakpoint)
          Main Nav first, followed seamlessly by the info/action bar below
          ========================================================= */}
      <div className="hidden md:flex flex-col">

        {/* Stripe (Info Bar on TOP) */}
        <div className={`flex items-center justify-between px-6 py-2 text-xs transition-colors ${isScrolled ? 'border-b border-black/10 bg-black/20 text-white' : 'border-b border-transparent bg-transparent text-black/70'}`}>
          {/* Address with Map Link */}
          <button onClick={openMap} className="flex items-center gap-2 hover:text-primary transition-colors text-left">
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{stripe.address}</span>
          </button>

          {/* CENTER: Buy/Sell/Rent Links */}
          <div className="flex items-center gap-2 font-medium">
            <a href={`/${locale}/comprar`} className={`transition-colors ${isScrolled ? 'text-white hover:text-white/80' : 'text-black/70 hover:text-black'}`}>{stripe.buy}</a>
            <span className={`transition-colors ${isScrolled ? 'text-white/40' : 'text-black/40'}`}>/</span>
            <a href={`/?tab=listing#contacto`} className={`transition-colors ${isScrolled ? 'text-white hover:text-white/80' : 'text-black/70 hover:text-black'}`}>{stripe.sell}</a>
            <span className={`transition-colors ${isScrolled ? 'text-white/40' : 'text-black/40'}`}>/</span>
            <a href={`/${locale}/alquilar`} className={`transition-colors ${isScrolled ? 'text-white hover:text-white/80' : 'text-black/70 hover:text-black'}`}>{stripe.rent}</a>
          </div>

          {/* Hours - Right aligned */}
          <button onClick={scrollToHours} className="flex items-center gap-2 hover:text-primary transition-colors">
            <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{stripe.hours}</span>
          </button>
        </div>

        {/* Main Navigation Row (BELOW the stripe) */}
        <div className={`flex items-center justify-between px-4 py-2 transition-colors ${isScrolled ? 'border-b border-white/20 bg-black/20' : 'border-b border-transparent bg-transparent'}`}>
          {/* Brand Logo with Icon */}
          <a href={`/${locale}`} className={`flex flex-shrink-0 items-center gap-2 whitespace-nowrap font-serif tracking-[0.1em] text-sm uppercase font-bold hover:opacity-80 transition-colors ${isScrolled ? 'text-white' : 'text-black'}`}>
            <TransactionMark className={`size-6 shrink-0 transition-colors ${isScrolled ? 'text-white' : 'text-black'}`} />
            Transaction
          </a>

          {/* CENTER: Main Pages */}
          <nav className={`flex items-center gap-8 text-xs uppercase tracking-wider transition-colors ${isScrolled ? 'text-white' : 'text-black/70'}`}>
            <a href={`/${locale}`} className={`transition-colors ${isScrolled ? 'hover:text-white/80' : 'hover:text-black'}`}>{dict.inicio}</a>
            <a href={`/${locale}/propiedades`} className={`transition-colors ${isScrolled ? 'hover:text-white/80' : 'hover:text-black'}`}>{dict.propiedades}</a>
            <a href={`/${locale}/#contacto`} className={`transition-colors ${isScrolled ? 'hover:text-white/80' : 'hover:text-black'}`}>{dict.contacto}</a>
          </nav>

          {/* Language Switcher & Phone */}
          <div className="flex items-center gap-4">
            <div className={`relative flex items-center gap-1 rounded-lg px-2.5 py-1.5 transition-colors ${isScrolled ? 'bg-white/20 border border-white/30 hover:bg-white/25' : 'bg-white/10 border border-white/20 hover:bg-white/15'}`}>
              <Globe className="w-3.5 h-3.5 text-primary shrink-0" />
              <select
                value={locale}
                onChange={(e) => handleLanguageChange(e.target.value)}
                aria-label="Select language"
                className={`bg-transparent text-xs uppercase tracking-wider outline-none cursor-pointer appearance-none pr-1 transition-colors ${isScrolled ? 'text-white' : 'text-black'}`}
              >
                <option value="es" className="bg-neutral-950 text-white py-1">ES</option>
                <option value="en" className="bg-neutral-950 text-white py-1">EN</option>
                <option value="pt" className="bg-neutral-950 text-white py-1">PT</option>
              </select>
            </div>

            <a href={contact.phoneHref} className={`flex items-center gap-2 transition-colors text-xs font-medium ${isScrolled ? 'text-white hover:text-white/80' : 'text-black hover:text-primary'}`}>
              <Phone className="w-3.5 h-3.5 text-primary" />
              <span>{contact.phone}</span>
            </a>
          </div>
        </div>

      </div>

    </header>
  );
}
