import type { Project } from "@/data/projects"
import { fmtSf, labelBand, type Determination, type Inputs } from "@/lib/determine"
import type { ProjectSheet } from "@/lib/project-sheet"

export type Block =
  | { kind: "kicker"; text: string }
  | { kind: "title"; text: string }
  | { kind: "sub"; text: string }
  | { kind: "meta"; label: string; value: string }
  | { kind: "h"; text: string }
  | { kind: "p"; text: string }
  | { kind: "note"; text: string }

export type DraftReport = {
  filename: string
  blocks: Block[]
  gaps: string[]
}

const LAND: Record<Inputs["landUse"], string> = {
  sfr: "single-family residence",
  short: "short plat",
  long: "long plat",
  multi: "multifamily development",
  commercial: "commercial or industrial site",
  road: "road project",
}

function blank(value: string, prompt: string): string {
  const t = value.trim()
  return t.length > 0 ? t : `[${prompt}]`
}

function gap(gaps: string[], value: string, label: string) {
  if (!value.trim()) gaps.push(label)
}

export function buildDraft(
  sheet: ProjectSheet,
  i: Inputs,
  d: Determination,
  example: Project | null,
): DraftReport {
  const gaps: string[] = []
  const need = (value: string, label: string) => gap(gaps, value, label)
  if (d.doc !== "none") {
    need(sheet.name, "Project name")
    need(sheet.location, "Site address")
    need(sheet.ldes, "Project number")
  }
  if (d.doc === "full" || d.doc === "short" || d.doc === "memo") {
    need(sheet.parcel, "Tax parcel")
    need(sheet.applicant, "Applicant")
    need(sheet.zoning, "Zoning")
    need(sheet.vegetation, "Vegetation")
    need(sheet.topography, "Where water leaves the site")
    need(sheet.geology, "Soils / infiltration note")
    need(sheet.bmp, "Proposed BMP")
  }
  if (d.doc === "letter" || d.doc === "plat") need(sheet.downstream, "Downstream or allowance note")

  const blocks: Block[] = []
  const title =
    d.doc === "letter"
      ? "STORMWATER CONVEYANCE MEMORANDUM"
      : d.doc === "plat"
        ? "STORMWATER ALLOWANCE MEMORANDUM"
        : d.doc === "swppp" || d.doc === "none"
          ? "STORMWATER NOTE"
          : d.doc === "memo"
            ? "STORMWATER MEMORANDUM"
            : "STORMWATER SITE PLAN REPORT"

  blocks.push({ kind: "kicker", text: "PRELIMINARY DRAFT — not for permit submittal" })
  blocks.push({ kind: "title", text: title })
  blocks.push({ kind: "sub", text: blank(sheet.name, "project name") })
  blocks.push({ kind: "sub", text: blank(sheet.location, "project location") })
  blocks.push({ kind: "sub", text: `${sheet.date || "[date]"}` })
  blocks.push({ kind: "sub", text: `Project # ${blank(sheet.ldes, "number")}` })
  blocks.push({
    kind: "note",
    text: "Delete this note before the report leaves the office. Brackets are still open. Attach the WWHM2012 printout and have the engineer of record review the call before anyone seals it.",
  })

  const ex = example
    ? `The closest office pattern on file is #${example.id} (${example.muni}${example.system ? ` — ${example.system}` : ""}). Match that report’s length and exhibits, not this draft’s wording.`
    : "No library report is pinned. Pick one on the Library tab before you freeze the outline."

  if (d.doc === "none") {
    blocks.push({
      kind: "p",
      text: `These areas do not trigger a stormwater submittal under the ${i.manual} manual in ${i.jurisdiction}: new plus replaced hard surface ${fmtSf(d.newPlusReplaced)}, disturbance ${fmtSf(i.disturbSf)}. If a reviewer still asks, answer with the areas. Do not open the full site-plan template.`,
    })
    return { filename: fileName(sheet, "NOTE"), blocks, gaps }
  }

  if (d.doc === "letter") {
    letter(blocks, sheet, i, d, ex)
    return { filename: fileName(sheet, "LETTER"), blocks, gaps }
  }
  if (d.doc === "plat") {
    plat(blocks, sheet, i, d, ex)
    return { filename: fileName(sheet, "MEMO"), blocks, gaps }
  }
  if (d.doc === "swppp") {
    swppp(blocks, sheet, i, d)
    return { filename: fileName(sheet, "SWPPP"), blocks, gaps }
  }

  sitePlan(blocks, sheet, i, d, ex)
  return { filename: fileName(sheet, d.doc === "memo" ? "MEMO" : "STRMRPT"), blocks, gaps }
}

