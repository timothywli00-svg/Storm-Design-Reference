// Generated from the LDES project index and report library.
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

export const projects: Project[] = [
  {
    "id": "6042",
    "muni": "Lummi Nation",
    "swmm": "2019",
    "ptype": "Commercial",
    "landuse": "Commercial / industrial",
    "system": "bioretention",
    "desc": "bioretention cells connected to each other and existing ditch (1520-2023)",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": true,
    "tags": [
      "bioretention"
    ],
    "specials": [],
    "files": [
      {
        "name": "6042H-Stormwater-Report.pdf",
        "kind": "report"
      },
      {
        "name": "6042G-SWPPP.pdf",
        "kind": "swppp"
      }
    ]
  },
  {
    "id": "7006",
    "muni": "Whatcom County",
    "swmm": "2014",
    "ptype": "Commercial",
    "landuse": "Commercial / industrial",
    "system": "Stormtech Infiltration Chambers",
    "desc": "Used StormTech infiltration chambers to infiltrate all new impervious surfaces. Note the project was before the UIC well program was fully implemented. It would require pre-treatment before runoff is infiltrated now. Treatment could be Contech filters, etc.",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": true,
    "tags": [
      "infiltration",
      "cartridge"
    ],
    "specials": [
      "uic"
    ],
    "files": [
      {
        "name": "7006-Storm Report APPROVED - 03132020.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "8003",
    "muni": "Whatcom County",
    "swmm": "2014",
    "ptype": "Commercial",
    "landuse": "Commercial / industrial",
    "system": "Permeable Pavement",
    "desc": "Used permeable pavement for both treatment and to be under flow control thresholds",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": true,
    "tags": [
      "permeable"
    ],
    "specials": [],
    "files": [
      {
        "name": "8003-STRMRPT-SUB2-112420.pdf",
        "kind": "report"
      }
    ]
  }
]
