import type { Project } from "./projects"

export const libraryC: Project[] = [
  {
    "id": "19073",
    "muni": "Ferndale",
    "swmm": "2014",
    "ptype": "multifamily",
    "landuse": "Multifamily",
    "system": "combined detention wetvault with Contech filters",
    "desc": "two story apartment building. Project used a combined detention wetvault for flow control. Runoff treatment was provided by a two-step treatment train with retention and Contech StormFilters. Runoff was dispersed by a concrete dispersion weir into a wetland.",
    "tda": 2,
    "wet": true,
    "hydro": "yes",
    "infil": false,
    "tags": [
      "dispersion",
      "cartridge",
      "wetpool",
      "detention"
    ],
    "specials": [
      "hydroperiod",
      "wetland"
    ],
    "files": [
      {
        "name": "19073-STRMRPT-SUB3-05202021.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "20005",
    "muni": "Skagit County",
    "swmm": "2014",
    "ptype": "Logging Road",
    "landuse": "Road / conveyance",
    "system": "infiltration system",
    "desc": "Project used a terraced infiltration ditch/swales for runoff treatment. Project installed 325' long logging road adjacent to Lake Cavanaugh",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": true,
    "tags": [
      "other/conveyance"
    ],
    "specials": [],
    "files": [
      {
        "name": "20005-STRMRPT-SUB2-05292020.pdf",
        "kind": "report"
      },
      {
        "name": "20005-Stormwater-Maintenance-07162020.pdf",
        "kind": "om"
      }
    ]
  },
  {
    "id": "20007",
    "muni": "Whatcom County",
    "swmm": "2014",
    "ptype": "short plat",
    "landuse": "Short plat",
    "system": "combined detention wetvault",
    "desc": "three lot subdivision with reserve tract. Still in preliminary submittal due to Lee Carter. Uses a combined detention wetvault for both flow control and runoff treatment. Also had to comply with the LID performance standard. A good example project for proving the downstream system regional system has capacity.",
    "tda": 2,
    "wet": true,
    "hydro": "no",
    "infil": false,
    "tags": [
      "wetpool",
      "detention"
    ],
    "specials": [
      "lid-performance",
      "wetland"
    ],
    "files": [
      {
        "name": "20007-STRMRPT-2024.07.26 Variance by Design.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "20010",
    "muni": "Lummi Nation",
    "swmm": "2019",
    "ptype": "half-way homes",
    "landuse": "Single-family",
    "system": "BMP T5.10A for roofs and bioretention for the parking areas.",
    "desc": "Half-way home project for the Lummi nation. Project used downspout roof infiltration per BMP T5.10A. Used bioretention for the parking area.",
    "tda": 1,
    "wet": true,
    "hydro": "no",
    "infil": true,
    "tags": [
      "dispersion",
      "bioretention"
    ],
    "specials": [
      "wetland"
    ],
    "files": [
      {
        "name": "20010-STRMRPT-SUB2-08062020.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "20015",
    "muni": "Ferndale",
    "swmm": "2014/2019",
    "ptype": "town homes - multi-family",
    "landuse": "Multifamily",
    "system": "Stormtech Infiltration Chambers proceeded by Contech StormFilters.",
    "desc": "Project used StormTech chambers for flow control and treatment (full infiltration). The pretreatment was provided by Contech StormFilters. This project had to comply the UIC well program.",
    "tda": 2,
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
        "name": "20015-STRMRPT-SUB5-UIC WELL UPDATE-03312022.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "20017",
    "muni": "Whatcom County",
    "swmm": "2014",
    "ptype": "Single-Family Home",
    "landuse": "Single-family",
    "system": "Bioretention",
    "desc": "bioretention swale for Salish breeze",
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
        "name": "20017-STRMRPT-SUB1-03182020.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "20026",
    "muni": "Whatcom County",
    "swmm": "2014/2019",
    "ptype": "Truck Parking",
    "landuse": "Commercial / industrial",
    "system": "CAVFS/Detention Pond/Bioretention",
    "desc": "This project is complicated. The owner destroyed wetlands with installing gravel. Project is to fix the wetlands and create compliant truck parking. Stormwater management is now provided by CAVFS and detention pond. Used to be a detention pond then a bioretention swale. This project triggered the LID performance standard but was unable to meet it due to undetained. It had to get an exemption through Whatcom County.",
    "tda": 1,
    "wet": true,
    "hydro": "yes and no. under 2014 yes, under 2019 no",
    "infil": false,
    "tags": [
      "bioretention",
      "detention",
      "cavfs"
    ],
    "specials": [
      "hydroperiod",
      "lid-performance",
      "wetland"
    ],
    "files": [
      {
        "name": "20026 Dulay Truck Parking-STRMRPT-CUP SUB4-2024.04.22.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "20027",
    "muni": "Whatcom County",
    "swmm": "2014",
    "ptype": "Single-Family Home",
    "landuse": "Single-family",
    "system": "Bioretention",
    "desc": "bioretention swale for Salish breeze",
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
        "name": "20027-LOT9-STRMRPT-SUB1-04152020.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "20029",
    "muni": "Whatcom County",
    "swmm": "2014",
    "ptype": "Home Addition",
    "landuse": "Single-family",
    "system": "catch basins and pipes",
    "desc": "project was an addition to a existing home. Collected runoff and conveyed it to the storm system on the street.",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": false,
    "tags": [
      "other/conveyance"
    ],
    "specials": [],
    "files": [
      {
        "name": "20029-STRMRPT-SUB1-05212020.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "20032",
    "muni": "Lummi Nation",
    "swmm": "2019",
    "ptype": "Single-Family Home",
    "landuse": "Single-family",
    "system": "dispersion trench",
    "desc": "single-family home. Used dispersion trench for storm management.",
    "tda": 1,
    "wet": true,
    "hydro": "no",
    "infil": false,
    "tags": [
      "dispersion"
    ],
    "specials": [
      "wetland"
    ],
    "files": [
      {
        "name": "20032-STRMRPT-SUB2-09292020.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "20033",
    "muni": "Lynden",
    "swmm": "2014",
    "ptype": "small commercial",
    "landuse": "Commercial / industrial",
    "system": "bioretention",
    "desc": "remodel of a single-family home to convert into a birthing center. Project used bioretention for stormwater management.",
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
        "name": "20033-STRMRPT-APPROVED-10152020.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "20041",
    "muni": "Lummi Nation",
    "swmm": "2019",
    "ptype": "single-family home",
    "landuse": "Single-family",
    "system": "dispersion BMPs",
    "desc": "new home which used dispersion BMPS (sheet flow and trenches).",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": false,
    "tags": [
      "dispersion"
    ],
    "specials": [],
    "files": [
      {
        "name": "20041-STRMRPT-SUB2-08242020.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "20045",
    "muni": "Ferndale",
    "swmm": "2014",
    "ptype": "4 lot short plat",
    "landuse": "Single-family",
    "system": "Combined Detention Wetvault",
    "desc": "four lot short plat which used a combined detention wetvault for both runoff treatment and flow control.",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": false,
    "tags": [
      "wetpool",
      "detention"
    ],
    "specials": [],
    "files": [
      {
        "name": "20045-STRMRPT-APPROVED-03162021.pdf",
        "kind": "report"
      },
      {
        "name": "20045-STRMRPT-APPROVED-03162021 O&M only.pdf",
        "kind": "om"
      }
    ]
  },
  {
    "id": "20050",
    "muni": "Lummi Nation",
    "swmm": "2019",
    "ptype": "Tech School",
    "landuse": "Commercial / industrial",
    "system": "Detention pond proceeded by bioretention swales",
    "desc": "stormwater management used a detention pond for flow control. This was proceeded by bioretention swales providing enhanced treatment. Swales had an underdrain,  no infiltration.",
    "tda": 1,
    "wet": true,
    "hydro": "yes",
    "infil": false,
    "tags": [
      "bioretention",
      "detention"
    ],
    "specials": [
      "hydroperiod",
      "wetland"
    ],
    "files": [
      {
        "name": "20050-STRMRPT-SUB1-05262021.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "20052",
    "muni": "Ferndale",
    "swmm": "2014",
    "ptype": "short plat",
    "landuse": "Short plat",
    "system": "Contech StormFilters",
    "desc": "three lot subdivision. Project used Contech StormFilter for runoff treatment.",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": false,
    "tags": [
      "cartridge"
    ],
    "specials": [],
    "files": [
      {
        "name": "20052-STRMRPT-SUB3-10042021.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "20054",
    "muni": "Ferndale",
    "swmm": "2014",
    "ptype": "short plat",
    "landuse": "Short plat",
    "system": "Contech StormFilter",
    "desc": "two lot short plat. Used Contech StormFilters for runoff treatment.",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": false,
    "tags": [
      "cartridge"
    ],
    "specials": [],
    "files": [
      {
        "name": "20054-STRMRPT-SUB3-05072021.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "20057",
    "muni": "Whatcom County",
    "swmm": "N/A",
    "ptype": "County road",
    "landuse": "Road / conveyance",
    "system": "catch basins and pipes, Contech StormFilter",
    "desc": "sizing of conveyance for approximately 100 acres, minimal filtration for PGHS, Washington Department of Transportation (WSDOT) Hydraulic Report format",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": false,
    "tags": [
      "cartridge"
    ],
    "specials": [],
    "files": [
      {
        "name": "20057 - Hydraulic Report.pdf",
        "kind": "hydraulic"
      }
    ]
  },
  {
    "id": "20058",
    "muni": "Ferndale",
    "swmm": "2014",
    "ptype": "Short Plat",
    "landuse": "Short plat",
    "system": "catch basins and pipes",
    "desc": "Two lot short plat. Collected runoff and routed it to Pheasant Street system. Good example of project which had to review and prove downstream system had capacity. Downstream system pheasant ridge vault and Ryan Glens Pond.",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": false,
    "tags": [
      "other/conveyance"
    ],
    "specials": [],
    "files": [
      {
        "name": "20058-STRMRPT-SUB3-10212021.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "20087",
    "muni": "Whatcom County",
    "swmm": "2014",
    "ptype": "Short Plat",
    "landuse": "Short plat",
    "system": "Roof infiltration BMP T5.10A, engineered infiltration ditch.",
    "desc": "three lot short plat in Maple Valley. Project used infiltration to pass LID standard duration, flow control, and runoff treatment. Project stopped as the client decided to just log the property. May develop at a later time.",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": true,
    "tags": [
      "dispersion"
    ],
    "specials": [],
    "files": [
      {
        "name": "20087-STRMRPT-SUB3-12102021.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "21003",
    "muni": "Whatcom County",
    "swmm": "2014",
    "ptype": "Commercial",
    "landuse": "Commercial / industrial",
    "system": "Delta Tech Storm System - Roof infiltration trenches",
    "desc": "commercial project on Lot 18 within the delta tech industrial park. Used roof infiltration trenches to comply with the 20,000 sf impervious (roof, concrete, asphalt) limit. Mitigated for a failing plat required swale with a Oldcastle StormFilter.",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": true,
    "tags": [
      "infiltration",
      "cartridge"
    ],
    "specials": [],
    "files": [
      {
        "name": "21003-ldp2021-00089-approved-stormwater-report-20230320.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "21009",
    "muni": "Ferndale",
    "swmm": "2014",
    "ptype": "two plats",
    "landuse": "Other / unspecified",
    "system": "catch basins and pipes",
    "desc": "two projects combined together. Project discharge to Vanderyacht Regional pond.",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": false,
    "tags": [
      "other/conveyance"
    ],
    "specials": [],
    "files": [
      {
        "name": "21009-Approved Stormwater Management Report.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "21016",
    "muni": "Blaine",
    "swmm": "2019",
    "ptype": "Long plat",
    "landuse": "Long plat",
    "system": "combined detention wetpond",
    "desc": "Project is a 52 lot subdivision. Runoff treatment and flow control provided by a combined detention wetpond.",
    "tda": 1,
    "wet": true,
    "hydro": "no",
    "infil": false,
    "tags": [
      "wetpool",
      "detention"
    ],
    "specials": [
      "wetland"
    ],
    "files": [
      {
        "name": "21016-Approved Stormwater Site Plan.pdf",
        "kind": "plans"
      }
    ]
  },
  {
    "id": "21023",
    "muni": "Bellingham",
    "swmm": "2019",
    "ptype": "Long plat",
    "landuse": "Long plat",
    "system": "detention pond/Contech Filters",
    "desc": "23 lot subdivision. Used detention pond for flow control. Runoff treatment is provided by Contech StormFilters. As of 5/10/2023, the pond is now a concrete vault.",
    "tda": 1,
    "wet": true,
    "hydro": "yes",
    "infil": false,
    "tags": [
      "cartridge",
      "detention"
    ],
    "specials": [
      "hydroperiod",
      "wetland"
    ],
    "files": [
      {
        "name": "21023-STRMRPT-SUB3-2022.08.12.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "21039",
    "muni": "Whatcom County",
    "swmm": "2014",
    "ptype": "Single-Family Home",
    "landuse": "Single-family",
    "system": "dispersion BMPs",
    "desc": "stormwater management used dispersion BMPs, BMP T5.10A and Sheet Flow",
    "tda": 1,
    "wet": true,
    "hydro": "no",
    "infil": false,
    "tags": [
      "dispersion"
    ],
    "specials": [
      "wetland"
    ],
    "files": [
      {
        "name": "21039-STRMRPT-SUB1-06152021.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "21051",
    "muni": "Ferndale",
    "swmm": "2014",
    "ptype": "Commercial",
    "landuse": "Commercial / industrial",
    "system": "open top detention vault and Modular Wetland",
    "desc": "project expanded Walton Beverage warehouse. Stormwater management was provided by a open top detention vault providing flow control followed by a modular wetland providing enhanced treatment.",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": false,
    "tags": [
      "modular wetland",
      "detention"
    ],
    "specials": [],
    "files": [
      {
        "name": "21051 Walton Bev-STRMRPT-REVISION 4.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "21053",
    "muni": "Bellingham",
    "swmm": "2019",
    "ptype": "Single-Family Home within Lake Whatcom Watershed",
    "landuse": "Single-family",
    "system": "catch basins and pipes. Contech StormFilter",
    "desc": "Project within the Lake Whatcom Watershed. Collected and routed runoff to Contech StormFilter for phosphorus treatment. This project had to do phosphorus loading calcs.",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": false,
    "tags": [
      "cartridge"
    ],
    "specials": [
      "phosphorus"
    ],
    "files": [
      {
        "name": "21053-Kadlec Storm Report 2022.04.26 RL_RS.pdf",
        "kind": "report"
      },
      {
        "name": "21053-Kadlec Flow Control Exemption Request 2021.12.23 JPC.pdf",
        "kind": "exemption"
      }
    ]
  },
  {
    "id": "21060",
    "muni": "Ferndale",
    "swmm": "2019",
    "ptype": "Apartments",
    "landuse": "Multifamily",
    "system": "NA",
    "desc": "in prelim. Will need flow control and enhanced treatment.",
    "tda": 1,
    "wet": true,
    "hydro": "no",
    "infil": false,
    "tags": [
      "other/conveyance"
    ],
    "specials": [
      "wetland"
    ],
    "files": [
      {
        "name": "21060-3rd Party Letter-2022.02.13.pdf",
        "kind": "letter"
      }
    ]
  },
  {
    "id": "21066",
    "muni": "Whatcom County",
    "swmm": "2014",
    "ptype": "Shop",
    "landuse": "Commercial / industrial",
    "system": "Smith Ridge Estates Pond",
    "desc": "Project had to mitigate for exceeding impervious for a new shop. Did this by dispersion BMPs so new impervious would have been modeled as pasture.",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": false,
    "tags": [
      "dispersion"
    ],
    "specials": [
      "plat-allowance"
    ],
    "files": [
      {
        "name": "21066-Lot 13 Letter-09022021.pdf",
        "kind": "letter"
      }
    ]
  },
  {
    "id": "21078",
    "muni": "Ferndale",
    "swmm": "2019",
    "ptype": "Short Plat",
    "landuse": "Short plat",
    "system": "permeable pavement, roof infiltration trenches, roof dispersion trenches, Contech StormFilter",
    "desc": "Project subdivided parcel into 9 new lots. New roads and driveways are permeable pavement. Buildings not within the fill locations used downspout full infiltration trenches per BMP T5.10A. Buildings within fill used downspout dispersion trenches per BMP T5.10B. Frontage used a Contech StormFilter for runoff treatment.",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": true,
    "tags": [
      "dispersion",
      "permeable",
      "infiltration",
      "cartridge"
    ],
    "specials": [],
    "files": [
      {
        "name": "21078-STRMRPT-SUB3-2023.06.01.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "21087",
    "muni": "San Juan County",
    "swmm": "2005",
    "ptype": "single-family home",
    "landuse": "Single-family",
    "system": "dispersion BMPs",
    "desc": "single-family home on Decauter Island. Project used dispersion BMPs for treatment.",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": false,
    "tags": [
      "dispersion"
    ],
    "specials": [],
    "files": [
      {
        "name": "21087-LOT47-STRMRPT-11.10.2021.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "21090",
    "muni": "Ferndale",
    "swmm": "2019",
    "ptype": "Multi-family / Commercial",
    "landuse": "Commercial / industrial",
    "system": "Detention Vaults and Modular Wetlands",
    "desc": "Mixed use commercial developing a lot of townhomes. Uses multiple vaults that outlet into Contech Modular Wetlands.",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": false,
    "tags": [
      "modular wetland",
      "detention"
    ],
    "specials": [],
    "files": [
      {
        "name": "21090-Portal Creek Park-STRMRPT-SUB1-2023.09.28.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "21097",
    "muni": "Lummi Nation",
    "swmm": "2019",
    "ptype": "addition to school",
    "landuse": "Commercial / industrial",
    "system": "dispersion trench",
    "desc": "wrote a design letter for the dispersion trench for the expansion.",
    "tda": 1,
    "wet": true,
    "hydro": "no",
    "infil": false,
    "tags": [
      "dispersion"
    ],
    "specials": [
      "wetland"
    ],
    "files": [
      {
        "name": "21097-Early Learning Center Storm Letter - 12-13-21.pdf",
        "kind": "letter"
      }
    ]
  },
  {
    "id": "21100",
    "muni": "Blaine",
    "swmm": "2019",
    "ptype": "Multi-Family",
    "landuse": "Multifamily",
    "system": "Detention & Retention",
    "desc": "Prelim",
    "tda": 2,
    "wet": false,
    "hydro": "no",
    "infil": false,
    "tags": [
      "detention"
    ],
    "specials": [],
    "files": [
      {
        "name": "21100-JEROME ST-SSP-SUB1-2025.04.30.pdf",
        "kind": "plans"
      }
    ]
  },
  {
    "id": "21106",
    "muni": "Blaine",
    "swmm": "2019",
    "ptype": "Single-family home",
    "landuse": "Single-family",
    "system": "Contech StormFilter & Conveyance",
    "desc": "Lot 15 of the Drayton reach subdivision. LDES did the storm design for the subdivision. Subdivision has designated impervious and PGHS per lot and this project goes over the allotted amounts. A StormFilter is used to treat the additional PGHS. The existing modelling for the Drayton Reach subdivision was updated to show that the increased impervious doesn't cause problems. Otherwise, this project just convey's runoff to the existing system.",
    "tda": null,
    "wet": false,
    "hydro": "",
    "infil": false,
    "tags": [
      "cartridge"
    ],
    "specials": [
      "plat-allowance"
    ],
    "files": [
      {
        "name": "21106-STRMRPT-SUB2-2024.08.06.pdf",
        "kind": "report"
      }
    ]
  }
]
