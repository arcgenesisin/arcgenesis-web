// The four realities of the one conversation.
// Everything mode-specific (color universe, particle formation id, sample
// exchange) hangs off this file.

export type ModeId = "assistant" | "site" | "value" | "title";

export type Mode = {
  id: ModeId;
  label: string;
  tag: string;
  // particle + accent color
  color: [number, number, number];
  // hero base background (transitions between modes)
  bgBase: string;
  // radial glow color (rgba string)
  glow: string;
  // the constant conversation, re-lit by each reality
  user: string;
  reply: string;
};

export const MODES: Mode[] = [
  {
    id: "assistant",
    label: "Assistant",
    tag: "Everything you've ever sent it, remembered",
    color: [245, 166, 90],
    bgBase: "#0d0905",
    glow: "rgba(245,166,90,0.16)",
    user: "Where's the sale deed Ramesh sent me last month?",
    reply:
      "Found it — WhatsApp, 14 June. Filed under your Kharadi project, next to the 7/12 extract. Want the summary?",
  },
  {
    id: "site",
    label: "Site Potential",
    tag: "The buildable truth of any plot",
    color: [99, 102, 241],
    bgBase: "#05060c",
    glow: "rgba(99,102,241,0.18)",
    user: "What can I build on that plot?",
    reply:
      "R2 zone on a 12 m road. Permissible FSI 1.65 — about 3,040 m² buildable. Generating the envelope now…",
  },
  {
    id: "value",
    label: "Valuation",
    tag: "A number that can defend itself",
    color: [52, 211, 153],
    bgBase: "#04100a",
    glow: "rgba(52,211,153,0.14)",
    user: "And what is it worth with that potential?",
    reply:
      "ASR ₹48,700/m² for the location. Against the permissible 3,040 m² — market value ≈ ₹3.1 Cr. Draft report ready.",
  },
  {
    id: "title",
    label: "Title Search",
    tag: "Thirty years of paper, read",
    color: [192, 132, 252],
    bgBase: "#0b0612",
    glow: "rgba(192,132,252,0.15)",
    user: "Is the title clean?",
    reply:
      "30-year chain traced — clean. One mortgage, released 2019. Two entries to verify at the SRO; both flagged in the report.",
  },
];

export const MODE_INDEX: Record<ModeId, Mode> = Object.fromEntries(
  MODES.map((m) => [m.id, m]),
) as Record<ModeId, Mode>;
