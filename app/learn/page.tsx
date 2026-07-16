import PageShell from "@/components/PageShell";

export const metadata = { title: "Learn — ARC GENESIS" };

type Tutorial = {
  tag: string;
  accent: string;
  title: string;
  time: string;
  steps: { name: string; detail: string }[];
  note?: string;
};

const tutorials: Tutorial[] = [
  {
    tag: "Basics",
    accent: "#e2e8f0",
    title: "Locate any plot in India",
    time: "2 min",
    steps: [
      {
        name: "Give it a point",
        detail:
          "Paste a Google Maps link, type coordinates, or just type the survey / gut / CTS number with the village. Any one of these is enough.",
      },
      {
        name: "Watch the corroboration",
        detail:
          "The engine resolves your input against the georeferenced Development Plan, the cadastral parcel layer, or both — and shows you the plan raster warped over satellite so you can see the match with your own eyes.",
      },
      {
        name: "Confirm the parcel",
        detail:
          "Nudge the pin or pick the right parcel polygon if several match. From here every mode — potential, valuation, title — knows exactly which land you mean.",
      },
    ],
  },
  {
    tag: "ARC AI",
    accent: "#fbbf24",
    title: "Set up your assistant on WhatsApp (and everywhere else)",
    time: "3 min",
    steps: [
      {
        name: "Sign in once",
        detail: "One Google sign-in creates your ARC account and its memory.",
      },
      {
        name: "Link your channels",
        detail:
          "From your account page, generate a link code and send it to the assistant on WhatsApp, Telegram, Instagram — whichever chats you live in. Each channel now knows it's you.",
      },
      {
        name: "Feed it",
        detail:
          "Forward documents, links, notes — anything. It files them by project automatically. Tell it 'this is for the Kharadi project' when you want to be explicit.",
      },
      {
        name: "Ask for work",
        detail:
          "'Send me the sale deed from June.' 'Set a meeting with the CA this week.' 'What's pending on Kharadi?' — it fetches, schedules, and answers from your own files.",
      },
    ],
  },
  {
    tag: "Building Potential",
    accent: "#93c5fd",
    title: "Run a full site-potential report",
    time: "5 min",
    steps: [
      {
        name: "Locate and draw",
        detail:
          "Pin your plot, then trace its boundary on the plan overlay — or drop a DXF and let it place itself. Area, frontage and abutting road widths are read from the drawing.",
      },
      {
        name: "Let vision fill the context",
        detail:
          "'Assess this pin' reads the zone, road width and authority off the georeferenced plan. Everything stays editable — auto-fill is a head start, not a verdict.",
      },
      {
        name: "Choose the development route",
        detail:
          "Building, layout, group housing, township — the engine shows which routes your plot qualifies for and why.",
      },
      {
        name: "Compute",
        detail:
          "FSI, buildable area, setbacks, height, parking, premiums and charges — each figure carries the regulation that binds it. Pin what you want ('200 m² plate, 3 floors') and the engine tells you what's feasible and what rule stops you.",
      },
      {
        name: "Generate geometry and money",
        detail:
          "Ask for the floor plates and layout inside your envelope, then the financials — GDV, cost, profit, breakeven — priced at your plot's actual circle rate.",
      },
    ],
  },
  {
    tag: "Valuation",
    accent: "#6ee7b7",
    title: "Draft an IBBI-format valuation",
    time: "6 min",
    steps: [
      {
        name: "Pick the report type",
        detail:
          "Land by market, land + building, residual, reinstatement, work-in-progress, income or profit method — the form reshapes itself to the approach.",
      },
      {
        name: "Pull, don't type",
        detail:
          "ASR ↺ fetches the circle rate for the address. DP ↺ pulls zone, road and permissible FSI from the potential engine. 'AI read' extracts fields from a photographed document — with its confidence shown.",
      },
      {
        name: "Add comparables",
        detail:
          "Enter sale instances with adjustment percentages; the engine computes the adopted rate as a weighted mean you can override.",
      },
      {
        name: "Compute and inspect",
        detail:
          "The valuation lines appear with every warning the engine caught — including the declared-BUA vs permissible-FSI cross-check.",
      },
      {
        name: "Generate the draft",
        detail:
          "One click produces the IBBI-format report with the full evidence trail. You verify, you inspect, you sign — the engine assembled, you judged.",
      },
    ],
  },
  {
    tag: "Property Search",
    accent: "#d8b4fe",
    title: "Run a title search from one click",
    time: "8 min",
    steps: [
      {
        name: "Choose the spine",
        detail:
          "Urban (CTS / City Survey) or rural (7/12, mutation, 8A) — the identity fields adapt.",
      },
      {
        name: "Give it anything",
        detail:
          "Upload the documents you have — or just paste a survey number. The extractor identifies the property and builds the search plan: which portals, which years, how many captchas.",
      },
      {
        name: "Start the batched fetch",
        detail:
          "The engine works through registration, revenue, court and RERA sources, reading each record as it lands and reconciling it against the others.",
      },
      {
        name: "Read the report",
        detail:
          "Chain of title, encumbrances, litigation, parcel and zoning — with the red-flag panel telling you exactly what to verify at the SRO. Export and hand it to your lawyer for the opinion.",
      },
    ],
  },
  {
    tag: "BPMS",
    accent: "#93c5fd",
    title: "BPMS: from traced wizard to auto-submission",
    time: "10 min",
    steps: [
      {
        name: "Understand what the bot knows",
        detail:
          "The training bot has traced the state building-permission portal end to end — the New Project wizard's ~500 fields, its conditional branches, and all 31 document requirements. That map stays current as the portal changes.",
      },
      {
        name: "Connect your project",
        detail:
          "Point the bot at your potential report and project files. It maps your data onto the portal's fields — plot details, FSI computation, drawings, NOCs.",
      },
      {
        name: "Run the pre-submission cross-check",
        detail:
          "Before anything is filed, your case is validated against the development code by the same rules engine that computed your report. Discrepancies are flagged while they're still cheap to fix.",
      },
      {
        name: "Auto-fill and review",
        detail:
          "The submission bot walks the wizard and fills it from your project. Every page is presented for your review — nothing is submitted without your eyes and your sign-off.",
      },
      {
        name: "File",
        detail:
          "You press submit on a complete, code-checked application. Hours of form-filling become minutes of checking.",
      },
    ],
    note: "The BPMS bots ship inside the Building Potential product.",
  },
  {
    tag: "Reference",
    accent: "#e2e8f0",
    title: "The vocabulary, decoded",
    time: "3 min",
    steps: [
      {
        name: "Development Plan (DP) / Regional Plan (RP)",
        detail:
          "The statutory maps of what may be built where — zones, reservations, proposed roads. Our map layer is these plans, georeferenced.",
      },
      {
        name: "FSI / BUA",
        detail:
          "Floor Space Index — the ratio of buildable floor area to plot area. BUA is what it translates to on your plot, after the code's additions and deductions.",
      },
      {
        name: "7/12, CTS, mutation",
        detail:
          "The rural record of rights, the urban city-survey number, and the register of changes — the three documents most title questions begin with.",
      },
      {
        name: "ASR / ready reckoner / circle rate",
        detail:
          "The government's published minimum rates by location — the floor under valuation, stamp duty and our premium-FSI pricing.",
      },
      {
        name: "OLS funnel",
        detail:
          "Obstacle Limitation Surfaces — the aviation height limits around an airport. Near one, the sky's rule can bind before the city's does.",
      },
    ],
  },
];

