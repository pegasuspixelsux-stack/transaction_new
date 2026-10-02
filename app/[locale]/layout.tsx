import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Playfair_Display, Montserrat } from "next/font/google";
import { dictionary, type Locale } from "@/lib/translations";
import { PublicTopNav } from "@/components/PublicTopNav";
import "@/app/globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

type Params = Promise<{ locale: string }>;

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }, { locale: "pt" }];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  if (!(locale in dictionary)) return {};
  return {
    title: "Transaction",
    description: "Real estate in Punta del Este",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const locale = (await params).locale as Locale;
  if (!(locale in dictionary)) notFound();

  const t = dictionary[locale];

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PublicTopNav locale={locale} nav={t.nav} />
        {children}
      </body>
    </html>
  );
}
