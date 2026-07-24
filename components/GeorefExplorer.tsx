"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// The georeferencing showcase: a register of Development / Regional Plan sheets
// our pipeline placed on the real world automatically. Select any plan to see
// the placed sheet fade over live satellite imagery. Leaflet is loaded from a
// CDN on the client (no SSR), so this component renders nothing on the server.
// ---------------------------------------------------------------------------

type LatLng = [number, number];
type Bounds = [LatLng, LatLng]; // [[south, west], [north, east]]

type Plan = {
  id: string;
  title: string;
  district: string;
  planType: "DP" | "RP";
  verdict: string;
  residual_m: number | null;
  channels: string[];
  bounds: Bounds;
  preview: string;
};

type Index = {
  count: number;
  districts: string[];
  published: string;
  withheld: string;
  plans: Plan[];
};

// A minimal shape of the parts of the Leaflet API we call, so we stay typed
// without pulling Leaflet's full types for a CDN global.
type LMap = {
  setView: (c: LatLng, z: number) => LMap;
  fitBounds: (b: Bounds, o?: object) => void;
  remove: () => void;
};
type LLayer = { addTo: (m: LMap) => LLayer };
type LOverlay = LLayer & { setOpacity: (o: number) => void; remove: () => void };
type Leaflet = {
  map: (el: HTMLElement, o?: object) => LMap;
  tileLayer: (url: string, o?: object) => LLayer;
  imageOverlay: (url: string, b: Bounds, o?: object) => LOverlay;
};

declare global {
  interface Window {
    L?: Leaflet;
  }
}

const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

