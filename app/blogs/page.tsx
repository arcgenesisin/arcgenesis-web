import PageShell from "@/components/PageShell";

export const metadata = { title: "Blogs — ARC GENESIS" };

type Post = {
  tag: string;
  accent: string;
  title: string;
  excerpt: string;
  body: string[];
};

// Public-facing notes. These describe WHAT we built and the principles behind
// it — not model architectures, training recipes, benchmark numbers or exact
// asset counts. Keep it that way: the direction of the work stays ours.

const posts: Post[] = [
  {
    tag: "Georeferencing",
    accent: "#818cf8",
    title: "Teaching a machine to read a scanned master plan",
    excerpt:
      "A Development Plan is ink on paper: road casings, dotted cadastral walls, colour washes, a legend. Getting a computer to see what a planner sees took a pipeline, not a prompt.",
    body: [
      "A Development Plan is not a picture to caption — it is a technical drawing with its own grammar: a legend that declares its language, casings, washes and hatches that each mean something specific. Reading one means honouring that grammar, plan family by plan family, rather than hoping a single prompt guesses right.",
      "The hard part is judgement: telling a real road from ink that merely looks like one, a true corridor from a label lying across it, a drawn feature from a scanned smudge. That is patient engineering, tuned against how these plans are actually drawn — not a model left to its own imagination.",
      "The bar we hold is human parity — a person can trace every road, plot and gully on these plans, so the machine must too. Every version is scored against plans a human traced by hand, and the number, not an impression, decides whether it ships.",
    ],
  },
  {
    tag: "Machine learning",
    accent: "#818cf8",
    title: "The model that knows where in India a plan belongs",
    excerpt:
      "Given an anonymous scanned plan, which few square kilometres of the country does it govern? We taught the system to recognise place — and then made it prove its answer.",
    body: [
      "The question sounds simple and isn't: hand the system an unlabelled scan and it narrows the country to a few square kilometres. It learns to recognise place from the plans we have already located, and carries that recognition to ground it has never seen.",
      "No single guess is trusted. Many signals across a plan are weighed together, so noise scatters and the true location stacks up — a plan speaks more confidently than any one fragment of it.",
      "And the learned answer only proposes. It is confirmed against hard evidence on the ground before we call a plan located. Recognition suggests; verification decides. That division of labour runs through everything we build.",
    ],
  },
  {
    tag: "Machine learning",
    accent: "#818cf8",
    title: "Reading a plan without hallucinating",
    excerpt:
      "No single model reads a plan. Specialised readers each do one job, and code that can't hallucinate checks their work.",
    body: [
      "Different parts of a plan need different eyes — the linework, the words, the colours, the place — so each is handled by a reader built for that one job, rather than one model asked to do everything and trusted to have done it.",
      "One lifts roads, rails and water out of the ink. One reads the printed names, numbers and scale that tie a drawing to the revenue record. One understands legends and zone colouring, so a residential wash isn't mistaken for a reservation. One places the plan in the country.",
      "Around them sits the discipline: nothing is accepted on a model's word alone. Every answer has to survive an independent check before it counts — because a confident mistake is worse than an honest 'not sure'.",
    ],
  },
  {
    tag: "Cadastre",
    accent: "#d8b4fe",
    title: "Bridging the survey number",
    excerpt:
      "The survey number is the true name of Indian land. We built the bridge between what a plan says and where a parcel actually is.",
    body: [
      "Maharashtra's digital cadastre gives a shape on the earth to millions of gut and CTS numbers. That corpus is the skeleton key: a survey number read off a plan resolves to a polygon; the polygon anchors the plan; the plan then governs every parcel inside it.",
      "The same bridge joins money to ground — circle rates are published against survey numbers, so valuation inherits geography for free.",
      "Outside Maharashtra, the standard portals serve raster pictures, not measurable parcels. Knowing exactly where that vector frontier runs is itself an asset — it tells us where the moat is deepest.",
    ],
  },
  {
    tag: "Data",
    accent: "#6ee7b7",
    title: "Reading the ready reckoner, everywhere",
    excerpt:
      "Every valuation stands on the government's own rate. We gathered it — state by state, portal by portal — into one queryable library.",
    body: [
      "The Annual Statement of Rates goes by many names — ready reckoner, circle rate, guidance value — and lives in as many portal designs as there are states. We gathered each, normalised the output, and unified it behind one national lookup: state, district, area, rate.",
      "The rates now sit in one schema, joined where possible to the cadastral layer, so a location resolves to its statutory value without a human opening a PDF.",
      "It's unglamorous work, and it is exactly the kind of unglamorous work that makes a one-click valuation possible.",
    ],
  },
  {
    tag: "Regulation",
    accent: "#93c5fd",
    title: "Turning the building code into software",
    excerpt:
      "The development regulations are a book of interlocking rules. We built them into software with one law: no invented figures.",
    body: [
      "Every number the engine produces is either a literal from the regulation, a value derived from one (marked with the rule it derives from), or a flagged assumption under review. It will tell you the binding rule for every figure — because a feasibility number you can't defend is worthless.",
      "You ask in plain words; the arithmetic of the regulation stays exact and testable, never improvised by a language model. The words are the interface; the maths is the engine.",
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
      "First it works out which apartment mixes can honestly fill the permitted area. Then it lays out real floor plates, placing living spaces, wet areas and circulation with the constraints a working architect carries in their head: cores segregated, bathroom shafts shared, every unit reaching light.",
      "The 2D plan, the DXF export and the 3D massing are one and the same object drawn three ways — so nothing drifts between the drawing you read and the model you rotate.",
      "Every generated layout is checked against the rules that produced it. Geometry that can't prove itself doesn't ship.",
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
      "Statutory charges are computed alongside the envelope: premiums for extra FSI at the plot's actual circle rate, development charges, cess. Sale realisations default from the rate layer with every assumption flagged for override.",
      "Out the other end: gross development value, cost to complete, profit, breakeven and sensitivity — the sheet a lender or partner actually asks for, generated from the same pin on the map.",
    ],
  },
  {
    tag: "Documents",
    accent: "#6ee7b7",
    title: "From RERA PDFs to measurable drawings",
    excerpt:
      "Approved project plans, reconstructed as true-to-dimension drawings — and used to audit our own regulation engine both ways.",
    body: [
      "RERA filings contain the real, sanctioned drawings of Indian buildings. We reconstruct them into vector drawings that are true to measurement, and read them up into 3D models.",
      "That library cuts both ways: it checks whether real approved buildings sit inside the envelopes our engine computes, and whether our engine reproduces what authorities actually sanction.",
      "It also teaches the next generation of our tools to read blueprints natively — the sanctioned record becomes the teacher.",
    ],
  },
  {
    tag: "Layers",
    accent: "#818cf8",
    title: "The sky has rules too",
    excerpt:
      "Height near an airport isn't a matter of FSI — it's a matter of aviation law. So the map carries the funnels.",
    body: [
      "Using the international obstacle-limitation standard, we generated height-clearance surfaces for airports across India — approach funnels, horizontal and conical surfaces — as map layers with a per-pin readout.",
      "Drop a pin and the report says not only what the development code allows, but what the sky allows above it — conservative screening that tells you when the aviation authority's clearance is the binding constraint.",
      "Alongside it: map layers of the silent no-go land — forest, water bodies, mining, protected areas — loaded on demand, the kind that kills a project late when nobody checked early.",
    ],
  },
  {
    tag: "Title",
    accent: "#d8b4fe",
    title: "One click, thirty years of paper",
    excerpt:
      "Title search is a scavenger hunt across portals that were never meant to talk to each other. We industrialised it.",
    body: [
      "The engine starts from whatever you have — a survey number, an address, a stack of scanned documents — works out the property's identity, and plans the search: which registries, which years, which record types, scoped before you begin.",
      "Records are gathered across registration, revenue, court and RERA sources, then read and reconciled against each other: does the mutation chain agree with the deeds? Does the area on the 7/12 match the sale?",
      "The output is the report a lawyer starts from — chain of title, encumbrances, litigation, zoning — with a panel that says exactly what to verify. The certifying opinion stays human, as it should.",
    ],
  },
  {
    tag: "ARC AI",
    accent: "#fbbf24",
    title: "ARC AI lives where you already talk",
    excerpt:
      "The best interface is the chat you already have open. ARC AI is one memory behind every messaging window you use.",
    body: [
      "Send it a deed on WhatsApp today and ask for it from the web next month — one identity, one memory, every channel. Documents file themselves under the projects they belong to; links, notes and conversations stay retrievable in plain language.",
      "It acts, too: scheduling against your real calendar, fetching what you ask for, answering project questions from the files you've actually loaded — not from the internet's imagination.",
      "There is no app to install. That is the point. ARC AI comes to where your life already happens.",
    ],
  },
  {
    tag: "Automation",
    accent: "#93c5fd",
    title: "Filing permissions while you sleep",
    excerpt:
      "The state building-permission portal is a wizard of hundreds of fields and dozens of documents. We taught a bot to walk it.",
    body: [
      "First it learns the portal: the New Project wizard mapped end to end — every field, every conditional branch, every document slot — into a knowledge base that stays current.",
      "Then it cross-checks: before anything is filed, your case is validated against the development code by the same engine that computes your potential report, so the application and the regulation agree before a clerk ever sees them.",
      "Finally it drafts the submission from your project's own data, attaches the document set, and stops for your review and signature. Hours of form-filling become minutes of checking.",
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
