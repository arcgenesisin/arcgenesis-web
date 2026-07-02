import Link from "next/link";

export function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-card p-5 ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  n,
  children,
  gold = false,
}: {
  n?: string;
  children: React.ReactNode;
  gold?: boolean;
}) {
  return (
    <div
      className={`mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${
        gold ? "text-amber-300" : "text-accent"
      }`}
    >
      {n && (
        <span className="grid h-5 w-5 place-items-center rounded-md bg-white/10 text-[10px] text-foreground">
          {n}
        </span>
      )}
      {children}
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
  badge,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  badge?: React.ReactNode;
}) {
  return (
    <div className="mb-3.5">
      <label className="mb-1 flex items-center gap-2 text-xs text-muted">
        {label}
        {badge}
      </label>
      {children}
      {hint && <div className="mt-1 text-[11px] text-muted/70">{hint}</div>}
    </div>
  );
}

const inputBase =
  "w-full rounded-lg border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none";

export function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return <input {...props} className={`${inputBase} ${props.className ?? ""}`} />;
}

export function Select({
  options,
  className = "",
  ...props
}: { options: string[] } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={`${inputBase} ${className}`}>
      {options.map((o) => (
        <option key={o} className="bg-[#0b0c12]">
          {o}
        </option>
      ))}
    </select>
  );
}

export function Badge({
  children,
  tone = "accent",
}: {
  children: React.ReactNode;
  tone?: "accent" | "geo" | "asr" | "fsi" | "ai" | "green" | "amber";
}) {
  const tones: Record<string, string> = {
    accent: "bg-indigo-500/15 text-indigo-300",
    geo: "bg-cyan-500/15 text-cyan-300",
    asr: "bg-amber-500/15 text-amber-300",
    fsi: "bg-emerald-500/15 text-emerald-300",
    ai: "bg-purple-500/15 text-purple-300",
    green: "bg-emerald-500/15 text-emerald-300",
    amber: "bg-amber-500/15 text-amber-300",
  };
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

// A primary action that is gated until sign-in.
export function GateButton({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href="/login"
      className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.01]"
    >
      <span className="opacity-90 group-hover:opacity-100">🔒</span>
      {children}
    </Link>
  );
}

export function GhostButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/12 px-3 py-2 text-sm text-muted transition-colors hover:border-white/25 hover:text-foreground"
    >
      {children}
    </button>
  );
}
