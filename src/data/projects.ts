// Generated from the project index and report library.
export type DocKind =
  | "report"
  | "memo"
  | "letter"
  | "om"
  | "swppp"
  | "addendum"
  | "verification"
  | "exemption"
  | "hydraulic"
  | "plans"
  | "prelim"

export type ProjectFile = { name: string; kind: DocKind }

export type Project = {
  id: string
  muni: string
  swmm: string
  ptype: string
  landuse: string
  system: string
  desc: string
  tda: number | null
  wet: boolean
  hydro: string
  infil: boolean
  tags: string[]
  specials: string[]
  files: ProjectFile[]
}

import { libraryA } from "./library-a"
import { libraryB } from "./library-b"
import { libraryC } from "./library-c"
import { libraryD } from "./library-d"

export const projects: Project[] = [...libraryA, ...libraryB, ...libraryC, ...libraryD]