function fileName(sheet: ProjectSheet, kind: string): string {
  const num = sheet.ldes.replace(/[^\w.-]+/g, "") || "DRAFT"
  return `${num}-${kind}-PRELIM.docx`
}

function coverParties(blocks: Block[], sheet: ProjectSheet) {
  blocks.push({ kind: "h", text: "Prepared by" })
  blocks.push({
    kind: "p",
    text: `${blank(sheet.engineer, "engineer of record")}, ${blank(sheet.firm, "firm")}. ${blank(sheet.firmAddress, "office address")}. Phone ${blank(sheet.firmPhone, "phone")}.`,
  })
  blocks.push({ kind: "h", text: "Prepared for" })
  blocks.push({
    kind: "p",
    text: `${blank(sheet.applicant, "applicant")}. ${blank(sheet.applicantContact, "client address and phone")}.`,
  })
}

function letter(blocks: Block[], sheet: ProjectSheet, i: Inputs, d: Determination, ex: string) {
  blocks.push({
    kind: "p",
    text: `This memorandum answers a conveyance question for the ${LAND[i.landUse]} at ${blank(sheet.location, "site address")}, ${i.jurisdiction}. It is not a stormwater site plan.`,
  })
  coverParties(blocks, sheet)
  blocks.push({ kind: "h", text: "Question" })
  blocks.push({
    kind: "p",
    text: blank(sheet.downstream, "who asked, the comment number, and the reach they want checked to the ultimate outfall"),
  })
  blocks.push({ kind: "h", text: "Basis" })
  blocks.push({
    kind: "p",
    text: `Hard surface used for the check: new ${fmtSf(i.newHardSf)}, replaced ${fmtSf(i.replacedHardSf)}, existing ${fmtSf(i.existingHardSf)}, on a lot of ${fmtSf(i.lotSf)}. Model the 100-year, 15-minute flow in WWHM2012. If a plat set an impervious cap, use the built-out cap, not only what is drawn today. Name the as-built sheet you scaled.`,
  })
  blocks.push({ kind: "h", text: "Finding" })
  blocks.push({
    kind: "p",
    text: "[State pipe or pond capacity against that flow, name the limiting reach, and end with one sentence the reviewer can stamp against.]",
  })
  blocks.push({ kind: "note", text: ex + " Copy 22008, and the backwater memo filed with it if tailwater matters." })
  if (d.conflicts.length) internal(blocks, d)
}

function plat(blocks: Block[], sheet: ProjectSheet, i: Inputs, d: Determination, ex: string) {
  blocks.push({
    kind: "p",
    text: `This memorandum checks the ${LAND[i.landUse]} at ${blank(sheet.location, "site address")} against the impervious and pollution-generating area the plat already assigned to the lot. It does not reopen the plat facility.`,
  })
  coverParties(blocks, sheet)
  blocks.push({ kind: "h", text: "Allotment" })
  blocks.push({
    kind: "p",
    text: blank(sheet.downstream, "the impervious and PGHS the plat assigned to this lot, and the sheet or condition that set it"),
  })
  blocks.push({ kind: "h", text: "This building" })
  blocks.push({
    kind: "p",
    text: `Proposed new hard surface is ${fmtSf(i.newHardSf)} and pollution-generating hard surface is ${fmtSf(i.pghsSf)}. [State what this building exceeds the assignment by.] Treat only the extra pollution-generating area. ${blank(sheet.bmp, "name the cartridge, permeable pavement, or other BMP used for that extra area")}`,
  })
  blocks.push({ kind: "h", text: "Downstream facility" })
  blocks.push({
    kind: "p",
    text: "Update the plat WWHM2012 model only far enough to show the shared facility still meets its original standard with this lot included. Attach that printout. Do not resize the plat pond in this memo unless the update fails.",
  })
  blocks.push({ kind: "note", text: ex + " Copy 21106 or 23002." })
  if (d.conflicts.length) internal(blocks, d)
}

function swppp(blocks: Block[], sheet: ProjectSheet, i: Inputs, d: Determination) {
  blocks.push({
    kind: "p",
    text: `The ${LAND[i.landUse]} at ${blank(sheet.location, "site address")}, ${i.jurisdiction}, is under the ${i.manual} project thresholds for a stormwater site plan. New plus replaced hard surface is ${fmtSf(d.newPlusReplaced)} and land disturbance is ${fmtSf(i.disturbSf)}. The submittal is Minimum Requirement 2 only: a construction SWPPP and a TESC sheet. Do not fill Sections 4 and 5 of the office site-plan template.`,
  })
  blocks.push({
    kind: "p",
    text: "Mark clearing limits before land disturbance. Keep the duff and native topsoil where the plans do not call for grading. Limit construction access to the existing driveway. Cover stockpiles and stabilize exposed soil if work stops. Protect any inlet the contractor can reach. The contractor maintains the BMPs until final stabilization.",
  })
  blocks.push({
    kind: "note",
    text: "If this lot is in a Whatcom special district or the Lake Whatcom watershed, stop. Those overlays can still require a BMP below the Ecology threshold.",
  })
  if (d.conflicts.length) internal(blocks, d)
}

