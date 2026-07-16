import Link from "next/link";
import Logo from "./Logo";

const cols = [
  {
    heading: "Product",
    links: [
      { label: "Pricing", href: "/#pricing" },
      { label: "Site Potential", href: "/engines/site-potential" },
      { label: "Valuation", href: "/engines/valuation" },
      { label: "Title Search", href: "/engines/property-search" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blogs", href: "/blogs" },
      { label: "Learn", href: "/learn" },
    ],
  },
  {
    heading: "Get started",
    links: [
      { label: "Log in", href: "/login" },
      { label: "Contact", href: "/about" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-5 py-14 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted">
            The ground truth of Indian land — plans, codes, rates and records,
            in one conversation.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.heading}>
            <div className="text-sm font-medium">{c.heading}</div>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-6 text-xs text-muted">
        © {new Date().getFullYear()} ARC GENESIS. Built for land in India.
      </div>
    </footer>
  );
}
