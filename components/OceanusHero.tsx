import { HeroSlideshow } from "@/components/HeroSlideshow";
import { TransactionMark } from "@/components/TransactionMark";
import { properties } from "@/lib/properties";

const HERO_PROPERTIES = properties.slice(0, 4);

export function OceanusHero() {
  return (
    <section className="relative flex h-screen w-full flex-col overflow-hidden bg-black m-0 p-0 top-0">
      <HeroSlideshow properties={HERO_PROPERTIES} />

      {/* Dark gradient at top - horizontal (left to right) */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/30 to-transparent z-10"
      />

      {/* Vertical dark gradient top to transparent bottom */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/70 to-transparent z-10"
      />

      {/* Scrims so the property detail reads over any slide:
          a soft bottom fade + a stronger radial pool anchored bottom-left. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_95%_at_0%_100%,rgba(0,0,0,0.62),rgba(0,0,0,0.18)_38%,transparent_70%)]"
      />

      {/* Centered wordmark watermark. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 flex select-none flex-row items-center justify-center gap-2 overflow-hidden px-4 sm:gap-4 lg:gap-6"
      >
        <TransactionMark className="size-16 text-white/30 sm:size-24 lg:size-32" />
        <span className="text-4xl font-light uppercase tracking-wordmark text-white/30 sm:text-6xl lg:text-7xl">
          Transaction
        </span>
      </div>
    </section>
  );
}
