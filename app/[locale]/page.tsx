import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dictionary, type Locale } from "@/lib/translations";
import { OceanusHero } from "@/components/OceanusHero";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { Zones } from "@/components/Zones";
import { BrandStatement } from "@/components/BrandStatement";
import { Team } from "@/components/Team";
import { Contact } from "@/components/Contact";
import { SiteFooter } from "@/components/SiteFooter";
import { AGenteConcierge } from "@/components/AGenteConcierge";
import { PropertyAdvisorySection } from "@/components/PropertyAdvisorySection";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  if (!(locale in dictionary)) return {};
  return {
    title: "Transaction",
    description: "Real estate in Punta del Este",
  };
}

export default async function HomePage({ params }: { params: Params }) {
  const locale = (await params).locale as Locale;
  if (!(locale in dictionary)) notFound();

  return (
    <>
      <OceanusHero />
      <BrandStatement />
      <FeaturedProperties />
      <PropertyAdvisorySection locale={locale} dict={dictionary[locale].advisory} />
      <Zones />
      <Team />
      <Contact />
      <SiteFooter />
      <AGenteConcierge />
    </>
  );
}
