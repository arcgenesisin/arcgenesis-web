import PageShell from "@/components/PageShell";

export const metadata = { title: "Features — ARC GENESIS" };

type Block = {
  id: string;
  accent: string;
  eyebrow: string;
  title: string;
  intro: string;
  groups: { heading: string; items: string[] }[];
};

const blocks: Block[] = [
  {
    id: "arc-ai",
    accent: "#fbbf24",
    eyebrow: "ARC AI",
    title: "A mind that carries your world",
    intro:
      "ARC AI holds everything you give it — and lives inside the chats you already use. No app to install, no new habit to learn.",
    groups: [
      {
        heading: "Every chat window is a door",
        items: [
          "WhatsApp, Instagram, Facebook Messenger, Telegram, X and email — feed it or ask it from any of them",
          "One identity across all channels: link once, and ARC AI knows it's you everywhere",
          "Send a document from WhatsApp, retrieve it from the web — the memory is one",
        ],
      },
      {
        heading: "Living memory",
        items: [
          "Documents — deeds, plans, sanctions, receipts — filed automatically under the project they belong to",
          "Projects — it learns your projects' structure, so 'what's pending on Kharadi?' is answerable from your own files",
          "Links, notes and conversations — everything you've ever sent it stays retrievable in plain language",
          "Your calendar — it reads it, writes to it, and reminds you",
        ],
      },
      {
        heading: "It does the work",
        items: [
          "Fetches: 'send me the sale deed Ramesh shared last month' → the file, in seconds",
          "Schedules: 'set the CA meeting this week' → checked against your calendar, booked, confirmed",
          "Answers from your material: project status, references, what a document actually says",
        ],
      },
    ],
  },
  {
    id: "georef",
    accent: "#818cf8",
    eyebrow: "The Map",
    title: "India's plans, georeferenced by machine",
    intro:
      "The first system to place the country's Development and Regional Plans onto the earth they govern. Not scanned pictures — measurable, queryable geography you can drop a pin into.",
    groups: [
      {
        heading: "It reads the plan",
        items: [
          "Roads, rails and water lifted out of scanned plan ink into real geometry",
          "Zones, legends and hatching understood — the map knows what each colour means",
          "Village names, survey numbers and scale read off degraded, decades-old scans",
          "Every plan pinned to its true coordinates, so a location returns the law of that land",
        ],
      },
      {
        heading: "Trust you can see",
        items: [
          "Placements are verified against independent evidence on the ground before we trust them",
          "The plan-specific figures are measured from the plan, not assumed",
          "You judge it the way a professional would — the plan warped over live satellite, opacity in your hand",
        ],
      },
      {
        heading: "The layers on top",
        items: [
          "Cadastral parcels: your survey / gut / CTS number resolves to a polygon on the map",
          "Airport height-clearance funnels across the country",
          "Land-status overlays — forest, water bodies, mining, protected areas",
          "Circle rates joined to geography — the ready-reckoner value of where you're standing",
        ],
      },
    ],
  },
  {
    id: "potential",
    accent: "#93c5fd",
    eyebrow: "Building Potential",
    title: "The development code, wired end to end",
    intro:
      "Not a calculator — a chain. The regulation, the georeferenced map, the rates, the geometry and the money, connected so an answer flows from a pin to a P&L.",
    groups: [
      {
        heading: "The code, applied",
        items: [
          "The building regulations applied rule by rule — FSI, setbacks, height, coverage, parking, amenity, premiums",
          "No invented figures: every number is a literal from the regulation or flagged as derived, and the report cites the binding rule",
          "You ask in plain words; the regulation math stays exact, never left to a language model",
        ],
      },
      {
        heading: "Reads your plot, in place",
        items: [
          "Drop a pin: the zone, abutting road width and authority are read straight off the plan",
          "Charges and premium calculations use the actual circle rate of that plot, pulled for you",
          "The buildable envelope resolves into real floor plates — cores, lifts, stairs and shafts placed correctly",
          "A layout that respects the plan: unit mix and rooms packed to fit, not a generic template",
        ],
      },
      {
        heading: "The money and the filing",
        items: [
          "Statutory charges computed alongside the envelope — premiums, development charges, labour cess",
          "Development financials: three acquisition modes (purchase, redevelopment, JV), GDV, cost, profit, breakeven, sensitivity",
          "Building-permission assistant: cross-checks your case against the code and readies the authority's application before you file",
          "The submission is drafted from your project, for your review and sign-off",
        ],
      },
    ],
  },
  {
    id: "valuation",
    accent: "#6ee7b7",
    eyebrow: "Valuation",
    title: "A number that can defend itself",
    intro:
      "A co-pilot for Registered Valuers and anyone who needs a defensible figure — every input sourced, every approach reasoned, drafted to the professional format.",
    groups: [
      {
        heading: "Seven ways to value, one form",
        items: [
          "Land by market comparison · land + building · residual/development · reinstatement (insurance) · work-in-progress · income capitalisation · profit method",
          "The form adapts to the report type — only the fields that approach needs",
          "Comparable-sales grid with adjustment percentages and a weighted adopted rate",
        ],
      },
      {
        heading: "Inputs that fetch themselves",
        items: [
          "ASR / ready-reckoner rate pulled for the property's location",
          "Zone, road width and permissible FSI pulled from the Building Potential engine at your location",
          "Your documents — sanctioned plans, tax receipts — read in place, with confidence scores; nothing leaves your machine",
          "The signature cross-check: declared built-up area versus the permissible envelope — a discrepancy no manual valuation catches",
        ],
      },
      {
        heading: "A draft you can stand behind",
        items: [
          "IBBI-format report draft with the full evidence trail — the source of every field, on the record",
          "Warnings and exceptions flagged by the engine, not buried",
          "The final opinion, inspection and signature remain the valuer's — the engine does the assembly, you do the judgment",
        ],
      },
    ],
  },
  {
    id: "title",
    accent: "#d8b4fe",
    eyebrow: "Property Search",
    title: "Thirty years of paper. One click.",
    intro:
      "A title and developability due diligence engine: every government record of a property fetched, read and reconciled into one complete, objective report of where the title stands, with every finding traced to the evidence behind it.",
    groups: [
      {
        heading: "Both spines of Indian land records",
        items: [
          "Urban: City Survey (CTS) numbers, property cards, sanctioned context",
          "Rural: 7/12 extracts, mutation (ferfar) entries, 8A khata",
          "Your parcel located in our cadastral map — and verified against the live record",
        ],
      },
      {
        heading: "The fetch, industrialised",
        items: [
          "The engine plans the search: which sources, which years, which documents — scoped before you start",
          "Records gathered across registration, revenue, court and RERA sources",
          "Each record read, its names, areas and encumbrances pulled, and reconciled against the others",
        ],
      },
      {
        heading: "The report a lawyer starts from",
        items: [
          "Chain of title traced across decades — every devolution listed with its instrument",
          "Encumbrances, charges and litigation surfaced with sources",
          "Zoning and developability from our own map layer — no extra fetch, no captcha",
          "A red-flag panel that says what to verify and where — the engine produces evidence; the certifying opinion stays human",
        ],
      },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <PageShell
      eyebrow="Features"
      title="Five instruments. One conversation."
      intro="Everything below is live engineering — built, measured and running. Each mode of the chat is one of these instruments taking the seat."
    >
      <div className="space-y-20">
        {blocks.map((b) => (
          <section key={b.id} id={b.id} className="scroll-mt-28">
            <div
              className="text-[11px] font-semibold uppercase tracking-[0.28em]"
              style={{ color: b.accent }}
            >
              {b.eyebrow}
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              {b.title}
            </h2>
            <p className="mt-3 max-w-2xl text-muted">{b.intro}</p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {b.groups.map((g) => (
                <div
                  key={g.heading}
                  className="rounded-2xl border border-white/10 bg-card p-6"
                >
                  <h3 className="font-semibold">{g.heading}</h3>
                  <ul className="mt-3 space-y-2.5">
                    {g.items.map((it) => (
                      <li key={it} className="flex gap-2.5 text-sm text-muted">
                        <span className="mt-0.5 shrink-0" style={{ color: b.accent }}>
                          ✓
                        </span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
