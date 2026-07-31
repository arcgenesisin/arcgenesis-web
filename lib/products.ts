export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  points: string[];
  accent: string; // tailwind gradient stops
  glyph: string;
  href: string; // interface route
};

// The four modes of the one conversation (engines mirror the products in our DB).
export const products: Product[] = [
  {
    id: "assistant",
    name: "ARC AI",
    tagline: "Your memory, across every platform.",
    description:
      "Docs, links, chats and your calendar, all remembered. ARC AI files everything you send it on WhatsApp, on the web, wherever you are, so anything you have ever shared is one question away.",
    points: [
      "Every document you send, remembered and filed",
      "Works across WhatsApp, web and more",
      "Your calendar, links and notes in one place",
    ],
    accent: "from-amber-500 to-orange-500",
    glyph: "◍",
    href: "/login",
  },
  {
    id: "site-potential",
    name: "Site Potential Engine",
    tagline: "How much can this land actually build?",
    description:
      "Draw a plot on the DP overlay, tell us the development you intend, and read back its permissible FSI, buildable-up area, road and zone context and applicable charges, straight from the plan and the regulation.",
    points: [
      "Zone + road width read from the DP plan",
      "Permissible FSI / BUA under UDCPR",
      "Charges, reservations and setbacks",
    ],
    accent: "from-indigo-500 to-blue-500",
    glyph: "▚",
    href: "/engines/site-potential",
  },
  {
    id: "valuation",
    name: "Valuation Report Engine",
    tagline: "A defensible number, not a guess.",
    description:
      "Feed the documents; we extract them locally, cross-check the declared built-up area against the permissible FSI, apply ASR/ready-reckoner rates for the location, and produce a valuation a Registered Valuer can stand behind.",
    points: [
      "Local document extraction",
      "Declared BUA vs permissible-FSI cross-check",
      "ASR / ready-reckoner rate wiring",
    ],
    accent: "from-emerald-500 to-teal-500",
    glyph: "⚖",
    href: "/engines/valuation",
  },
  {
    id: "property-search",
    name: "Property Search Engine",
    tagline: "Know the title before you commit.",
    description:
      "Urban CTS and rural 7/12 spines, cadastral parcel lookup, red-flag detection and a search plan: a full title and developability check on any parcel in the state.",
    points: [
      "Urban CTS + rural 7/12 lookup",
      "Cadastral parcel match + verify",
      "Red-flag detection & search plan",
    ],
    accent: "from-fuchsia-500 to-purple-500",
    glyph: "⌖",
    href: "/engines/property-search",
  },
];