function loadLeaflet(): Promise<Leaflet> {
  return new Promise((resolve, reject) => {
    if (window.L) return resolve(window.L);
    if (!document.querySelector(`link[href="${LEAFLET_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = LEAFLET_CSS;
      document.head.appendChild(link);
    }
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${LEAFLET_JS}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(window.L!));
      existing.addEventListener("error", reject);
      return;
    }
    const s = document.createElement("script");
    s.src = LEAFLET_JS;
    s.async = true;
    s.onload = () => resolve(window.L!);
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

export default function GeorefExplorer() {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LMap | null>(null);
  const overlayRef = useRef<LOverlay | null>(null);

  const [data, setData] = useState<Index | null>(null);
  const [current, setCurrent] = useState<Plan | null>(null);
  const [opacity, setOpacity] = useState(72);
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [band, setBand] = useState(0);

  // Boot: load Leaflet + the index, init the map, select the first plan.
  useEffect(() => {
    let disposed = false;
    Promise.all([
      loadLeaflet(),
      fetch("/georef_index.json", { cache: "force-cache" }).then((r) => r.json() as Promise<Index>),
    ])
      .then(([L, index]) => {
        if (disposed || !mapEl.current) return;
        const map = L.map(mapEl.current, { zoomControl: true, attributionControl: true }).setView(
          [19.4, 75.8],
          7,
        );
        L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          { maxZoom: 19, attribution: "Imagery © Esri" },
        ).addTo(map);
        L.tileLayer(
          "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
          { maxZoom: 19, opacity: 0.7 },
        ).addTo(map);
        mapRef.current = map;
        setData(index);
        if (index.plans.length) setCurrent(index.plans[0]);
      })
      .catch(() => setData({ count: 0, districts: [], published: "", withheld: "", plans: [] }));
    return () => {
      disposed = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Whenever the selected plan changes, swap the raster overlay + frame it.
  useEffect(() => {
    const map = mapRef.current;
    const L = typeof window !== "undefined" ? window.L : undefined;
    if (!map || !L || !current) return;
    overlayRef.current?.remove();
    const ov = L.imageOverlay(current.preview, current.bounds, { opacity: opacity / 100 });
    ov.addTo(map);
    overlayRef.current = ov;
    map.fitBounds(current.bounds, { padding: [46, 46], maxZoom: 16 });
    // opacity intentionally excluded: opacity changes are handled below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  // Live opacity, without rebuilding the overlay.
  useEffect(() => {
    overlayRef.current?.setOpacity(opacity / 100);
  }, [opacity]);

  const stats = useMemo(() => {
    if (!data) return { count: 0, districts: 0, best: "—", sub5: 0 };
    const res = data.plans.map((p) => p.residual_m).filter((v): v is number => v != null);
    return {
      count: data.count,
      districts: data.districts.length,
      best: res.length ? `${Math.min(...res)} m` : "—",
      sub5: res.filter((v) => v <= 5).length,
    };
  }, [data]);

  const rows = useMemo(() => {
    if (!data) return [];
    const query = q.trim().toLowerCase();
    return data.plans.filter(
      (p) =>
        (!query || `${p.title} ${p.district}`.toLowerCase().includes(query)) &&
        (!type || p.planType === type) &&
        (!band || (p.residual_m != null && p.residual_m <= band)),
    );
  }, [data, q, type, band]);

  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
      {/* stats band */}
      <div className="grid grid-cols-2 divide-white/10 border-b border-white/10 sm:grid-cols-4 sm:divide-x">
        {[
          { n: stats.count, l: "Plans placed" },
          { n: stats.districts, l: "Districts" },
          { n: stats.best, l: "Best residual" },
          { n: stats.sub5, l: "Within 5 m" },
        ].map((s, i) => (
          <div key={s.l} className={`px-5 py-4 ${i < 2 ? "border-b border-white/10 sm:border-b-0" : ""} ${i % 2 ? "border-l border-white/10 sm:border-l-0" : ""}`}>
            <div className="text-2xl font-semibold tabular-nums text-foreground">{s.n}</div>
            <div className="mt-0.5 text-[11px] uppercase tracking-wider text-muted">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:h-[82vh] lg:min-h-[620px] lg:grid-cols-[minmax(0,400px)_1fr]">
        {/* register */}
        <div className="flex min-h-0 flex-col border-b border-white/10 lg:h-full lg:border-b-0 lg:border-r">
          <div className="flex flex-wrap gap-2 p-4">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search plan or district…"
              className="min-w-0 flex-1 rounded-lg border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted/60 focus:border-white/30"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-lg border border-white/12 bg-[#0d0f18] px-2.5 py-2 text-sm text-foreground outline-none focus:border-white/30"
            >
              <option value="">DP + RP</option>
              <option value="DP">Urban DP</option>
              <option value="RP">Rural RP</option>
            </select>
            <select
              value={band}
              onChange={(e) => setBand(Number(e.target.value))}
              className="rounded-lg border border-white/12 bg-[#0d0f18] px-2.5 py-2 text-sm text-foreground outline-none focus:border-white/30"
            >
              <option value={0}>Any residual</option>
              <option value={5}>≤ 5 m</option>
              <option value={10}>≤ 10 m</option>
              <option value={20}>≤ 20 m</option>
            </select>
          </div>

          <div className="max-h-[460px] min-h-0 flex-1 overflow-y-auto lg:max-h-none">
            {!data ? (
              <div className="p-6 text-sm text-muted">Loading the register…</div>
            ) : rows.length === 0 ? (
              <div className="p-6 text-sm text-muted">No plans match that filter.</div>
            ) : (
              rows.map((p) => {
                const on = current?.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setCurrent(p)}
                    className={`block w-full border-b border-white/[0.06] px-4 py-3 text-left transition-colors ${
                      on ? "bg-accent/15 shadow-[inset_3px_0_0_var(--accent)]" : "hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="text-[13px] font-semibold leading-snug text-foreground">{p.title}</div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      <span className="rounded-full border border-indigo-400/35 px-2 py-0.5 text-[10px] text-indigo-200">
                        {p.planType}
                      </span>
                      <span className="rounded-full border border-white/12 px-2 py-0.5 text-[10px] text-muted">
                        {cap(p.district)}
                      </span>
                      {p.residual_m != null && (
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[10px] ${
                            p.residual_m <= 5
                              ? "border-emerald-400/35 text-emerald-300"
                              : "border-amber-400/30 text-amber-300"
                          }`}
                        >
                          {p.residual_m} m
                        </span>
                      )}
                    </div>
                    <div className="mt-1.5 text-[10px] text-muted/80">{p.channels.join(" + ")} agreed</div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* map */}
        <div className="relative min-h-[440px] lg:h-full lg:min-h-0">
          <div ref={mapEl} className="absolute inset-0 bg-[#0b0d15]" />
          {current && (
            <div className="pointer-events-auto absolute right-4 top-4 z-[500] max-w-[320px] rounded-xl border border-white/12 bg-background/90 p-4 backdrop-blur-md">
              <div className="text-sm font-semibold text-foreground">{current.title}</div>
              <div className="mt-1 text-xs leading-relaxed text-muted">
                {cap(current.district)} · {current.planType === "RP" ? "Regional Plan" : "Development Plan"}
                <br />
                Verdict <b className="text-foreground">{current.verdict}</b>
                {current.residual_m != null && (
                  <>
                    {" "}
                    · median residual <b className="text-foreground">{current.residual_m} m</b>
                  </>
                )}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-[11px] text-muted">Sheet</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="flex-1 accent-accent"
                  aria-label="Plan raster opacity"
                />
                <span className="w-9 text-right text-[11px] tabular-nums text-muted">{opacity}%</span>
              </div>
              <div className="mt-0.5 text-[10px] text-muted/70">Satellite ← → placed sheet</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
