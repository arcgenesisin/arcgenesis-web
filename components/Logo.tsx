import Link from "next/link";

// ARC GENESIS wordmark with an arc/genesis mark.
export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <span className="relative grid h-8 w-8 place-items-center rounded-[9px] bg-gradient-to-br from-indigo-500 to-blue-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M4 19c3-9 5.5-13 8-13s5 4 8 13"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="6" r="1.6" fill="white" />
        </svg>
      </span>
      {!compact && (
        <span className="text-[15px] font-semibold tracking-tight">
          ARC GENESIS
        </span>
      )}
    </Link>
  );
}
