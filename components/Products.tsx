import Link from "next/link";
import { products } from "@/lib/products";
import Reveal from "./Reveal";
import { EngineMock } from "./EngineMock";

export default function Products() {
  return (
    <section id="products" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-10">
      <Reveal>
        <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-5xl">
          One chat. Four modes.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          Switch the mode and the room changes around the same conversation.
          Open one to see its reality — sign in to run it on your own land.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((p, i) => (
          <Reveal key={p.id} delay={i * 90}>
            <Link
              href={p.href}
              className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-card transition-colors hover:border-white/25"
            >
              <div className="p-3 pb-0">
                <EngineMock id={p.id} accent={p.accent} />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br ${p.accent} text-white`}
                  >
                    {p.glyph}
                  </span>
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                </div>
                <p className="mt-3 text-sm text-accent/90">{p.tagline}</p>
                <p className="mt-3 flex-1 text-sm text-muted">{p.description}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                  Open interface
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
