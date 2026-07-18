"use client";

import Scene from "./Scene";
import { drawAssistant } from "./assistant";
import { drawMapFlight } from "./mapFlight";
import { drawReport } from "./report";
import { drawValuation } from "./valuation";
import { drawTitle } from "./title";

export function AssistantScene() {
  return (
    <Scene
      id="show"
      eyebrow="ARC AI"
      accent="#fbbf24"
      title="A mind that carries your world."
      sub="Feed it on WhatsApp, Instagram, Telegram, X — any chat you already use. It holds your documents, projects and links as living memory, then does the work: fetches the deed, schedules the meeting, answers from your own files."
      base="#0d0905"
      glow="rgba(245,166,90,0.14)"
      draw={drawAssistant}
    />
  );
}

export function MapFlightScene() {
  return (
    <Scene
      eyebrow="The map"
      accent="#818cf8"
      title="India's DP/RP plans, pinned to the earth they govern."
      sub="We are georeferencing every Development and Regional Plan in India, and all of Maharashtra is already done. What's flying here is just one schematic window of that layer, the Mumbai-Pune region: DP overlays, airport funnels, the working map. Drop a pin anywhere in Maharashtra and the law of that land is already placed."
      base="#05060c"
      glow="rgba(99,102,241,0.14)"
      draw={drawMapFlight}
    />
  );
}

export function ReportScene() {
  return (
    <Scene
      eyebrow="The report"
      accent="#93c5fd"
      title="From a boundary to a building."
      sub="Draw the plot. The engine reads the zone and the road, computes the envelope the code permits, generates the floor plates inside it — and prices the outcome. 2D, 3D, and the money, in one pass."
      base="#04070f"
      glow="rgba(59,130,246,0.13)"
      draw={drawReport}
    />
  );
}

export function ValuationScene() {
  return (
    <Scene
      eyebrow="Valuation"
      accent="#6ee7b7"
      title="A number that can defend itself."
      sub="Not a guess — a weighing. Government rates, market instances, buildable potential, the property's own condition: every force of value converges, and every one keeps its source."
      base="#04100a"
      glow="rgba(52,211,153,0.12)"
      draw={drawValuation}
    />
  );
}

export function TitleScene() {
  return (
    <Scene
      eyebrow="Title search"
      accent="#d8b4fe"
      title="Thirty years of paper. One click."
      sub="Every government record of a property — revenue, registration, courts, maps — fetched, read, and reconciled into a single report that says its red flags out loud."
      base="#0b0612"
      glow="rgba(192,132,252,0.13)"
      draw={drawTitle}
    />
  );
}
