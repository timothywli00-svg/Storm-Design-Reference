export type LandUse = "sfr" | "short" | "long" | "multi" | "commercial" | "road"
export type Intent = "design" | "capacity" | "plat"
export type YesNo = "yes" | "no" | "unknown"
export type Wetland = "none" | "buffer" | "discharge"
export type Manual = "2014" | "2019" | "2024"
export type Band = "none" | "mr2" | "mr1-5" | "mr1-9"

export type Inputs = {
  jurisdiction: string
  landUse: LandUse
  intent: Intent
  developedSite: boolean
  manual: Manual
  lotSf: number
  existingHardSf: number
  newHardSf: number
  replacedHardSf: number
  disturbSf: number
  lawnSf: number
  pastureSf: number
  pghsSf: number
  pgpsSf: number
  eiaSf: number
  flowIncreaseCfs: number
  valueOver50: boolean
  infiltration: YesNo
  dispersion: YesNo
  wetland: Wetland
  lakeWhatcom: boolean
  specialDistrict: boolean
  flowExempt: boolean
  oilUse: boolean
  uic: boolean
}

export type Conflict = { title: string; detail: string }

export type Determination = {
  development: "new" | "redevelopment"
  officeDevelopment: "new" | "redevelopment" | "unknown"
  hardRatio: number | null
  newPlusReplaced: number
  band: Band
  officeBand: Band
  replacedUpgraded: boolean
  mr6: "not-in-play" | "discuss" | "design"
  mr6OfficeMemo: "discuss" | "design"
  mr7: "not-in-play" | "discuss" | "design" | "exempt"
  mr8: "not-in-play" | "none" | "discuss" | "hydroperiod"
  mr9: boolean
  doc: "none" | "swppp" | "memo" | "short" | "full" | "letter" | "plat"
  docLabel: string
  conflicts: Conflict[]
  locals: string[]
  treatment: string[]
  onsite: string
  steps: { n: string; on: boolean; note: string }[]
}

const LAWN = 32670
const PASTURE = 108900

export const emptyInputs = (): Inputs => ({
  jurisdiction: "Whatcom County",
  landUse: "sfr",
  intent: "design",
  developedSite: false,
  manual: "2024",
  lotSf: 10000,
  existingHardSf: 0,
  newHardSf: 2800,
  replacedHardSf: 0,
  disturbSf: 4000,
  lawnSf: 0,
  pastureSf: 0,
  pghsSf: 600,
  pgpsSf: 0,
  eiaSf: 2800,
  flowIncreaseCfs: 0,
  valueOver50: false,
  infiltration: "unknown",
  dispersion: "yes",
  wetland: "none",
  lakeWhatcom: false,
  specialDistrict: false,
  flowExempt: false,
  oilUse: false,
  uic: false,
})

function officeBand(i: Inputs, npr: number): Band {
  if (npr <= 0 && i.disturbSf <= 0 && i.lawnSf <= 0 && i.pastureSf <= 0) return "none"
  const lotSmall = i.lotSf > 0 && i.lotSf < 5000
  const full =
    npr >= 5000 || i.lawnSf >= LAWN || i.pastureSf >= PASTURE || i.disturbSf >= 7000
  if (lotSmall) {
    if (npr < 2000 && i.disturbSf < 7000) return "mr2"
    return "mr1-5"
  }
  if (full) return "mr1-9"
  if (npr < 2000 && i.disturbSf < 7000) return "mr2"
  return "mr1-5"
}

