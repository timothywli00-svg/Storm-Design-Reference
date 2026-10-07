import type { Project } from "@/data/projects"
import { projects } from "@/data/projects"
import type { Determination, Inputs } from "@/lib/determine"

const LAND: Record<Inputs["landUse"], string> = {
  sfr: "Single-family",
  short: "Short plat",
  long: "Long plat",
  multi: "Multifamily",
  commercial: "Commercial / industrial",
  road: "Road / conveyance",
}

export function scoreProject(p: Project, i: Inputs, d: Determination): number {
  let s = 0
  if (p.muni === i.jurisdiction) s += 5
  if (p.landuse === LAND[i.landUse]) s += 3
  if (i.lakeWhatcom && p.specials.includes("phosphorus")) s += 8
  if (i.flowExempt && p.specials.includes("exempt")) s += 6
  if (i.uic && p.specials.includes("uic")) s += 6
  if (i.wetland === "discharge" && p.specials.includes("hydroperiod")) s += 5
  if (i.wetland !== "none" && p.specials.includes("wetland")) s += 2
  if (i.infiltration === "yes" && (p.infil || p.tags.includes("infiltration") || p.tags.includes("permeable"))) s += 4
  if (i.dispersion === "yes" && p.tags.includes("dispersion")) s += 4
  if (i.dispersion === "no" && i.infiltration === "no" && (p.tags.includes("cartridge") || p.tags.includes("detention") || p.tags.includes("wetpool"))) s += 2
  if (d.mr7 === "design" && (p.tags.includes("detention") || p.tags.includes("wetpool"))) s += 3
  if (d.mr6 === "design" && (p.tags.includes("cartridge") || p.tags.includes("modular wetland") || p.tags.includes("sand filter") || p.tags.includes("bioretention"))) s += 3
  if (d.doc === "letter" && p.files.some((f) => f.kind === "letter" || f.kind === "hydraulic")) s += 7
  if (d.doc === "plat" && (p.specials.includes("plat-allowance") || p.files.some((f) => f.kind === "memo"))) s += 5
  if ((d.doc === "memo" || d.doc === "short") && p.files.some((f) => f.kind === "memo")) s += 2
  if (d.doc === "swppp" && p.files.some((f) => f.kind === "swppp")) s += 4
  if (d.doc === "full" && p.files.some((f) => f.kind === "report")) s += 1
  if (p.swmm.includes(i.manual)) s += 1
  if (!p.desc) s -= 1
  return s
}

export function matchProjects(i: Inputs, d: Determination, limit = 6): { project: Project; score: number }[] {
  return projects
    .map((project) => ({ project, score: scoreProject(project, i, d) }))
    .sort((a, b) => b.score - a.score || a.project.id.localeCompare(b.project.id))
    .slice(0, limit)
}

export function landUseLabel(land: Inputs["landUse"]): string {
  return LAND[land]
}
