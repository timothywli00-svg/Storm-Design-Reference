import type { Inputs } from "@/lib/determine"

export type InfilSoil = "coarse" | "medium" | "fine" | "sandy" | "loam" | "silt"

export type SiteBits = {
  roofSf: number
  flowPathFt: number
  steepPathFt: number
  nativeSf: number
  infilSoil: InfilSoil
  pipeIn: number
  pipeSlope: number
  manningN: number
}

export const emptyBits = (): SiteBits => ({
  roofSf: 1800,
  flowPathFt: 50,
  steepPathFt: 50,
  nativeSf: 0,
  infilSoil: "sandy",
  pipeIn: 12,
  pipeSlope: 0.005,
  manningN: 0.013,
})

const INFIL_LF: Record<InfilSoil, number | null> = {
  coarse: 20,
  medium: 30,
  fine: 75,
  sandy: 125,
  loam: 190,
  silt: null,
}

export const INFIL_LABEL: Record<InfilSoil, string> = {
  coarse: "Coarse sands and cobbles — 20 ft per 1,000 sf",
  medium: "Medium sand — 30 ft per 1,000 sf",
  fine: "Fine sand, loamy sand — 75 ft per 1,000 sf",
  sandy: "Sandy loam — 125 ft per 1,000 sf",
  loam: "Loam — 190 ft per 1,000 sf",
  silt: "Silt or clay — infiltration trench is infeasible",
}

export type BmpSize = {
  dispersionFt: number
  dispersionNotched: boolean
  dispersionOver: boolean
  splashOk: boolean
  trenchPathOk: boolean
  steepOk: boolean
  infilFt: number | null
  infilRuns: number
  nativeNeed: number
  nativeOk: boolean
  pathOk: boolean
  tenPercentSf: number
  pipeCfs: number
}

export function sizeBmps(i: Inputs, b: SiteBits): BmpSize {
  const roof = Math.max(0, b.roofSf)
  const units = roof === 0 ? 0 : Math.ceil(roof / 700)
  const dispersionFt = Math.min(50, units * 10)
  const hard = Math.max(0, i.newHardSf + i.replacedHardSf)
  const dFt = Math.max(0.1, b.pipeIn) / 12
  const area = Math.PI * (dFt / 2) ** 2
  const radiusHyd = dFt / 4
  const n = Math.max(0.001, b.manningN)
  const slope = Math.max(0, b.pipeSlope)
  const pipeCfs = (1.49 / n) * area * radiusHyd ** (2 / 3) * Math.sqrt(slope)
  const infilRate = INFIL_LF[b.infilSoil]
  const infilFt = infilRate == null ? null : (roof / 1000) * infilRate

  return {
    dispersionFt,
    dispersionNotched: roof > 700,
    dispersionOver: roof > 3500,
    splashOk: b.flowPathFt >= 50,
    trenchPathOk: b.flowPathFt >= 25,
    steepOk: b.steepPathFt >= 50,
    infilFt,
    infilRuns: infilFt == null ? 0 : Math.max(1, Math.ceil(infilFt / 100)),
    nativeNeed: hard * 6.5,
    nativeOk: b.nativeSf >= hard * 6.5 && hard > 0,
    pathOk: b.flowPathFt >= 100,
    tenPercentSf: i.lotSf * 0.1,
    pipeCfs,
  }
}