export function determine(i: Inputs): Determination {
  const npr = i.newHardSf + i.replacedHardSf
  const ratio = i.lotSf > 0 ? i.existingHardSf / i.lotSf : null
  const development: Determination["development"] = i.developedSite ? "redevelopment" : "new"
  const officeDevelopment: Determination["officeDevelopment"] =
    ratio == null ? "unknown" : ratio < 0.35 ? "redevelopment" : "new"

  const veg = i.lawnSf >= LAWN || i.pastureSf >= PASTURE
  const mr15 = npr >= 2000 || i.disturbSf >= 7000
  const commercial = i.landUse === "commercial"
  const halfExisting =
    i.existingHardSf > 0 && npr >= 0.5 * i.existingHardSf

  let band: Band = "none"
  let replacedUpgraded = false
  if (npr <= 0 && i.disturbSf <= 0 && !veg) {
    band = "none"
  } else if (development === "new") {
    if (npr >= 5000 || veg) {
      band = "mr1-9"
      replacedUpgraded = true
    } else if (mr15) band = "mr1-5"
    else band = "mr2"
  } else {
    const newHardFull = i.newHardSf >= 5000 || veg
    const roadFull = i.landUse === "road" && npr >= 5000 && halfExisting
    const valueFull = npr >= 5000 && i.valueOver50
    const commercialAreaFull = commercial && npr >= 5000 && halfExisting
    if (newHardFull || roadFull || valueFull || commercialAreaFull) {
      band = "mr1-9"
      replacedUpgraded = roadFull || valueFull || commercialAreaFull
    } else if (mr15) band = "mr1-5"
    else band = "mr2"
  }

  const office = officeBand(i, npr)

  const mr6Design = i.pghsSf >= 5000 || i.pgpsSf >= LAWN
  const mr6OfficeMemo: Determination["mr6OfficeMemo"] = i.pghsSf >= 2000 ? "design" : "discuss"
  let mr6: Determination["mr6"] = "not-in-play"
  if (band === "mr1-9" || i.lakeWhatcom || (i.specialDistrict && i.newHardSf >= 500 && i.pghsSf > 0)) {
    mr6 = mr6Design || i.lakeWhatcom || (i.specialDistrict && i.pghsSf > 0) ? "design" : "discuss"
  } else if (i.pghsSf >= 2000) {
    mr6 = "discuss"
  }

  const mr7Trip = i.eiaSf >= 10000 || veg || i.flowIncreaseCfs >= 0.15
  let mr7: Determination["mr7"] = "not-in-play"
  if (band === "mr1-9") {
    if (!mr7Trip) mr7 = "discuss"
    else if (i.flowExempt) mr7 = "exempt"
    else mr7 = "design"
  } else if (mr7Trip) mr7 = "discuss"

  let mr8: Determination["mr8"] = "not-in-play"
  if (band === "mr1-5" || band === "mr1-9") {
    if (i.wetland === "discharge") mr8 = "hydroperiod"
    else if (i.wetland === "buffer") mr8 = "discuss"
    else mr8 = "none"
  }

  const facility =
    mr6 === "design" ||
    mr7 === "design" ||
    i.infiltration === "yes" ||
    i.dispersion === "yes" ||
    i.lakeWhatcom
  const mr9 = band === "mr1-9" || (facility && band !== "none" && band !== "mr2")

  let doc: Determination["doc"] = "full"
  let docLabel = "Full stormwater site plan"
  if (i.intent === "capacity") {
    doc = "letter"
    docLabel = "Conveyance / capacity letter"
  } else if (i.intent === "plat") {
    doc = "plat"
    docLabel = "Plat-allowance memo"
  } else if (band === "none") {
    doc = "none"
    docLabel = "No stormwater submittal from these numbers"
  } else if (band === "mr2" && !i.lakeWhatcom && !(i.specialDistrict && i.newHardSf >= 500)) {
    doc = "swppp"
    docLabel = "MR2 only \u2014 construction SWPPP, not a site plan"
  } else if (
    (band === "mr1-5" || (i.specialDistrict && band !== "mr1-9")) &&
    (i.landUse === "sfr" || i.landUse === "short") &&
    mr6 !== "design" &&
    mr7 !== "design" &&
    mr8 !== "hydroperiod"
  ) {
    doc = i.landUse === "sfr" && npr < 5000 ? "memo" : "short"
    docLabel = doc === "memo" ? "Storm memo (one BMP)" : "Short stormwater site plan"
    if (i.lakeWhatcom) {
      doc = "short"
      docLabel = "Short site plan with phosphorus treatment"
    }
  } else if (i.lakeWhatcom && band !== "mr1-9" && i.landUse === "sfr") {
    doc = "short"
    docLabel = "Short site plan with phosphorus treatment"
  } else {
    doc = "full"
    docLabel = "Full stormwater site plan (office template)"
  }

  const conflicts: Conflict[] = []
  if (i.existingHardSf > 0 && officeDevelopment !== "unknown" && officeDevelopment !== development) {
    conflicts.push({
      title: "New vs redevelopment",
      detail:
        "Your determination memo calls a site redevelopment when existing hard surface is under 35% of the lot, and new development at 35% or more. That ratio is not in the 2024 applicability section. This desk uses the switch you set: an already developed site is redevelopment.",
    })
  }
  if (office !== band) {
    conflicts.push({
      title: "Which minimum requirements",
      detail:
        office === "mr1-9" && band !== "mr1-9"
          ? "Your checklist treats 7,000 sf of land disturbance as full MR1\u20139. The 2024 manual treats 7,000 sf as MR1\u20135 only. Full MR1\u20139 is 5,000 sf of new plus replaced hard surface (new hard surface only, on a redevelopment), or the vegetation conversions. The desk follows the manual."
          : `Your checklist would call this ${labelBand(office)}. The 2024 project thresholds call it ${labelBand(band)}.`,
    })
  }
  if (band === "mr1-9" && mr6OfficeMemo === "design" && !mr6Design && !i.lakeWhatcom) {
    conflicts.push({
      title: "Runoff treatment area",
      detail:
        "The published 2024 MR6 page requires a treatment BMP at 5,000 sf of pollution-generating hard surface in the TDA (or 3/4 acre of pollution-generating pervious surface). Your determination memo says design at 2,000 sf. Your checklist says 5,000. Between 2,000 and 5,000, confirm with the reviewer before you skip a filter.",
    })
  }

  const locals: string[] = []
  if (i.lakeWhatcom) {
    locals.push(
      "Lake Whatcom / Sudden Valley: phosphorus treatment is required even on small lots, with a loading calculation. Steep lots in this library use a lined treatment pit. Copy 24104, 24145, or 21053 (that one also has a separate flow-control exemption request).",
    )
  }
  if (i.specialDistrict) {
    locals.push(
      "Whatcom stormwater special district (Lake Samish, Lake Padden, Birch Bay, or Drayton Harbor): WCC 20.80.630 asks for downspout full infiltration or dispersion once new impervious exceeds about 500 sf, and PGIS treatment is always required. That is tighter than the Ecology project thresholds.",
    )
  }
  if (i.flowExempt) {
    locals.push(
      "Flow-control exempt receiving water (Appendix I-A, often saltwater or a listed river such as the Nooksack): you still document MR7, but you do not size a pond if the discharge path is an adequate manmade conveyance to ordinary high water and you are not diverting a stream or a higher-category wetland. Copy 22066 or 16013.",
    )
  }
  if (i.oilUse) {
    locals.push(
      "High-use oil site: oil control (API, coalescing plate, or a linear sand filter) goes upstream of the other treatment BMP. Trigger is the land use, not the square footage.",
    )
  }
  if (i.uic || (i.infiltration === "yes" && (i.landUse === "commercial" || i.landUse === "multi"))) {
    locals.push(
      "Infiltration structures that are UIC wells need pretreatment and the UIC registration. 7006 would not be designed the same way today. Copy 19072 (Vortechs ahead of StormTech) or 20015.",
    )
  }

  const treatment: string[] = []
  if (i.oilUse) treatment.push("Oil control first, close to the source.")
  if (i.infiltration === "yes" && (mr6 === "design" || i.lakeWhatcom)) {
    treatment.push("Infiltration can meet basic, metals, and phosphorus if the soil suitability criteria pass and pretreatment is provided.")
  }
  if (i.lakeWhatcom) {
    treatment.push("Phosphorus menu: lined bioretention or a treatment pit, large sand filter, or a wetpool. Do not rely on basic treatment alone.")
  } else if (mr6 === "design" && (commercial || i.landUse === "multi" || i.landUse === "road")) {
    treatment.push("Metals treatment is the usual call for commercial, multifamily, and higher-ADT roads discharging to fresh water. Cartridge filters (StormFilter, BayFilter) or a modular wetland are the office defaults when infiltration is out.")
  } else if (mr6 === "design") {
    treatment.push("Basic treatment. Permeable pavement is used in this office both as treatment and to keep effective impervious area under the flow-control threshold.")
  } else {
    treatment.push("No treatment BMP from the Ecology area threshold. Still say so in the report, and exclude roofs from PGHS unless the roof drains onto a pollution-generating surface.")
  }

  let onsite = "MR5 is not in play."
  if (band === "mr1-5" || band === "mr1-9") {
    if (i.infiltration === "yes") {
      onsite = "List approach: BMP T5.10A downspout full infiltration for roofs, and infiltration or permeable pavement for other hard surfaces where the geotech rate supports it."
    } else if (i.dispersion === "yes") {
      onsite = "List approach: BMP T5.10B downspout dispersion, or a perforated stub-out where the lawn is too small for a trench. Full dispersion (T5.30) only if you can keep the impervious area within the native-area limits in your checklist."
    } else if (i.infiltration === "no" && i.dispersion === "no") {
      onsite = "Both infiltration and dispersion are out. Document why, then use the infeasible list (or the LID performance standard on larger projects). 20026 is the example that could not meet LID performance and needed an exemption."
    } else {
      onsite = "Feasibility is still open. Do not pick the BMP until the geotech infiltration rate, seasonal high water, and slope (flat / moderate / steep) are in the file."
    }
  }

  const steps = [
    { n: "MR1 Site plan", on: band === "mr1-5" || band === "mr1-9", note: doc === "letter" ? "Not the deliverable. A basin exhibit is enough." : "This report is the site plan." },
    { n: "MR2 SWPPP", on: band !== "none", note: "13 elements. Separate PDF on larger jobs (6042G). On a memo, keep it to the TESC sheet." },
    { n: "MR3 Source control", on: band === "mr1-5" || band === "mr1-9", note: commercial ? "Check Volume IV Appendix IV-A. A house usually has none beyond driveway O&M." : "Single-family: no extra source controls beyond typical O&M." },
    { n: "MR4 Natural drainage", on: band === "mr1-5" || band === "mr1-9", note: "Same discharge point in the post-developed condition. Say where it goes today and where it will go." },
    { n: "MR5 On-site", on: band === "mr1-5" || band === "mr1-9", note: onsite },
    { n: "MR6 Treatment", on: band === "mr1-9" || mr6 === "design", note: mr6 === "design" ? "Size to treat at least 91% of the runoff in WWHM." : "Write the threshold comparison. Do not size a facility unless a local overlay requires it." },
    { n: "MR7 Flow control", on: band === "mr1-9" || mr7 === "design" || mr7 === "exempt", note: mr7 === "design" ? "Match predeveloped forest durations, or infiltrate." : mr7 === "exempt" ? "Exemption write-up, not a pond." : "Under the TDA thresholds. State the areas." },
    { n: "MR8 Wetlands", on: mr8 === "hydroperiod" || mr8 === "discuss", note: mr8 === "hydroperiod" ? "Hydroperiod method. Copy 12006." : "Wetland is nearby but you are not discharging to it. Say that. 24049 is the pattern." },
    { n: "MR9 O&M", on: mr9, note: "Appendix, or its own PDF when the jurisdiction wants it recorded. Copy 17005 or 24018." },
  ]

  return {
    development,
    officeDevelopment,
    hardRatio: ratio,
    newPlusReplaced: npr,
    band,
    officeBand: office,
    replacedUpgraded,
    mr6,
    mr6OfficeMemo,
    mr7,
    mr8,
    mr9,
    doc,
    docLabel,
    conflicts,
    locals,
    treatment,
    onsite,
    steps,
  }
}

export function labelBand(b: Band): string {
  if (b === "none") return "No minimum requirements"
  if (b === "mr2") return "MR2 only"
  if (b === "mr1-5") return "MR1\u20135"
  return "MR1\u20139"
}

export function fmtSf(n: number): string {
  return `${Math.round(n).toLocaleString("en-US")} sf`
}
