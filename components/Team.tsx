import { Handshake, MapPin, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";

const PILLARS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: MapPin,
    title: "Conocimiento local profundo",
    description:
      "Un conocimiento incomparable de los mejores barrios costeros, la normativa de uso del suelo y propiedades exclusivas fuera de mercado.",
  },
  {
    icon: ShieldCheck,
    title: "Discreción absoluta",
    description:
      "Asesoramiento confidencial y de trato personalizado, a medida de inversores y familias de alto patrimonio.",
  },
  {
    icon: Sparkles,
    title: "Portafolio exclusivo",
    description:
      "Residencias de lujo seleccionadas una a una, obras de arquitectura moderna frente al mar y oportunidades de inversión de primer nivel.",
  },
  {
    icon: Handshake,
    title: "Operaciones sin fricción",
    description:
      "Acompañamiento integral, desde el primer encuentro con la propiedad hasta la escritura y la gestión posterior de tu portafolio.",
  },
];

export function Team() {
  return (
    <section className="container-page py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs uppercase tracking-luxury text-ink-muted">Nosotros</p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight sm:text-4xl">
            Por qué elegirnos
          </h2>
          <div className="mt-6 max-w-md space-y-4 text-base leading-relaxed text-ink-muted">
            <p>
              Transaction nació de una idea simple: comprar o vender una casa en la
              costa debería sentirse como una conversación entre conocidos, no
              como una transacción. Somos un equipo reducido de asesores con
              raíces en Punta del Este.
            </p>
            <p>
              Conocemos cada calle, cada playa y cada casa que representamos.
              Muchas de nuestras propiedades nunca llegan a publicarse: circulan
              entre un grupo acotado de compradores que confían en nuestro
              criterio y en nuestra discreción.
            </p>
            <p>
              Trabajamos con un número limitado de clientes por temporada para
              acompañar cada operación de principio a fin — desde la primera
              visita hasta la escritura, y también en todo lo que viene después.
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PILLARS.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="border border-hairline bg-surface-raised/50 p-6 backdrop-blur-sm transition-colors duration-200 ease-out hover:bg-surface-raised"
            >
              <Icon className="size-6 text-ink" strokeWidth={1.25} aria-hidden="true" />
              <h3 className="mt-6 font-display text-lg font-normal tracking-tight">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
