// The evidence behind the claims on this site.
//
// Every number here was counted from our own production data on 2026-08-01, not
// estimated. Scope is deliberately MAHARASHTRA ONLY: we hold land and regulation
// data for other states, but the engines that read a plot and answer a question
// are audited for Maharashtra, so that is the only coverage we advertise.
//
// Sources: the ARCDP georeference manifest (data/dp_cutout/manifest.json) and the
// land_engine database. When those move, update this file and nothing else.

export const COVERAGE_AS_OF = "August 2026";

export type Stat = { value: string; label: string; note?: string };

// The headline band. Four numbers a stranger can check against the product.
export const HEADLINE: Stat[] = [
  { value: "315", label: "Planning sheets georeferenced", note: "Development and Regional Plans placed on the earth" },
  { value: "0.7 m", label: "Best alignment", note: "median 7.1 m across every accepted sheet" },
  { value: "12.6 M", label: "Cadastral plots", note: "across 43,662 villages" },
  { value: "48,598", label: "RERA projects read", note: "37 districts" },
];

export type Group = { title: string; blurb: string; rows: Stat[] };

export const GROUPS: Group[] = [
  {
    title: "Development and Regional Plans",
    blurb:
      "The statutory plans that decide what a plot may become are published as flat scans, tied to no map. We place them back on the earth and check the fit before we accept one.",
    rows: [
      { value: "315", label: "Sheets georeferenced and accepted" },
      { value: "173", label: "Accepted at full parity", note: "the strictest tier we award" },
      { value: "199", label: "Sheets aligned within 10 m" },
      { value: "91", label: "Sheets aligned within 5 m" },
      { value: "0.7 m", label: "Best alignment achieved" },
      { value: "1,081", label: "Plan documents in the corpus" },
    ],
  },
  {
    title: "Land records",
    blurb:
      "Ownership and parcel geometry for the state, so a plot can be identified from a survey number rather than a pin dropped by hand.",
    rows: [
      { value: "12,669,609", label: "Cadastral plots" },
      { value: "43,662", label: "Villages with parcel coverage" },
      { value: "48,610", label: "Village boundaries" },
      { value: "305", label: "Taluka boundaries" },
    ],
  },
  {
    title: "Rates and market",
    blurb:
      "What land is officially worth, and what is actually being built, so a valuation has something to stand on.",
    rows: [
      { value: "396,710", label: "Ready reckoner rate rows" },
      { value: "35", label: "Districts with rate coverage" },
      { value: "48,598", label: "MahaRERA projects" },
      { value: "37", label: "Districts with project coverage" },
    ],
  },
  {
    title: "The ground itself",
    blurb:
      "Forest, water, farmland and industry are not decoration on a map. Each one changes what may be built and how far from it you must stand.",
    rows: [
      { value: "143,762", label: "Land classification polygons" },
      { value: "31,613", label: "Water bodies" },
      { value: "13,281", label: "Farmland parcels" },
      { value: "7,742", label: "Forest polygons" },
      { value: "4,842", label: "Industrial areas" },
      { value: "1,204", label: "Mining areas" },
    ],
  },
  {
    title: "Infrastructure",
    blurb:
      "Road width decides permissible FSI. Rail and water decide setbacks. All of it is measured, not assumed.",
    rows: [
      { value: "1,537,084", label: "Road segments" },
      { value: "25,014", label: "Waterways" },
      { value: "16,577", label: "Railway segments" },
      { value: "14,839", label: "Electrified rail segments" },
    ],
  },
];

// The regulation actually encoded in the engine today. Deliberately narrow: we
// hold data far beyond this, but a regime is only listed once the engine reasons
// over it. Confirmed with the engine side 2026-08-01: UDCPR only.
export const REGULATION_ENCODED = {
  live: ["UDCPR 2020"],
  note:
    "One regulation, encoded properly and audited, rather than a long list read loosely. The other Maharashtra regimes, MHADA, PMRDA, CIDCO, NAINA and MSRDC, are being encoded to the same standard and are not claimed until they are.",
};

// The proximity rules the engine actually tests a plot against. Named because a
// buyer should be able to see the checklist, not take our word for its length.
export const REGULATION_LAYERS: string[] = [
  "Nallah and natural watercourse",
  "River and major watercourse",
  "Wetland",
  "Lake, tank and water body",
  "DP reservation",
  "DP road and road widening",
  "CRZ, coastal regulation zone",
  "HT and EHV power line",
  "Railway boundary",
  "Highway control line, NH and SH",
];
