// Representative UI mockups shown on the engine cards (Codex-style gradient panels).

function Frame({
  accent,
  children,
}: {
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gradient-to-br ${accent} p-4`}
    >
      <div className="absolute inset-0 opacity-30 [background:radial-gradient(120%_120%_at_20%_0%,white,transparent_55%)]" />
      <div className="relative h-full rounded-xl border border-white/15 bg-[#0b0c12]/85 p-3 backdrop-blur">
        {children}
      </div>
    </div>
  );
}

function SitePotentialMock({ accent }: { accent: string }) {
  return (
    <Frame accent={accent}>
      <div className="flex h-full gap-2.5">
        <div className="relative flex-1 overflow-hidden rounded-lg border border-white/10 bg-indigo-500/10">
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:16px_16px]" />
          <svg viewBox="0 0 120 90" className="absolute inset-0 h-full w-full">
            <polygon
              points="30,25 92,32 84,70 38,64"
              fill="rgba(99,102,241,0.35)"
              stroke="white"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
          </svg>
        </div>
        <div className="flex w-[42%] flex-col gap-1.5 text-[9px]">
          {[
            ["Zone", "R2"],
            ["FSI", "1.10"],
            ["Road", "12 m"],
            ["BUA", "2,764 m²"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex justify-between rounded-md bg-white/5 px-2 py-1"
            >
              <span className="text-muted">{k}</span>
              <span className="font-medium text-white">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function ValuationMock({ accent }: { accent: string }) {
  return (
    <Frame accent={accent}>
      <div className="flex h-full flex-col text-[9px]">
        <div className="mb-2 font-medium text-white">Valuation summary</div>
        {[
          ["Land value", "₹ 2.41 Cr"],
          ["Building (DRC)", "₹ 0.88 Cr"],
          ["Less depreciation", "− ₹ 0.14 Cr"],
        ].map(([k, v]) => (
          <div
            key={k}
            className="flex justify-between border-b border-white/5 py-1 text-muted"
          >
            <span>{k}</span>
            <span className="text-white">{v}</span>
          </div>
        ))}
        <div className="mt-auto flex justify-between rounded-md bg-emerald-500/15 px-2 py-1.5 text-emerald-300">
          <span>MARKET VALUE</span>
          <span className="font-semibold">₹ 3.15 Cr</span>
        </div>
      </div>
    </Frame>
  );
}

function PropertySearchMock({ accent }: { accent: string }) {
  return (
    <Frame accent={accent}>
      <div className="flex h-full flex-col gap-1.5 text-[9px]">
        <div className="mb-1 flex gap-1.5">
          <span className="rounded bg-white/10 px-2 py-0.5 text-white">
            Urban · CTS
          </span>
          <span className="rounded px-2 py-0.5 text-muted">Rural · 7/12</span>
        </div>
        {[
          ["Chain of title", "clear · 30 yrs", "ok"],
          ["Encumbrances", "1 mortgage", "warn"],
          ["Litigation", "none found", "ok"],
          ["Zoning", "Residential", "ok"],
        ].map(([k, v, s]) => (
          <div
            key={k}
            className="flex items-center justify-between rounded-md bg-white/5 px-2 py-1"
          >
            <span className="text-muted">{k}</span>
            <span className="flex items-center gap-1 text-white">
              {v}
              <span
                className={
                  s === "warn" ? "text-amber-400" : "text-emerald-400"
                }
              >
                {s === "warn" ? "▲" : "✓"}
              </span>
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function AssistantMock({ accent }: { accent: string }) {
  return (
    <Frame accent={accent}>
      <div className="relative flex h-full items-center justify-center">
        {/* memory orbits */}
        {[38, 62, 86].map((d, i) => (
          <div
            key={d}
            className="absolute rounded-full border border-amber-300/25"
            style={{ width: `${d}%`, height: `${d * 1.3}%`, opacity: 0.5 - i * 0.1 }}
          />
        ))}
        <div className="absolute h-2.5 w-2.5 rounded-full bg-amber-300 shadow-[0_0_14px_rgba(245,166,90,0.8)]" />
        <div className="absolute bottom-2 flex w-full flex-wrap justify-center gap-1 text-[8px]">
          {["WhatsApp", "Drive", "Calendar", "Links"].map((c) => (
            <span
              key={c}
              className="rounded bg-white/8 px-1.5 py-0.5 text-muted"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function EngineMock({ id, accent }: { id: string; accent: string }) {
  if (id === "assistant") return <AssistantMock accent={accent} />;
  if (id === "site-potential") return <SitePotentialMock accent={accent} />;
  if (id === "valuation") return <ValuationMock accent={accent} />;
  return <PropertySearchMock accent={accent} />;
}
