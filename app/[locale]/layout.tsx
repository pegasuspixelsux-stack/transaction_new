import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dictionary, type Locale } from "@/lib/translations";
import { PublicTopNav } from "@/components/PublicTopNav";

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
    <html lang={locale}>
      <body className="min-h-full flex flex-col">
        <PublicTopNav locale={locale} nav={t.nav} />
        {children}
      </body>
    </html>
  );
}
