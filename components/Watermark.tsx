import { TransactionMark } from "@/components/TransactionMark";

/** Brand badge overlaid on property photos. Parent must be `relative`. */
export function Watermark({ showLocation = false }: { showLocation?: boolean }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-3 right-3 z-10 flex items-center gap-1.5 border border-white/15 bg-black/40 px-2 py-1 text-white backdrop-blur-sm sm:bottom-4 sm:right-4 sm:gap-2 sm:px-3 sm:py-1.5"
    >
      <TransactionMark className="size-3.5 sm:size-4" />
      <span className="text-[10px] font-light uppercase tracking-wordmark sm:text-xs">
        Transaction
        {showLocation && (
          <span className="hidden opacity-60 sm:inline"> | Punta del Este</span>
        )}
      </span>
    </div>
  );
}
