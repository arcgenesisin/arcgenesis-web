import PageShell from "@/components/PageShell";

export const metadata = { title: "Blogs — ARC GENESIS" };

type Post = {
  tag: string;
  accent: string;
  title: string;
  excerpt: string;
  body: string[];
};

const posts: Post[] = [
  {
    tag: "Georeferencing",
    accent: "#818cf8",
    title: "Teaching a machine to read a scanned master plan",
    excerpt:
      "A Development Plan is ink on paper: road casings, dotted cadastral walls, colour washes, a legend. Getting a computer to see what a planner sees took a pipeline, not a prompt.",
    body: [
      "Our rule from day one: the legend comes first. Before anything is extracted, the system reads the plan's own legend table — because every plan family draws roads, zones and reservations differently, and the legend is the plan telling you its language.",
      "Roads are found as geometry, not colour: constant-width light channels running between ink casings. Text that severs a corridor is detected and the space handed back before the centreline is traced. Squiggles that survive every raster filter die at the vector stage, where a road's straightness betrays a scribble every time.",
      "The bar we hold is human parity — a person can trace every road, plot and gully on these plans, so the machine must too. Every version of the extractor is scored against plans a human traced by hand, and the number, not an impression, decides whether it shipped.",
    ],
  },
  {
    tag: "Machine learning",
    accent: "#818cf8",
    title: "The model that knows where in India a plan belongs",
    excerpt:
      "Given an anonymous scanned plan, which few square kilometres of the country does it govern? Eight hand-built matchers saturated. So we taught a network to recognise place.",
    body: [
      "The insight: every tile of an already-georeferenced plan is a free training pair — the drawing, and the OpenStreetMap geometry of the same ground. Seven thousand such tiles trained a twin-tower embedding (a DINOv2 backbone with two projection heads) that pulls a drawing and its map to the same point in vector space.",
      "One tile alone locates itself about a third of the time. But a whole plan's tiles vote — noise scatters, truth stacks. On districts the model had never seen, 96% of held-out plans located to the correct cell, and every plan with ten or more tiles found home.",
      "The learned lock only proposes. Deterministic geometry — road consensus, river agreement, rail corroboration — still decides. That division of labour, AI proposes and geometry disposes, runs through everything we build.",
    ],
  },
  {
    tag: "Machine learning",
    accent: "#818cf8",
    title: "Four models, one map",
    excerpt:
      "No single network reads a plan. The map layer is an ensemble of four, each with one job, each checked by code that doesn't hallucinate.",
    body: [
      "One: a segmentation model (SegFormer) extracts roads, rails and water from scan ink — trained without a single hand-drawn label, using OSM geometry projected through our own georeferenced tiles as automatic ground truth.",
      "Two: the coarse locator, which answers 'where in India is this?'. Three: a local vision-language model that reads village names, survey numbers and printed scales off degraded scans — the identifiers that tie a drawing to the revenue record. Four: a plan-reader that understands legends and zone colouring, so the map knows a residential wash from a reservation hatch.",
      "Around them sits the discipline: a placement is only accepted when two independent feature families agree, because a wrong transform can satisfy roads or a river — but almost never both.",
    ],
  },
  {
    tag: "Cadastre",
    accent: "#d8b4fe",
    title: "Bridging 12.67 million parcels",
    excerpt:
      "The survey number is the true name of Indian land. We built the bridge between what a plan says and where a parcel actually is.",
    body: [
      "Maharashtra's digital cadastre gave us 12.67 million georeferenced plot polygons — every gut and CTS number with a shape on the earth. That corpus is the skeleton key: a survey number printed on a plan, read by our vision model, resolves to a polygon; the polygon anchors the plan; the plan then governs every parcel inside it.",
      "The same bridge joins money to ground — circle rates are published against survey numbers, so valuation inherits geography for free.",
      "We then probed every other state: outside Maharashtra, the standard portals serve raster pictures, not vector parcels. Knowing exactly where the vector frontier runs is itself an asset — it tells us where the moat is deepest.",
    ],
  },
  {
    tag: "Data",
    accent: "#6ee7b7",
    title: "Reading the ready reckoner, everywhere",
    excerpt:
      "Every valuation stands on the government's own rate. We crawled it — state by state, portal by portal — into one queryable library.",
    body: [
      "The Annual Statement of Rates goes by many names — ready reckoner, circle rate, guidance value — and lives in as many portal designs as there are states. We built crawlers for each family, normalised the output, and unified it behind one national lookup: state, district, area, rate.",
      "Hundreds of thousands of rate rows now sit in one schema, joined where possible to the cadastral layer, so a location resolves to its statutory value without a human opening a PDF.",
      "It's unglamorous work, and it is exactly the kind of unglamorous work that makes a one-click valuation possible.",
    ],
  },
  {
    tag: "Regulation",
    accent: "#93c5fd",
    title: "Turning the building code into software",
    excerpt:
      "The development regulations are a book of interlocking rules. We codified them with one law: no invented figures.",
    body: [
      "Every rule in our engine is either a literal from the regulation, a value derived from one (marked with the regulation it derives from), or a flagged heuristic under review. The engine will tell you the binding rule for every number it outputs — because a feasibility figure you can't defend is worthless.",
      "The language model's role is deliberately small: translate a user's plain words into the engine's structured inputs. All regulation math is deterministic code, reconciled against a frozen oracle build before any rule change ships.",
      "The result behaves less like a chatbot and more like a senior planner who never misremembers a clause.",
    ],
  },
  {
    tag: "Geometry",
    accent: "#93c5fd",
    title: "Generating the floor plate",
    excerpt:
      "An envelope tells you how much you may build. The generator tells you what that actually looks like — cores, shafts, units, plates.",
    body: [
      "Stage one enumerates unit mixes: which combinations of apartments can honestly fill the permitted area. Stage two packs rooms into real floor plates — a band-wrap packer that places living spaces, wet areas and circulation with the constraints a working architect carries in their head: cores segregated, bathroom shafts shared, every unit reaching light.",
      "Behind it sits our geometry model — envelope, corridor, core, wall and opening as one canonical graph, so the 2D plan, the DXF export and the 3D massing are the same object drawn three ways.",
      "Headless verification checks every generated layout against the rules that produced it. Geometry that can't prove itself doesn't ship.",
    ],
  },
  {
    tag: "Finance",
    accent: "#6ee7b7",
    title: "The money layer",
    excerpt:
      "Potential without price is trivia. The financial model turns an envelope into a development decision.",
    body: [
      "Three acquisition modes — outright purchase, redevelopment, joint venture — each with its own cost structure and rehab obligations counted inside the buildable area where the law puts them.",
      "Statutory charges are computed alongside the envelope: premiums for extra FSI at the plot's actual circle rate, development charges, cess. Sale realisations default from the ASR layer with every assumption flagged for override.",
      "Out the other end: gross development value, cost to complete, profit, breakeven and sensitivity — the sheet a lender or partner actually asks for, generated from the same pin on the map.",
    ],
  },
  {
    tag: "Documents",
    accent: "#6ee7b7",
    title: "From RERA PDFs to measurable drawings",
    excerpt:
      "Hundreds of approved project plans, reconstructed as true-to-dimension DXF — and used to audit our own regulation engine both ways.",
    body: [
      "RERA filings contain the real, sanctioned drawings of Indian buildings. We extracted them into vector DXF that is true to measurement — 687 plans reconstructed exactly — and built an interpreter that segments a sheet into floors, finds walls as parallel ink pairs, and stacks the floors into a 3D model.",
      "That corpus cuts both ways: it checks whether real approved buildings sit inside the envelopes our engine computes, and whether our engine reproduces what authorities actually sanction.",
      "It also became training data — thousands of drawing-text pairs staged for a local plan-reading model, so the next generation reads blueprints natively.",
    ],
  },
  {
    tag: "Layers",
    accent: "#818cf8",
    title: "The sky has rules too",
    excerpt:
      "Height near an airport isn't a matter of FSI — it's a matter of aviation law. So the map carries the funnels.",
    body: [
      "Using the ICAO obstacle-limitation geometry, we generated height-clearance surfaces for 224 airports across India — approach funnels, inner horizontal surfaces, conical surfaces — as map layers with a per-pin readout.",
      "Drop a pin and the report says not only what the development code allows, but what the sky allows above it — conservative screening that tells you when the aviation authority's own clearance is the binding constraint.",
      "Alongside it: 927,000 polygons of forests, water bodies, mining and protected land, loaded on demand — the silent no-go layers that kill projects late when nobody checked early.",
    ],
  },
  {
    tag: "Title",
    accent: "#d8b4fe",
    title: "One click, thirty years of paper",
    excerpt:
      "Title search is a scavenger hunt across portals that were never meant to talk to each other. We industrialised it.",
    body: [
      "The engine starts from whatever you have — a survey number, an address, a stack of scanned documents — extracts the property's identity, and builds a search plan: which registries, which years, which record types, and what the captcha budget will be before you begin.",
      "Fetches run batched across registration, revenue, court and RERA sources. A local vision model reads each record and reconciles them: does the mutation chain agree with the deeds? Does the area on the 7/12 match the sale?",
      "The output is the report a lawyer starts from — chain of title, encumbrances, litigation, zoning — with a red-flag panel that says exactly what to verify. The certifying opinion stays human, as it should.",
    ],
  },
  {
    tag: "ARC AI",
    accent: "#fbbf24",
    title: "An assistant that lives where you already talk",
    excerpt:
      "The best interface is the chat you already have open. ARC AI is one memory behind every messaging window you use.",
    body: [
      "Send it a deed on WhatsApp today and ask for it from the web next month — one identity, one memory, every channel. Documents file themselves under the projects they belong to; links, notes and conversations stay retrievable in plain language.",
      "It acts, too: scheduling against your real calendar, fetching what you ask for, answering project questions from the files you've actually loaded — not from the internet's imagination.",
      "There is no app to install. That is the point. The assistant comes to where your life already happens.",
    ],
  },
  {
    tag: "Automation",
    accent: "#93c5fd",
    title: "Filing permissions while you sleep",
    excerpt:
      "The state building-permission portal is a ~500-field wizard demanding 31 documents. We taught a bot to walk it.",
    body: [
      "First, tracing: the training bot mapped the portal's New Project wizard end to end — every field, every conditional branch, every document slot — into a knowledge base that stays current.",
      "Then, the cross-check: before anything is filed, your case is validated against the development code by the same engine that computes your potential report, so the application and the regulation agree before a clerk ever sees them.",
      "Finally, submission: the bot fills the wizard from your project's own data, attaches the document set, and stops for your review and signature. Hours of form-filling become minutes of checking.",
    ],
  },
  {
    tag: "Craft",
    accent: "#6ee7b7",
    title: "How we work: numbers over impressions",
    excerpt:
      "The habits behind everything above — the ones that don't demo well but decide whether any of it is true.",
    body: [
      "Every iteration reports what changed, what the previous version got wrong, and the measured result — before the next version begins. When a hypothesis fails twice, we stop and trace the actual offending object instead of guessing again.",
      "Acceptance is visual where humans judge visually: georeferencing is reviewed as the warped plan over satellite imagery, because metrics can be gamed and pictures can't. Coverage claims that turned out hollow were retracted, publicly, in our own logs.",
      "Every lesson is distilled into code and a written record. The result is a system whose claims we can defend line by line — which is the only kind worth building on.",
    ],
  },
];

export default function BlogsPage() {
  return (
    <PageShell
      eyebrow="Blogs"
      title="Notes from the workshop"
      intro="The width and depth of what ARC GENESIS actually built — georeferencing, machine learning, regulation, geometry, money, paper. Open any note; each is a true story from the record."
    >
      <div className="space-y-4">
        {posts.map((p) => (
          <details
            key={p.title}
            className="group rounded-2xl border border-white/10 bg-card transition-colors open:border-white/20 hover:border-white/20"
          >
            <summary className="cursor-pointer list-none p-6 [&::-webkit-details-marker]:hidden">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: p.accent }}
                  >
                    {p.tag}
                  </span>
                  <h3 className="mt-1.5 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted">{p.excerpt}</p>
                </div>
                <span className="mt-1 shrink-0 text-muted transition-transform group-open:rotate-45">
                  +
                </span>
              </div>
            </summary>
            <div className="space-y-4 border-t border-white/10 px-6 py-5">
              {p.body.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-muted">
                  {para}
                </p>
              ))}
            </div>
          </details>
        ))}
      </div>
    </PageShell>
  );
}
