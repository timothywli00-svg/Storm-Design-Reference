import type { Determination, Inputs } from "@/lib/determine"
import { fmtSf, labelBand } from "@/lib/determine"
import type { Project } from "@/data/projects"

export function buildOutline(i: Inputs, d: Determination, example: Project | null): string {
  const ex = example ? `${example.id} ${example.muni} — ${example.system || example.ptype}` : "the closest library match"
  const lines: string[] = []
  lines.push(`STORMWATER ${d.doc === "letter" || d.doc === "plat" || d.doc === "memo" ? "MEMO" : "SITE PLAN"}`)
  lines.push(`${i.jurisdiction} · ${i.landUse} · ${i.manual} SWMMWW · ${labelBand(d.band)}`)
  lines.push(`Deliverable: ${d.docLabel}`)
  lines.push(`Copy the shape of ${ex}.`)
  lines.push("")
  lines.push("AREAS TO CONFIRM BEFORE DRAFTING")
  lines.push(`Lot ${fmtSf(i.lotSf)}; existing hard ${fmtSf(i.existingHardSf)}; new ${fmtSf(i.newHardSf)}; replaced ${fmtSf(i.replacedHardSf)}.`)
  lines.push(`Disturbance ${fmtSf(i.disturbSf)}. Lawn conversion ${fmtSf(i.lawnSf)}. Pasture conversion ${fmtSf(i.pastureSf)}.`)
  lines.push(`PGHS ${fmtSf(i.pghsSf)} (roofs count only if they drain onto a pollution-generating surface). EIA ${fmtSf(i.eiaSf)}.`)
  lines.push(`Development treated as ${d.development}. ${d.replacedUpgraded && i.replacedHardSf > 0 ? "Replaced hard surfaces are pulled into MR6–9." : "Replaced hard surfaces are not pulled into MR6–9. On a redevelopment they stay at MR1–5 unless the 50% value test, the commercial 50% area test, or the road test is met."}`)
  lines.push("")
  if (d.doc === "letter") {
    lines.push("LETTER — do not open the full template")
    lines.push("1. Who asked, and the exact comment (capacity to the ultimate outfall).")
    lines.push("2. What as-built you scaled, and the basin assumption (built-out impervious cap if the plat has one).")
    lines.push("3. WWHM2012 100-year, 15-minute flow.")
    lines.push("4. Pipe or pond capacity versus that flow, and the limiting reach.")
    lines.push("5. One conclusion sentence the reviewer can stamp against.")
    lines.push("Copy 22008 (Stonehaven / Blue Grouse) and, if tailwater matters, the backwater memo filed with it.")
    return lines.join("\n")
  }
  if (d.doc === "plat") {
    lines.push("PLAT-ALLOWANCE MEMO")
    lines.push("1. State the impervious and PGHS the plat already assigned to the lot.")
    lines.push("2. State what this building exceeds that assignment by.")
    lines.push("3. Treat only the extra PGHS (cartridge filter or permeable pavement with an underdrain).")
    lines.push("4. Update the plat WWHM enough to show the downstream facility still works.")
    lines.push("Copy 21106 (Drayton Reach lot over the allotment) or 23002 (driveway over the allowance, permeable pavement).")
    return lines.join("\n")
  }
  if (d.doc === "swppp") {
    lines.push("MR2 ONLY")
    lines.push("Do not write Sections 4 and 5 of the full template.")
    lines.push("TESC sheet plus a short note: areas are under 2,000 sf of new plus replaced hard surface and under 7,000 sf of disturbance.")
    lines.push("If the jurisdiction is a Whatcom special district or Lake Whatcom, stop — those overlays can still require a BMP below the Ecology threshold.")
    return lines.join("\n")
  }
  if (d.doc === "none") {
    lines.push("Nothing in these areas triggers a stormwater submittal.")
    lines.push("If a reviewer still asks, answer with the areas, not a site plan.")
    return lines.join("\n")
  }

  lines.push("SECTION 1 — Engineer’s declaration")
  lines.push("Use the seal block in the office .dotx. Do not leave Timothy Li’s name in if he is not the engineer of record.")
  lines.push("")
  lines.push("SECTION 2 — Introduction")
  lines.push("2.1 Project information: name, site address, parcel, applicant, engineer.")
  lines.push("2.2 Scope: effect of the proposed hard surfaces, and the BMPs that mitigate it.")
  lines.push(`2.3 Governing guidelines: ${i.manual} SWMMWW, plus ${i.jurisdiction} development standards. If the city has not adopted 2024 yet, say which edition the permit is on and do not mix BMP numbers.`)
  lines.push("2.4 Method: WWHM2012 continuous simulation. Predeveloped land cover is forest unless a downstream analysis says otherwise.")
  lines.push("")
  lines.push("SECTION 3 — Existing conditions")
  lines.push("3.1 Zoning. 3.2 Vegetation. 3.3 Topography and where water leaves the site today. 3.4 Geology: infiltration rate, seasonal high water, slope band (0–5, 5–15, over 15).")
  lines.push("")
  lines.push("SECTION 4 — System evaluation")
  lines.push("4.1 Basins and threshold discharge areas. One TDA unless water leaves at two natural points.")
  lines.push("4.2 Modeling assumptions.")
  lines.push("4.3 Existing condition. 4.4 Post-developed condition.")
  lines.push(`4.5 MR6: ${d.mr6 === "design" ? "Design the BMP. " + d.treatment.join(" ") : "State the PGHS and why a facility is not required."}`)
  lines.push(`4.6 MR7: ${d.mr7 === "design" ? "Size flow control to the duration standard, or show full infiltration." : d.mr7 === "exempt" ? "Document the exempt receiving water and the conveyance limits. Do not size a pond." : "State EIA and why flow control is not required."}`)
  lines.push("4.7 Exceptions to local standards. Read this subsection in the nearest same-city example before you draft it.")
  lines.push("")
  lines.push("SECTION 5 — Minimum requirements")
  for (const step of d.steps) {
    lines.push(`${step.on ? "WRITE" : "ONE SENTENCE"}  ${step.n} — ${step.note}`)
  }
  lines.push("")
  lines.push(`On-site path: ${d.onsite}`)
  if (d.locals.length) {
    lines.push("")
    lines.push("LOCAL RULES THAT OVERRIDE A GENERIC TEMPLATE")
    for (const l of d.locals) lines.push(`- ${l}`)
  }
  lines.push("")
  lines.push("APPENDICES")
  lines.push("A Soils / infiltration feasibility. B Plans and details. C Critical areas. D WWHM printout and the manual figure you relied on. E O&M if MR9 is on.")
  if (d.doc === "memo") {
    lines.push("")
    lines.push("MEMO LENGTH")
    lines.push("If this is one lot and one BMP, do not fill every heading. Use the 25011 shape: what is proposed, which BMP, how WWHM sized it, one conclusion, then site plan, model, and O&M as attachments.")
  }
  return lines.join("\n")
}
