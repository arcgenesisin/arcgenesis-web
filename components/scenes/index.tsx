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
      title="One memory across every project."
      sub="ARC AI connects every platform you already use and every project you run. Open a project, switch to another, move a document from one to the next, ask what is pending. Whatever you sent, from wherever you sent it, is one unified memory."
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
      sub="Draw the plot, give the location. The engine reads the zone and the road, computes the envelope the code permits, generates the floor plates inside it, then prices the outcome. 2D, 3D, and the money, in one pass."
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
      sub="Not a guess. A weighing. Government rates, market instances, buildable potential, the property's own condition: every force of value converges, and every one keeps its source."
      base="#04100a"
      glow="rgba(52,211,153,0.12)"
      draw={drawValuation}
      animScale={1.5}
    />
  );
}

export function TitleScene() {
  return (
    <Scene
      eyebrow="Title search"
      accent="#d8b4fe"
      title="Thirty years of paper. One click."
      sub="Every government record of a property: revenue, registration, courts, maps. Fetched, read, and reconciled into one complete, objective report of where the title stands, with every finding traced to the evidence behind it."
      base="#0b0612"
      glow="rgba(192,132,252,0.13)"
      draw={drawTitle}
      animScale={1.5}
    />
  );
}