function sitePlan(blocks: Block[], sheet: ProjectSheet, i: Inputs, d: Determination, ex: string) {
  const short = d.doc === "memo"
  blocks.push({
    kind: "p",
    text: short
      ? "One lot and one BMP. Keep this to the length of a memo (see 25011). Do not fill every heading of the full template if a sentence will do."
      : "Follow the office site-plan template. This draft fills the headings from the areas and the notes below. It does not replace the WWHM run, the plans, or the seal.",
  })
  coverParties(blocks, sheet)

  blocks.push({ kind: "h", text: "Section 1 — Engineer’s declaration" })
  blocks.push({
    kind: "p",
    text: `I, ${blank(sheet.engineer, "name")}, a professional engineer registered in the State of Washington, declare that the preliminary stormwater report titled “${blank(sheet.name, "project name")}” and dated ${sheet.date || "[date]"} was prepared by me or under my supervision. This copy is a draft. The declaration is not signed and the seal is not affixed.`,
  })

  blocks.push({ kind: "h", text: "Section 2 — Introduction" })
  blocks.push({ kind: "h", text: "2.1 Project information" })
  blocks.push({ kind: "meta", label: "Project", value: blank(sheet.name, "project name") })
  blocks.push({ kind: "meta", label: "Location", value: blank(sheet.location, "site address") })
  blocks.push({ kind: "meta", label: "Tax parcel", value: blank(sheet.parcel, "parcel number") })
  blocks.push({ kind: "meta", label: "Applicant", value: blank(sheet.applicant, "applicant") })
  blocks.push({
    kind: "meta",
    label: "Engineer",
    value: `${blank(sheet.engineer, "engineer")}, ${blank(sheet.firm, "firm")}, ${blank(sheet.firmPhone, "phone")}`,
  })
  blocks.push({ kind: "meta", label: "Jurisdiction", value: i.jurisdiction })
  blocks.push({ kind: "meta", label: "Proposal", value: LAND[i.landUse] })

  blocks.push({ kind: "h", text: "2.2 Scope" })
  blocks.push({
    kind: "p",
    text: `This report evaluates runoff from the proposed ${LAND[i.landUse]} and describes the practices that mitigate it. The site is treated as ${d.development}. ${labelBand(d.band)} apply under the ${i.manual} Stormwater Management Manual for Western Washington. New plus replaced hard surface is ${fmtSf(d.newPlusReplaced)} on a lot of ${fmtSf(i.lotSf)}.`,
  })

  blocks.push({ kind: "h", text: "2.3 Governing guidelines" })
  blocks.push({
    kind: "p",
    text: `The permit is on the ${i.manual} manual plus the ${i.jurisdiction} development standards. Do not mix BMP numbers from another edition. ${d.locals.length ? d.locals.join(" ") : "No local overlay was switched on in the desk. Confirm watershed, special district, and receiving water on the map before you rely on that."}`,
  })

  blocks.push({ kind: "h", text: "2.4 Method" })
  blocks.push({
    kind: "p",
    text: "Continuous simulation in WWHM2012. Predeveloped land cover is forest unless a downstream analysis in the file says otherwise. The printout goes in Appendix D. This draft does not contain modeled flows.",
  })

  blocks.push({ kind: "h", text: "Section 3 — Existing conditions" })
  blocks.push({ kind: "h", text: "3.1 Land use and zoning" })
  blocks.push({ kind: "p", text: blank(sheet.zoning, "zoning district and what is on the lot today") })
  blocks.push({ kind: "h", text: "3.2 Vegetation" })
  blocks.push({ kind: "p", text: blank(sheet.vegetation, "forest, pasture, lawn, and what will be cleared") })
  blocks.push({ kind: "h", text: "3.3 Topography and drainage" })
  blocks.push({
    kind: "p",
    text: blank(sheet.topography, "slope band, and the point where water leaves the site today"),
  })
  blocks.push({ kind: "h", text: "3.4 Geology" })
  blocks.push({
    kind: "p",
    text: blank(sheet.geology, "infiltration rate, seasonal high water, and why infiltration is in or out"),
  })

  blocks.push({ kind: "h", text: "Section 4 — Stormwater system" })
  blocks.push({ kind: "h", text: "4.1 Basin" })
  blocks.push({
    kind: "p",
    text: `One threshold discharge area unless the survey shows water leaving at two natural points. Existing hard surface ${fmtSf(i.existingHardSf)}. New ${fmtSf(i.newHardSf)}. Replaced ${fmtSf(i.replacedHardSf)}. Disturbance ${fmtSf(i.disturbSf)}. Lawn conversion ${fmtSf(i.lawnSf)}. Pasture conversion ${fmtSf(i.pastureSf)}. Pollution-generating hard surface ${fmtSf(i.pghsSf)}. Pollution-generating pervious ${fmtSf(i.pgpsSf)}. Effective impervious area ${fmtSf(i.eiaSf)}. Roofs count as pollution-generating only where they drain onto a pollution-generating surface.`,
  })
  blocks.push({
    kind: "p",
    text: d.replacedUpgraded
      ? "Replaced hard surfaces are included in Minimum Requirements 6 through 9 for this project."
      : "Replaced hard surfaces stay at Minimum Requirements 1 through 5 unless a redevelopment test in the manual pulls them up. Confirm that reading before you size a facility for the replaced area.",
  })
  blocks.push({ kind: "h", text: "4.2 Proposed system" })
  blocks.push({ kind: "p", text: blank(sheet.bmp, "name the BMP, where it sits, and what area drains to it") })
  blocks.push({ kind: "p", text: d.onsite })
  blocks.push({ kind: "p", text: d.treatment.join(" ") })
  blocks.push({ kind: "h", text: "4.3 Runoff treatment" })
  blocks.push({
    kind: "p",
    text:
      d.mr6 === "design"
        ? "A treatment facility is required. Size it in WWHM2012 so it treats at least 91 percent of the runoff volume. Basic, metals, oil, or phosphorus follows the menu above, not a generic filter."
        : d.mr6 === "discuss"
          ? "Pollution-generating area is in the range where the office memo and the published manual can disagree. Write the areas and confirm with the reviewer before you omit a filter."
          : "A treatment facility is not required by the Ecology area threshold on these numbers. Say that in the report. A local overlay can still require one.",
  })
  blocks.push({ kind: "h", text: "4.4 Flow control" })
  blocks.push({
    kind: "p",
    text:
      d.mr7 === "design"
        ? "Size flow control to the duration standard against predeveloped forest, or show full infiltration. Attach the WWHM durations."
        : d.mr7 === "exempt"
          ? "The receiving water is marked flow-control exempt. Document the conveyance to ordinary high water and the limits in Appendix I-A. Do not size a pond. " +
            blank(sheet.downstream, "name the receiving water and the pipe or ditch that reaches it")
          : "Flow control is not required on these areas. State the effective impervious area and stop. Do not add a pond to be safe.",
  })
  if (sheet.downstream.trim() && d.mr7 !== "exempt") {
    blocks.push({ kind: "p", text: `Downstream note: ${sheet.downstream.trim()}` })
  }
  blocks.push({ kind: "h", text: "4.5 Exceptions" })
  blocks.push({
    kind: "p",
    text: "None are requested in this draft. If a standard cannot be met, read the exceptions write-up in the nearest same-city example before you draft one.",
  })

  blocks.push({ kind: "h", text: "Section 5 — Minimum requirements" })
  blocks.push({
    kind: "p",
    text: `Per the ${i.manual} manual, the project is ${labelBand(d.band)}. Each item below is either a section to write or a single sentence that the requirement does not apply.`,
  })
  for (const step of d.steps) {
    blocks.push({
      kind: "p",
      text: `${step.on ? "Applies" : "Does not apply"} — ${step.n}. ${step.note}`,
    })
  }

  if (!short) {
    blocks.push({ kind: "h", text: "Construction SWPPP" })
    blocks.push({
      kind: "p",
      text: "The thirteen elements stay in Section 5.2 of the office template. This draft does not copy them. Write each element against this site’s clearing limits, access, and inlets, and point to the TESC sheet. On a large job, put the SWPPP in its own PDF.",
    })
  }

  blocks.push({ kind: "h", text: "Appendices" })
  blocks.push({
    kind: "p",
    text: "A Soils. B Plans and details. C Critical areas, or a sentence that none were mapped. D WWHM2012 printout and the manual figure relied on. E Operation and maintenance, if Minimum Requirement 9 is on.",
  })
  blocks.push({ kind: "note", text: ex })
  if (d.conflicts.length) internal(blocks, d)
}

function internal(blocks: Block[], d: Determination) {
  blocks.push({ kind: "h", text: "Office check — delete before submittal" })
  for (const c of d.conflicts) {
    blocks.push({ kind: "note", text: `${c.title}. ${c.detail}` })
  }
}
