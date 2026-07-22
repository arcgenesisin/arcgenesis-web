import PageShell from "@/components/PageShell";

export const metadata = { title: "Features, ARC GENESIS" };

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
      "Everything you hand ARC AI stays with it, and it lives inside the chats you already use. Nothing to install, no new habit to pick up.",
    groups: [
      {
        heading: "Every chat window is a door",
        items: [
          "Reach it from WhatsApp, Instagram, Messenger, Telegram, X or email. Feed it there, or ask it there.",
          "Link it once and it recognises you on every channel, so your memory follows you across all of them.",
          "Send a document on WhatsApp and pull it up from the web weeks later. It's all one memory.",
        ],
      },
      {
        heading: "Living memory",
        items: [
          "Every document you send (deeds, plans, sanction letters, receipts) is filed on its own, under the project it belongs to.",
          "It learns how your projects are shaped, so a question like 'what's still pending on Kharadi?' gets answered from your own files.",
          "Links, notes and whole conversations stay findable later, in plain words rather than folders.",
          "It reads your calendar, adds to it, and nudges you before something slips.",
        ],
      },
      {
        heading: "It does the work",
        items: [
          "Ask it to fetch: 'send me the sale deed Ramesh shared last month' → the file, back in seconds.",
          "Ask it to schedule: 'set the CA meeting this week' → it checks your calendar, books it, confirms.",
          "Ask it about your own material and it answers from what you've loaded: project status, a reference, what a document actually says.",
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
      "We've placed the country's Development and Regional Plans onto the ground they actually govern. Not scans you squint at, but geography you can measure and drop a pin into.",
    groups: [
      {
        heading: "It reads the plan",
        items: [
          "It pulls the roads, rails and water out of the scanned ink and turns them into real geometry.",
          "It reads the legend, the zones and the hatching, so the map understands what every colour on a sheet means.",
          "It makes out village names, survey numbers and the printed scale even on scans that are decades old and half faded.",
          "Every plan is fixed to its true coordinates, so a location hands you back the law of that piece of land.",
        ],
      },
      {
        heading: "Trust you can see",
        items: [
          "A placement only stands once independent features on the ground agree with it. We never take the machine's word alone.",
          "The numbers that come off a plan are measured from that plan, never guessed.",
          "And you can check it yourself: the plan laid over live satellite, with the opacity slider in your hand.",
        ],
      },
      {
        heading: "The layers on top",
        items: [
          "Cadastral parcels, so your survey, gut or CTS number lands on an actual polygon.",
          "Airport height-clearance funnels for airports across the country.",
          "Land-status overlays for forest, water bodies, mining and protected areas.",
          "Circle rates tied to the map, so you see the ready-reckoner value of wherever you're standing.",
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
      "This isn't a calculator. The regulation, the map, the rates, the geometry and the money are wired together, so one pin turns into a full answer, all the way out to a P&L.",
    groups: [
      {
        heading: "The code, applied",
        items: [
          "The building regulations are applied rule by rule: FSI, setbacks, height, coverage, parking, amenity, premiums.",
          "Nothing is invented. Every figure is either straight from the regulation or clearly marked as derived, and the report cites the rule it rests on.",
          "You describe the plot in plain words. The regulation maths stays exact, and never gets handed to a language model to guess at.",
        ],
      },
      {
        heading: "Reads your plot, in place",
        items: [
          "Drop a pin and it reads the zone, the abutting road width and the authority straight off the plan.",
          "Charges and premium sums use that plot's actual circle rate, pulled in for you.",
          "The buildable envelope resolves into real floor plates, with cores, lifts, stairs and shafts sitting where they should.",
          "The layout respects the plan too: a unit mix and rooms packed to fit the site, not a template dropped on top.",
        ],
      },
      {
        heading: "The money and the filing",
        items: [
          "Statutory charges are worked out alongside the envelope: premiums, development charges, labour cess.",
          "A development P&L with three ways in (outright purchase, redevelopment, JV) and the numbers a lender asks for: GDV, cost, profit, breakeven, sensitivity.",
          "A building-permission assistant checks your case against the code and gets the authority's application ready before you file.",
          "The submission is drafted from your own project, then handed back for your review and sign-off.",
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
      "A co-pilot for Registered Valuers, and for anyone who needs a figure that holds up. Every input has a source, every approach has a reason, and it drafts to the format the profession expects.",
    groups: [
      {
        heading: "Seven ways to value, one form",
        items: [
          "Seven approaches in one place: market comparison, land plus building, residual or development, reinstatement for insurance, work-in-progress, income capitalisation, and the profit method.",
          "The form changes with the report type, showing only the fields that approach actually needs.",
          "A comparable-sales grid with your own adjustment percentages and a weighted rate at the end.",
        ],
      },
      {
        heading: "Inputs that fetch themselves",
        items: [
          "The ready-reckoner rate for the property's location, pulled in on its own.",
          "Zone, road width and permissible FSI drawn from the Building Potential engine at that location.",
          "Your documents (sanctioned plans, tax receipts) read right on your machine, with confidence scores, and nothing leaves it.",
          "The cross-check that matters: declared built-up area against the permissible envelope, a gap a manual valuation almost never catches.",
        ],
      },
      {
        heading: "A draft you can stand behind",
        items: [
          "An IBBI-format draft with the full evidence trail, so the source of every field is on the record.",
          "Warnings and exceptions the engine raises are shown, not tucked away.",
          "The opinion, the inspection and the signature stay yours. The engine assembles; you judge.",
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
      "A due-diligence engine for title and developability. It pulls every government record of a property, reads them, and reconciles them into one plain report of where the title stands, with each finding tied back to its evidence.",
    groups: [
      {
        heading: "Both spines of Indian land records",
        items: [
          "Urban records: City Survey (CTS) numbers, property cards, sanctioned context.",
          "Rural records: 7/12 extracts, mutation (ferfar) entries, 8A khata.",
          "Your parcel found on our cadastral map, then checked against the live record.",
        ],
      },
      {
        heading: "The fetch, industrialised",
        items: [
          "It plans the search first: which sources, which years, which document types, all scoped before you begin.",
          "Then it gathers records across registration, revenue, court and RERA sources.",
          "Each one is read, its names, areas and encumbrances pulled out, and reconciled against the rest.",
        ],
      },
      {
        heading: "The report a lawyer starts from",
        items: [
          "The chain of title traced across decades, with every devolution and its instrument listed.",
          "Encumbrances, charges and litigation brought to the surface, each with its source.",
          "Zoning and developability from our own map layer, with no extra fetch and no captcha.",
          "A panel of flags telling you what to verify and where. The engine gathers the evidence; the certifying opinion stays human.",
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
      intro="Everything below is real and running, not a roadmap. Each mode of the chat is one of these instruments taking the wheel."
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
