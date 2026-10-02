export const dictionary = {
  es: {
    nav: {
      inicio: "Inicio",
      propiedades: "Propiedades",
      vender: "Vender",
      contacto: "Contacto",
      panel: "Panel / Admin",
    },
    hero: {
      title: "Propiedades de autor frente al mar",
      subtitle: "Descubra nuestra exclusiva selección en Punta del Este.",
      cta: "Explorar Propiedades",
    },
  },
  en: {
    nav: {
      inicio: "Home",
      propiedades: "Properties",
      vender: "Sell",
      contacto: "Contact",
      panel: "Dashboard / Admin",
    },
    hero: {
      title: "Exceptional Coastal Real Estate",
      subtitle: "Discover our exclusive selection in Punta del Este.",
      cta: "Explore Properties",
    },
  },
  pt: {
    nav: {
      inicio: "Início",
      propiedades: "Propriedades",
      vender: "Vender",
      contacto: "Contato",
      panel: "Painel / Admin",
    },
    hero: {
      title: "Imóveis Excepcionais à Beira-Mar",
      subtitle: "Descubra nossa seleção exclusiva em Punta del Este.",
      cta: "Explorar Propriedades",
    },
  },
} as const;

export type Locale = keyof typeof dictionary;

export function getDictionary(locale: string): (typeof dictionary)[Locale] {
  return dictionary[locale as Locale] ?? dictionary.es;
}
