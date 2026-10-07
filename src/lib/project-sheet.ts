export type ProjectSheet = {
  ldes: string
  name: string
  location: string
  parcel: string
  applicant: string
  applicantContact: string
  engineer: string
  firm: string
  firmAddress: string
  firmPhone: string
  date: string
  zoning: string
  vegetation: string
  topography: string
  geology: string
  bmp: string
  downstream: string
}

export function emptySheet(): ProjectSheet {
  return {
    ldes: "",
    name: "",
    location: "",
    parcel: "",
    applicant: "",
    applicantContact: "",
    engineer: "Timothy Li, PE",
    firm: "Land Development Engineering & Surveying, Inc.",
    firmAddress: "5160 Industrial Place #108, Ferndale, WA 98248",
    firmPhone: "360.383.0620",
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    zoning: "",
    vegetation: "",
    topography: "",
    geology: "",
    bmp: "",
    downstream: "",
  }
}
