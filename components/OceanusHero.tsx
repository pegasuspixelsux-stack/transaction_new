import { HeroSlideshow } from "@/components/HeroSlideshow";
import { TransactionMark } from "@/components/TransactionMark";
import { properties } from "@/lib/properties";

const HERO_PROPERTIES = properties.slice(0, 4);

export function OceanusHero() {
  return (
    <section className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-surface">
      <HeroSlideshow properties={HERO_PROPERTIES} />

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
        className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center gap-3 overflow-hidden px-4 sm:gap-4 md:gap-6 lg:gap-8"
      >
        <TransactionMark className="size-10 shrink-0 text-white/30 sm:size-12 md:size-16 lg:size-20 xl:size-24" />
        <span className="text-2xl font-bold uppercase tracking-widest text-white/30 sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl">
          Transaction
        </span>
      </div>
    </section>
  );
}
