"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import AuthButton from "./AuthButton";

const links = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Blogs", href: "/blogs" },
  { label: "Learn", href: "/learn" },
  { label: "Pricing", href: "/#pricing" },
];

type Lenis = { scrollTo: (t: number, o?: object) => void };

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Home: if already on the landing, glide to the top instead of no-op
  const onHome = (e: React.MouseEvent) => {
    setOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
      if (lenis) lenis.scrollTo(0, { duration: 1.4 });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="flex h-16 w-full items-center justify-between px-6 sm:px-10">
        <Logo />

        <div className="hidden items-center gap-2 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={l.label === "Home" ? onHome : undefined}
              className="rounded-full px-4 py-2 text-[15px] font-medium text-muted transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <AuthButton />
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 md:hidden"
          >
            <span className="text-2xl leading-none">{open ? "×" : "≡"}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-background/95 px-5 py-5 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1.5">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={l.label === "Home" ? onHome : () => setOpen(false)}
                className="rounded-lg px-3 py-3 text-lg text-muted hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <AuthButton mobile onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}
