"use client";

import { useState } from "react";
import EngineShell from "@/components/engine/EngineShell";
import {
  Panel,
  SectionTitle,
  Field,
  TextInput,
  Select,
  Badge,
  GateButton,
} from "@/components/engine/parts";

const reports = [
  { id: "land_market", icon: "🌐", tag: "MARKET", name: "Land, market value", note: "Sales-comparison from comparable instances." },
  { id: "land_plus_building", icon: "🏠", tag: "MARKET + COST", name: "Land + Building", note: "Market land + depreciated replacement cost." },
  { id: "residual", icon: "🏗", tag: "RESIDUAL", name: "Residual / development", note: "Value from the permissible development envelope." },
  { id: "reinstatement", icon: "🛡", tag: "COST", name: "Reinstatement (insurance)", note: "Current cost to rebuild new-for-old." },
  { id: "wip", icon: "🚧", tag: "COST · %", name: "Work-in-progress", note: "Staged value on percentage completion." },
  { id: "income_rent", icon: "💰", tag: "INCOME", name: "Income / rent", note: "Capitalised net income." },
];

export default function ValuationPage() {
  const [report, setReport] = useState<string | null>(null);
  const active = reports.find((r) => r.id === report);

  return (
    <EngineShell
      name="Valuation Report Engine"
      glyph="⚖"
      accent="from-emerald-500 to-teal-500"
      blurb="A defensible number, not a guess."
    >
      <div className="mb-2">
        <h1 className="text-xl font-semibold">Choose the valuation you need</h1>
        <p className="mt-1 text-sm text-muted">
          The form adapts to the report type, each field is pulled from the
          georef plot, ASR, the potential engine, or read from a document you
          upload. You confirm every value; you sign it.
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((r) => (
          <button
            key={r.id}
            onClick={() => setReport(r.id)}
            className={`rounded-2xl border p-4 text-left transition-colors ${
              report === r.id
                ? "border-emerald-400/50 bg-emerald-500/10"
                : "border-white/10 bg-card hover:border-white/25"
            }`}
          >
            <div className="text-xl">{r.icon}</div>
            <div className="mt-1 text-[11px] font-semibold text-amber-300">
              {r.tag}
            </div>
            <div className="mt-0.5 font-medium">{r.name}</div>
            <div className="mt-1 text-xs text-muted">{r.note}</div>
          </button>
        ))}
      </div>

      {active && (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
          {/* form */}
          <div className="space-y-6">
            <Panel>
              <h3 className="text-lg font-semibold">
                {active.icon} {active.name}
              </h3>
              <p className="mt-1 text-xs text-muted">{active.note}</p>

              <div className="mt-5">
                <SectionTitle>Instruction &amp; purpose</SectionTitle>
                <div className="grid gap-x-4 sm:grid-cols-2">
                  <Field label="Instructing client">
                    <TextInput placeholder="Name of client" />
                  </Field>
                  <Field label="Purpose of valuation">
                    <Select options={["Secured lending", "Sale / purchase", "Insurance", "Financial reporting", "Litigation"]} />
                  </Field>
                  <Field label="Registered Valuer">
                    <TextInput placeholder="Valuer name" />
                  </Field>
                  <Field label="IBBI Reg. No.">
                    <TextInput placeholder="IBBI/RV/…" />
                  </Field>
                </div>
              </div>

              <div className="mt-2">
                <SectionTitle>Property &amp; location</SectionTitle>
                <Field label="Property address">
                  <TextInput placeholder="Full postal address" />
                </Field>
                <div className="grid grid-cols-2 gap-x-4">
                  <Field label="Latitude" badge={<Badge tone="geo">GEO</Badge>}>
                    <TextInput placeholder="20.2560" />
                  </Field>
                  <Field label="Longitude" badge={<Badge tone="geo">GEO</Badge>}>
                    <TextInput placeholder="75.1310" />
                  </Field>
                </div>
              </div>

              <div className="mt-2">
                <SectionTitle>Town-planning &amp; valuation inputs</SectionTitle>
                <div className="grid gap-x-4 sm:grid-cols-2">
                  <Field
                    label="DP land-use zone"
                    badge={<Badge tone="fsi">FSI</Badge>}
                  >
                    <div className="flex gap-2">
                      <TextInput placeholder="Residential" />
                      <PullBtn label="DP ↺" />
                    </div>
                  </Field>
                  <Field
                    label="Permissible FSI"
                    badge={<Badge tone="fsi">FSI</Badge>}
                  >
                    <div className="flex gap-2">
                      <TextInput placeholder="1.10" />
                      <PullBtn label="DP ↺" />
                    </div>
                  </Field>
                  <Field
                    label="ASR / ready-reckoner rate"
                    badge={<Badge tone="asr">ASR</Badge>}
                  >
                    <div className="flex gap-2">
                      <TextInput placeholder="₹ / m²" />
                      <PullBtn label="ASR ↺" />
                    </div>
                  </Field>
                  <Field label="Land area (m²)">
                    <TextInput type="number" placeholder="e.g. 1842" />
                  </Field>
                  <Field
                    label="Built-up area (m²)"
                    badge={<Badge tone="ai">AI read</Badge>}
                  >
                    <TextInput type="number" placeholder="from approved plan" />
                  </Field>
                  <Field label="Replacement rate (₹/m²)">
                    <TextInput type="number" placeholder="construction cost" />
                  </Field>
                </div>
              </div>

              <div className="mt-4">
                <GateButton>Compute valuation →</GateButton>
              </div>

              <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/[0.06] p-3 text-[11px] text-red-200/80">
                <b>Boundaries (built-in).</b> AI-read values are advisory and
                carry their source, verify against originals. The final value
                opinion, inspection and signature remain the Registered
                Valuer&apos;s.
              </div>
            </Panel>
          </div>

          {/* summary */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Panel className="min-h-[380px]">
              <SectionTitle gold>Valuation summary</SectionTitle>
              <div className="space-y-2 text-sm">
                {[
                  ["Land value (market)", ", "],
                  ["Building value (DRC)", ", "],
                  ["Less depreciation", ", "],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between border-b border-white/5 py-2 text-muted"
                  >
                    <span>{k}</span>
                    <span className="text-foreground/60">{v}</span>
                  </div>
                ))}
                <div className="flex justify-between rounded-lg bg-emerald-500/10 px-3 py-2.5 text-emerald-300">
                  <span className="font-medium">MARKET VALUE</span>
                  <span className="font-semibold">₹, </span>
                </div>
              </div>
              <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center text-sm text-muted">
                🔒 Sign in to compute and generate the IBBI-format report draft.
              </div>
            </Panel>
          </div>
        </div>
      )}

      {!active && (
        <div className="mt-10 rounded-2xl border border-dashed border-white/12 p-10 text-center text-sm text-muted">
          Select a report type above to open its form.
        </div>
      )}
    </EngineShell>
  );
}

function PullBtn({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 cursor-not-allowed items-center rounded-lg border border-white/12 px-2.5 text-xs text-amber-300/80">
      {label}
    </span>
  );
}
