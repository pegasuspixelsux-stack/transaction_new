export function TransactionMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <circle cx="12" cy="12" r="10.25" strokeWidth={1.5} />
      <path d="M7.75 8.25h8.5M12 8.25v8" strokeWidth={2.75} />
    </svg>
  );
}
