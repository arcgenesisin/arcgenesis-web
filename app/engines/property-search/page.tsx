"use client";

import { useState } from "react";
import EngineShell from "@/components/engine/EngineShell";
import {
  Panel,
  SectionTitle,
  Field,
  TextInput,
  GateButton,
  GhostButton,
  Badge,
} from "@/components/engine/parts";

const reportSections = [
  { title: "Property identity", badge: null },
  { title: "Title records", badge: <Badge tone="ai">local VLM → reconcile</Badge> },
  { title: "Chain of title (devolution)", badge: null },
  { title: "Encumbrances & charges", badge: null },
  { title: "Litigation", badge: null },
  { title: "Parcel, zoning & developability", badge: <Badge tone="green">our layer · no captcha</Badge> },
  { title: "Red-flag panel", badge: <Badge tone="amber">flags</Badge> },
  { title: "Opinion", badge: null },
];

export default function PropertySearchPage() {
  const [land, setLand] = useState<"urban" | "rural">("urban");

  return (
    <EngineShell
      name="Property Search Engine"
      glyph="⌖"
      accent="from-fuchsia-500 to-purple-500"
      blurb="Know the title before you commit."
    >
      {/* land-type toggle */}
      <div className="mb-6 inline-flex rounded-full border border-white/12 bg-card p-1">
        <button
          onClick={() => setLand("urban")}
          className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
            land === "urban" ? "bg-white text-black" : "text-muted"
          }`}
        >
          🏙 Urban — City Survey (CTS)
        </button>
        <button
          onClick={() => setLand("rural")}
          className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
            land === "rural" ? "bg-white text-black" : "text-muted"
          }`}
        >
          🌾 Rural — 7/12 (Satbara)
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        {/* left: inputs */}
        <div className="space-y-6">
          <Panel>
            <SectionTitle n="1">Upload documents</SectionTitle>
            <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center">
              <div className="text-sm">Drag &amp; drop files here, or click to browse</div>
              <div className="mt-1 text-[11px] text-muted">
                PDF / JPG / PNG — one document or the whole file. Tag each with
                its type.
              </div>
            </div>
            <Field label="Or paste text (survey number, address, record text) — optional">
              <textarea
                className="w-full rounded-lg border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
                rows={3}
                placeholder="e.g. CTS 214, Ward B, or paste a copied record…"
              />
            </Field>
            <div className="mt-2 flex gap-2">
              <div className="flex-1">
                <GateButton>Extract &amp; build search plan →</GateButton>
              </div>
              <GhostButton disabled className="opacity-70">
                Reset
              </GhostButton>
            </div>
          </Panel>

          <Panel>
            <SectionTitle n="2">Identified property</SectionTitle>
            <div className="grid gap-x-4 sm:grid-cols-2">
              <Field label={land === "urban" ? "CTS / Survey No." : "Survey / Gut No."}>
                <TextInput placeholder="—" />
              </Field>
              <Field label={land === "urban" ? "Ward" : "Village"}>
                <TextInput placeholder="—" />
              </Field>
              <Field label="District">
                <TextInput placeholder="—" />
              </Field>
              {land === "rural" && (
                <Field label="Khata No. (8A)">
                  <TextInput placeholder="—" />
                </Field>
              )}
              <Field label="Area">
                <TextInput placeholder="sq.m / sq.ft / H-R-P" />
              </Field>
              <Field label={land === "urban" ? "Tenure / Class" : "Tenure"}>
                <TextInput placeholder="Occupancy Class I / II / leasehold" />
              </Field>
              <Field label="Chain years to search">
                <TextInput type="number" defaultValue={30} />
              </Field>
            </div>
          </Panel>

          <Panel>
            <SectionTitle n="3">Fetch plan</SectionTitle>
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div>
                <div className="text-2xl font-semibold">—</div>
                <div className="text-[11px] text-muted">
                  estimated captcha solves for this plot
                </div>
              </div>
              <GhostButton disabled className="opacity-70">
                ▶ Start batched fetch
              </GhostButton>
            </div>
          </Panel>
        </div>

        {/* right: report */}
        <div>
          <Panel>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Property Search Report</h3>
              <GhostButton disabled className="opacity-70">
                Export / Print
              </GhostButton>
            </div>
            <div className="space-y-3">
              {reportSections.map((s) => (
                <div
                  key={s.title}
                  className="rounded-xl border border-white/10 bg-white/[0.015] p-4"
                >
                  <div className="flex items-center gap-2 text-sm font-medium">
                    {s.title}
                    {s.badge}
                  </div>
                  <div className="mt-2 text-xs text-muted">
                    {s.title === "Opinion"
                      ? "Reserved for the certifying lawyer — the engine produces evidence and flags, not the marketability opinion."
                      : "Populated after extraction and fetch."}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center text-sm text-muted">
              🔒 Sign in to run the extraction, batched fetch and cadastral
              lookup on your parcel.
            </div>
          </Panel>
        </div>
      </div>
    </EngineShell>
  );
}
