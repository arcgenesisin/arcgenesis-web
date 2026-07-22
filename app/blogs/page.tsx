import PageShell from "@/components/PageShell";

export const metadata = { title: "Blogs, ARC GENESIS" };

type Post = {
  tag: string;
  accent: string;
  title: string;
  excerpt: string;
  body: string[];
};

// Public-facing notes. They describe WHAT we built and the thinking behind it,
// never model architectures, training recipes, benchmark numbers or exact asset
// counts. Keep it that way: the direction of the work stays ours.

const posts: Post[] = [
  {
    tag: "Georeferencing",
    accent: "#818cf8",
    title: "Teaching a machine to read a scanned master plan",
    excerpt:
      "A Development Plan is ink on paper: road casings, dotted cadastral walls, colour washes, a legend. Getting a computer to see what a planner sees took a pipeline, not a prompt.",
    body: [
      "A Development Plan isn't a picture you can caption. It's a technical drawing with its own grammar: a legend that tells you its language, and casings, washes and hatches that each carry a precise meaning. Reading one means honouring that grammar, plan family by plan family, instead of hoping a single prompt guesses right.",
      "The hard part is judgement. Telling a real road from ink that only looks like one. A true corridor from a label lying across it. A feature from a smudge the scanner left behind. That's patient engineering, tuned against how these plans are actually drawn, not a model left to its own imagination.",
      "Our bar is human parity. A person can trace every road, plot and gully on these sheets, so the machine has to as well. Every version is scored against plans a human traced by hand, and the number decides whether it ships. An impression never does.",
    ],
  },
  {
    tag: "Machine learning",
    accent: "#818cf8",
    title: "The model that knows where in India a plan belongs",
    excerpt:
      "Given an anonymous scanned plan, which few square kilometres of the country does it govern? We taught the system to recognise place, then made it prove its answer.",
    body: [
      "It sounds simple and isn't. Hand the system an unlabelled scan and it narrows the country down to a few square kilometres. It learns to recognise place from the plans we've already located, then carries that sense to ground it has never seen.",
      "No single guess is trusted. Signals from all over a plan are weighed together, so the noise cancels out and the real location adds up. A whole plan speaks far more confidently than any one corner of it.",
      "Even then, the learned answer only proposes. It has to be confirmed against hard evidence on the ground before we'll call a plan located. Recognition suggests; verification decides. That split runs through everything we build.",
    ],
  },
  {
    tag: "Machine learning",
    accent: "#818cf8",
    title: "Reading a plan without hallucinating",
    excerpt:
      "No single model reads a plan. Specialised readers each do one job, and code that can't hallucinate checks their work.",
    body: [
      "Different parts of a plan want different eyes: the linework, the words, the colours, the location. So each gets a reader built for that one job, rather than one model asked to do all of it and trusted to have got it right.",
      "One lifts roads, rails and water out of the ink. One reads the printed names, numbers and scale that tie a drawing to the revenue record. One understands legends and zone colouring, so a residential wash never gets mistaken for a reservation. And one places the plan in the country.",
      "Around all of them sits the discipline. Nothing is accepted on a model's word alone; every answer has to survive an independent check first. A confident mistake is worse than an honest 'not sure'.",
    ],
  },
  {
    tag: "Cadastre",
    accent: "#d8b4fe",
    title: "Bridging the survey number",
    excerpt:
      "The survey number is the true name of Indian land. We built the bridge between what a plan says and where a parcel actually is.",
    body: [
      "Maharashtra's digital cadastre gives millions of gut and CTS numbers a real shape on the earth. That's the skeleton key. A survey number read off a plan resolves to a polygon, the polygon anchors the plan, and the plan then governs every parcel inside it.",
      "The same bridge ties money to the ground. Circle rates are published against survey numbers, so a valuation inherits its geography for free.",
      "Step outside Maharashtra and the usual portals hand you raster pictures, not parcels you can measure. Knowing exactly where that vector frontier runs is an asset in itself. It tells us where our lead is widest.",
    ],
  },
  {
    tag: "Data",
    accent: "#6ee7b7",
    title: "Reading the ready reckoner, everywhere",
    excerpt:
      "Every valuation stands on the government's own rate. We gathered it, state by state, portal by portal, into one library you can query.",
    body: [
      "The Annual Statement of Rates goes by a dozen names, ready reckoner, circle rate, guidance value, and it lives in as many portal designs as there are states. We gathered each one, cleaned it up, and put it behind a single national lookup: state, district, area, rate.",
      "The rates now sit in one schema, joined to the cadastral layer wherever they can be, so a location resolves to its statutory value without anyone opening a PDF.",
      "It's unglamorous work. It's also exactly the kind of unglamorous work that makes a one-click valuation possible.",
    ],
  },
  {
    tag: "Regulation",
    accent: "#93c5fd",
    title: "Turning the building code into software",
    excerpt:
      "The development regulations are a book of interlocking rules. We built them into software with one law: no invented figures.",
    body: [
      "Every number the engine gives you is one of three things: a value straight from the regulation, a value derived from one (and tagged with the rule it came from), or an assumption we've flagged for review. Ask it for the binding rule behind any figure and it will tell you, because a feasibility number you can't defend is worth nothing.",
      "You ask in plain words. The arithmetic of the regulation stays exact and testable, and it's never improvised by a language model. The words are the interface; the maths is the engine.",
      "The result feels less like a chatbot and more like a senior planner who never misremembers a clause.",
    ],
  },
  {
    tag: "Geometry",
    accent: "#93c5fd",
    title: "Generating the floor plate",
    excerpt:
      "An envelope tells you how much you may build. The generator shows you what that actually looks like: cores, shafts, units, plates.",
    body: [
      "First it works out which apartment mixes can honestly fill the area you're allowed. Then it lays out real floor plates, placing living spaces, wet areas and circulation with the same constraints a working architect keeps in their head: cores kept apart, bathroom shafts shared, every unit reaching daylight.",
      "The 2D plan, the DXF export and the 3D massing are all the same object drawn three ways, so nothing drifts between the drawing you read and the model you spin around.",
      "Every layout it generates is checked back against the rules that produced it. Geometry that can't prove itself doesn't ship.",
    ],
  },
  {
    tag: "Finance",
    accent: "#6ee7b7",
    title: "The money layer",
    excerpt:
      "Potential without price is trivia. The financial model turns an envelope into a development decision.",
    body: [
      "There are three ways in (outright purchase, redevelopment, joint venture), each with its own cost structure, and rehab obligations counted inside the buildable area exactly where the law puts them.",
      "Statutory charges are worked out alongside the envelope: premiums for extra FSI at the plot's real circle rate, development charges, cess. Sale realisations default from the rate layer, with every assumption flagged so you can override it.",
      "Out the far end comes the sheet a lender or partner actually asks for: gross development value, cost to complete, profit, breakeven and sensitivity, all from the same pin on the map.",
    ],
  },
  {
    tag: "Documents",
    accent: "#6ee7b7",
    title: "From RERA PDFs to measurable drawings",
    excerpt:
      "Approved project plans, rebuilt as true-to-dimension drawings, and used to audit our own regulation engine both ways.",
    body: [
      "RERA filings hold the real, sanctioned drawings of Indian buildings. We rebuild them into vector drawings that are true to measurement, and read them up into 3D models.",
      "That library cuts both ways. It checks whether real approved buildings sit inside the envelopes our engine computes, and whether our engine reproduces what authorities actually sanction.",
      "It teaches the next generation of our tools to read blueprints natively, too. The sanctioned record becomes the teacher.",
    ],
  },
  {
    tag: "Layers",
    accent: "#818cf8",
    title: "The sky has rules too",
    excerpt:
      "Height near an airport isn't a question of FSI. It's a question of aviation law. So the map carries the funnels.",
    body: [
      "Using the international obstacle-limitation standard, we built the height-clearance surfaces around airports across India (approach funnels, horizontal and conical surfaces) and laid them on the map with a per-pin readout.",
      "Drop a pin and the report tells you not just what the development code allows, but what the sky allows above it. It's conservative screening, the kind that warns you when the aviation authority's clearance is the constraint that actually binds.",
      "Sitting alongside it are the silent no-go layers (forest, water, mining, protected land), loaded on demand. Those are the ones that kill a project late, when nobody thought to check early.",
    ],
  },
  {
    tag: "Title",
    accent: "#d8b4fe",
    title: "One click, thirty years of paper",
    excerpt:
      "Title search is a scavenger hunt across portals that were never meant to talk to each other. We industrialised it.",
    body: [
      "The engine starts with whatever you've got (a survey number, an address, a pile of scanned documents) and works out the property's identity. Then it plans the search: which registries, which years, which record types, all scoped before you begin.",
      "Records are gathered across registration, revenue, court and RERA sources, then read and reconciled against one another. Does the mutation chain agree with the deeds? Does the area on the 7/12 match the sale?",
      "What comes out is the report a lawyer starts from: chain of title, encumbrances, litigation, zoning, with a panel that spells out exactly what to verify. The certifying opinion stays human, as it should.",
    ],
  },
  {
    tag: "ARC AI",
    accent: "#fbbf24",
    title: "ARC AI lives where you already talk",
    excerpt:
      "The best interface is the chat you already have open. ARC AI is one memory behind every messaging window you use.",
    body: [
      "Send it a deed on WhatsApp today and ask for it from the web next month. One identity, one memory, every channel. Documents file themselves under the projects they belong to, and links, notes and conversations stay retrievable in plain language.",
      "It acts, as well. It schedules against your real calendar, fetches what you ask for, and answers questions about your projects from the files you've actually loaded, not from the internet's imagination.",
      "There's no app to install, and that's the point. ARC AI comes to where your life already happens.",
    ],
  },
  {
    tag: "Automation",
    accent: "#93c5fd",
    title: "Filing permissions while you sleep",
    excerpt:
      "The state building-permission portal is a wizard of hundreds of fields and dozens of documents. We taught a bot to walk it.",
    body: [
      "First it learns the portal, mapping the New Project wizard end to end (every field, every conditional branch, every document slot) into a knowledge base that stays current.",
      "Then it cross-checks. Before anything is filed, your case is validated against the development code by the same engine that computed your potential report, so the application and the regulation agree before a clerk ever sees them.",
      "Finally it drafts the submission from your project's own data, attaches the documents, and stops for your review and signature. Hours of form-filling turn into minutes of checking.",
    ],
  },
  {
    tag: "Craft",
    accent: "#6ee7b7",
    title: "How we work: numbers over impressions",
    excerpt:
      "The habits behind everything above. They don't demo well, but they decide whether any of it is true.",
    body: [
      "Every iteration reports what changed, what the last version got wrong, and the measured result, before the next one starts. When a hypothesis fails twice, we stop guessing and go trace the actual object that's misbehaving.",
      "Where humans judge with their eyes, so do we. Georeferencing is reviewed as the warped plan laid over satellite imagery, because a metric can be gamed and a picture can't. Coverage claims that turned out hollow were retracted, publicly, in our own logs.",
      "Every lesson ends up in the code and in a written record. What you get is a system whose claims we can defend line by line, and that's the only kind worth building on.",
    ],
  },
];

export default function BlogsPage() {
  return (
    <PageShell
      eyebrow="Blogs"
      title="Notes from the workshop"
      intro="The width and depth of what ARC GENESIS has actually built: georeferencing, machine learning, regulation, geometry, money, paper. Open any note; each is a true story from the record."
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
