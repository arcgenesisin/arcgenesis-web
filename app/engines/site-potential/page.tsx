"use client";

import { useState } from "react";
import EngineShell from "@/components/engine/EngineShell";
import {
  Panel,
  SectionTitle,
  Field,
  TextInput,
  Select,
  GateButton,
  GhostButton,
} from "@/components/engine/parts";

const routes = [
  { id: "building", label: "Building", status: "FSI, setbacks, parking & charges", on: true },
  { id: "layout", label: "Layout", status: "Layout roads, open space, saleable plots", on: true },
  { id: "group", label: "Group Housing", status: "Module pending · eligibility shown", on: false },
  { id: "township", label: "Township", status: "Module pending · threshold checks", on: false },
  { id: "affordable", label: "Affordable", status: "May be mandatory or optional", on: false },
  { id: "special", label: "Special", status: "Hospital, mall, school, cinema…", on: false },
];

export default function SitePotentialPage() {
  const [route, setRoute] = useState("building");
  const [opacity, setOpacity] = useState(70);

  return (
    <EngineShell
      name="Site Potential Engine"
      glyph="▚"
      accent="from-indigo-500 to-blue-500"
      blurb="How much can this land actually build?"
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.9fr]">
        {/* ---- Form column ---- */}
        <div className="space-y-6">
          <Panel>
            <SectionTitle n="1">Locate the plot</SectionTitle>
            <Field label="Paste a Google Maps link or lat, long">
              <div className="flex gap-2">
                <TextInput placeholder="https://maps.google.com/…@20.256,75.131  or  20.2560, 75.1310" />
                <GhostButton disabled className="shrink-0 opacity-70">
                  🗺 Locate
                </GhostButton>
              </div>
            </Field>
            <div className="relative mt-2 h-56 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-indigo-600/25 to-blue-500/15">
              <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:26px_26px]" />
              <div
                className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                style={{ boxShadow: "0 0 0 6px rgba(255,255,255,0.25)" }}
              />
              <div className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-2.5 py-1.5 text-[11px] backdrop-blur">
                DP raster overlay · warped to satellite
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-xs text-muted">DP opacity</span>
              <input
                type="range"
                min={0}
                max={100}
                value={opacity}
                onChange={(e) => setOpacity(+e.target.value)}
                className="flex-1 accent-indigo-500"
              />
              <span className="w-8 text-right text-xs text-muted">
                {opacity}%
              </span>
            </div>
            <div className="mt-3">
              <GateButton>Assess this pin against the DP plan</GateButton>
            </div>
          </Panel>

          <Panel>
            <SectionTitle n="2">Context</SectionTitle>
            <div className="grid gap-x-4 sm:grid-cols-2">
              <Field label="Planning context">
                <Select options={["Municipal Corporation", "Municipal Council", "Regional Plan", "Special Authority"]} />
              </Field>
              <Field label="Legal land type">
                <Select options={["Non-agricultural (NA)", "Agricultural", "Gaothan", "Industrial"]} />
              </Field>
              <Field label="Planning zone class">
                <Select options={["Residential", "Commercial", "Industrial", "Public / Semi-public", "No-development"]} />
              </Field>
              <Field label="Access context">
                <Select options={["Abuts public road", "Internal / layout road", "Proposed DP road", "No direct access"]} />
              </Field>
              <Field label="Special overlay">
                <Select options={["None", "Heritage", "Coastal (CRZ)", "Airport (OLS)", "TOD"]} />
              </Field>
            </div>
          </Panel>

          <Panel>
            <SectionTitle n="3">Development route</SectionTitle>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {routes.map((r) => (
                <button
                  key={r.id}
                  disabled={!r.on}
                  onClick={() => r.on && setRoute(r.id)}
                  className={`rounded-xl border p-3 text-left transition-colors ${
                    route === r.id && r.on
                      ? "border-indigo-400/50 bg-indigo-500/10"
                      : r.on
                        ? "border-white/12 hover:border-white/25"
                        : "cursor-not-allowed border-white/5 opacity-45"
                  }`}
                >
                  <div className="flex items-center gap-2 text-sm font-medium">
                    {r.label}
                    {!r.on && (
                      <span className="text-[10px] text-muted">soon</span>
                    )}
                  </div>
                  <div className="mt-1 text-[11px] text-muted">{r.status}</div>
                </button>
              ))}
            </div>
          </Panel>

          <Panel>
            <SectionTitle>Plot information</SectionTitle>
            <div className="grid gap-x-4 sm:grid-cols-2">
              <Field label="Authority">
                <Select options={["PMC", "PCMC", "NMC", "AMC", "Other ULB"]} />
              </Field>
              <Field label="Zone / Use">
                <Select options={["R1", "R2", "C1", "C2", "I1"]} />
              </Field>
              <Field label="Plot area (m²)">
                <TextInput type="number" placeholder="e.g. 500" />
              </Field>
              <Field label="Area type">
                <Select options={["Congested", "Non-congested"]} />
              </Field>
              <Field label="Plot width (m)">
                <TextInput type="number" placeholder="e.g. 20" />
              </Field>
              <Field label="Plot depth (m)">
                <TextInput type="number" placeholder="e.g. 25" />
              </Field>
            </div>

            <div className="mt-2 text-xs text-muted">
              Road widths (m), enter whichever sides abut a road
            </div>
            <div className="mt-2 grid grid-cols-2 gap-x-4 sm:grid-cols-4">
              {["Front", "Rear", "Left", "Right"].map((s) => (
                <Field key={s} label={s}>
                  <TextInput type="number" placeholder=", " />
                </Field>
              ))}
            </div>

            <div className="mt-2 rounded-xl border border-dashed border-white/15 p-4 text-center text-xs text-muted">
              Drop a plot DXF here to trace the boundary automatically
            </div>

            <div className="mt-5">
              <GateButton>Compute building potential →</GateButton>
            </div>
          </Panel>
        </div>

        {/* ---- Result column ---- */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Panel className="min-h-[420px]">
            <SectionTitle gold>Development potential</SectionTitle>
            <div className="space-y-2.5 text-sm">
              {[
                ["Permissible FSI", ", ·, "],
                ["Buildable-up area", ", m²"],
                ["Ground coverage", ", "],
                ["Setbacks (F/R/S)", ", /, /, "],
                ["Parking required", ", "],
                ["Premium / charges", ", "],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between border-b border-white/5 py-2 text-muted"
                >
                  <span>{k}</span>
                  <span className="text-foreground/60">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center text-sm text-muted">
              🔒 Sign in and assess a pin to see the full computed report,
              read straight from the DP plan and UDCPR.
            </div>
          </Panel>
        </div>
      </div>
    </EngineShell>
  );
}