export default function LearnPage() {
  return (
    <PageShell
      eyebrow="Learn"
      title="Tutorials for every instrument"
      intro="Short, honest walkthroughs — what to do, what the engine does in response, and where your judgment stays in the loop."
    >
      <div className="space-y-4">
        {tutorials.map((t) => (
          <details
            key={t.title}
            className="group rounded-2xl border border-white/10 bg-card transition-colors open:border-white/20 hover:border-white/20"
          >
            <summary className="cursor-pointer list-none p-6 [&::-webkit-details-marker]:hidden">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: t.accent }}
                  >
                    {t.tag} · {t.time}
                  </span>
                  <h3 className="mt-1.5 text-lg font-semibold">{t.title}</h3>
                </div>
                <span className="mt-1 shrink-0 text-muted transition-transform group-open:rotate-45">
                  +
                </span>
              </div>
            </summary>
            <div className="border-t border-white/10 px-6 py-5">
              <ol className="space-y-4">
                {t.steps.map((s, i) => (
                  <li key={s.name} className="flex gap-4">
                    <span
                      className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs font-semibold"
                      style={{ borderColor: `${t.accent}55`, color: t.accent }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <div className="text-sm font-semibold">{s.name}</div>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {s.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              {t.note && (
                <p className="mt-5 text-xs text-muted/80">{t.note}</p>
              )}
            </div>
          </details>
        ))}
      </div>
    </PageShell>
  );
}
