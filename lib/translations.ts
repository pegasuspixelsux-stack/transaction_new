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
    advisory: {
      label: "Vender o Alquilar",
      title: "Publica tu propiedad con nosotros",
      subtitle: "Tanto para venta como para alquiler, ofrecemos asesoramiento integral, servicio prémium y publicación directa en nuestra plataforma.",
      points: [
        "Asesoramiento experto en fijación de precios y valoración de mercado",
        "Estrategia de posicionamiento y marketing digital de alto impacto",
        "Recomendaciones de reacondicionamiento y puesta en valor",
        "Gestión transparente y acompañamiento en todo el proceso de cierre",
      ],
      form: {
        name: "Nombre y Apellido",
        phone: "Teléfono / WhatsApp",
        operationType: "Tipo de operación",
        description: "Descripción de la propiedad o ubicación",
        sell: "Venta",
        rent: "Alquiler",
        submit: "Solicitar Asesoramiento",
        sending: "Enviando...",
      },
    },
    stripe: {
      address: "Av. Gorlero, Punta del Este, Maldonado",
      hours: "Lun - Sáb: 9:00 - 19:00",
      buy: "Comprar",
      sell: "Vender",
      rent: "Alquilar",
    },
    tabs: {
      title: "Contacto y Asesoramiento",
      generalContact: "Contacto General",
      publishProperty: "Publica tu Propiedad",
    },
    contactForm: {
      name: "Nombre y Apellido",
      email: "Correo Electrónico",
      phone: "Teléfono",
      message: "Mensaje",
      submit: "Enviar Consulta",
      sending: "Enviando...",
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
    advisory: {
      label: "Sell or Rent",
      title: "Publish Your Property With Us",
      subtitle: "For both sale and rental, we offer comprehensive advisory, premium service, and direct publication on our platform to maximize your property's value.",
      points: [
        "Expert guidance on pricing and market valuation",
        "High-impact positioning and digital marketing strategy",
        "Property staging and value enhancement recommendations",
        "Transparent management and support throughout the closing process",
      ],
      form: {
        name: "Full Name",
        phone: "Phone / WhatsApp",
        operationType: "Type of Operation",
        description: "Property Description or Location",
        sell: "Sale",
        rent: "Rental",
        submit: "Request Advisory",
        sending: "Sending...",
      },
    },
    stripe: {
      address: "Av. Gorlero, Punta del Este, Maldonado",
      hours: "Mon - Sat: 9:00 - 19:00",
      buy: "Buy",
      sell: "Sell",
      rent: "Rent",
    },
    tabs: {
      title: "Contact & Advisory",
      generalContact: "General Contact",
      publishProperty: "Publish Your Property",
    },
    contactForm: {
      name: "Full Name",
      email: "Email Address",
      phone: "Phone",
      message: "Message",
      submit: "Send Inquiry",
      sending: "Sending...",
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
    advisory: {
      label: "Vender ou Alugar",
      title: "Publique sua propriedade conosco",
      subtitle: "Tanto para venda quanto aluguel, oferecemos consultoria abrangente, serviço premium e publicação direta em nossa plataforma.",
      points: [
        "Orientação especializada em precificação e avaliação de mercado",
        "Estratégia de posicionamento e marketing digital de alto impacto",
        "Recomendações de staging e valorização da propriedade",
        "Gestão transparente e suporte em todo o processo de fechamento",
      ],
      form: {
        name: "Nome Completo",
        phone: "Telefone / WhatsApp",
        operationType: "Tipo de Operação",
        description: "Descrição da Propriedade ou Localização",
        sell: "Venda",
        rent: "Aluguel",
        submit: "Solicitar Consultoria",
        sending: "Enviando...",
      },
    },
    stripe: {
      address: "Av. Gorlero, Punta del Este, Maldonado",
      hours: "Seg - Sáb: 9:00 - 19:00",
      buy: "Comprar",
      sell: "Vender",
      rent: "Alugar",
    },
    tabs: {
      title: "Contato e Assessoria",
      generalContact: "Contato Geral",
      publishProperty: "Publique sua Propriedade",
    },
    contactForm: {
      name: "Nome Completo",
      email: "Endereço de Email",
      phone: "Telefone",
      message: "Mensagem",
      submit: "Enviar Consulta",
      sending: "Enviando...",
    },
  },
} as const;

export type Locale = keyof typeof dictionary;

export function getDictionary(locale: string): (typeof dictionary)[Locale] {
  return dictionary[locale as Locale] ?? dictionary.es;
}
