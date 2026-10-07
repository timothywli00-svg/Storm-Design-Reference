import type { Project } from "./projects"

export const libraryA: Project[] = [
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
  },
  {
    "id": "12006",
    "muni": "Bellingham",
    "swmm": "2019",
    "ptype": "Multi-Family",
    "landuse": "Multifamily",
    "system": "Contech Filters and Combined Detention Wetpond",
    "desc": "Project used a combined detention wetpond with concrete vertical walls for flow control. The treatment train was two steps with the first being the wetpond followed by Contech storm filters. Project dispersed runoff into the wetland buffer.",
    "tda": 2,
    "wet": true,
    "hydro": "Yes",
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
        "name": "12006-TULL RD STRMRPT-SUB6-06142021.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "13055",
    "muni": "Bellingham",
    "swmm": "2014",
    "ptype": "Multi-Family",
    "landuse": "Multifamily",
    "system": "Detention Vault",
    "desc": "Downstream system was at capacity. Had to use a small detention vault for flow control for mitigation of system at capacity. Existing condition was modeled as-is",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": false,
    "tags": [
      "detention"
    ],
    "specials": [],
    "files": [
      {
        "name": "13055-STRMRPT-SUB3-09182019.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "14034",
    "muni": "Whatcom County",
    "swmm": "2014",
    "ptype": "Commercial",
    "landuse": "Commercial / industrial",
    "system": "Dispersion BMPs",
    "desc": "Post office in Pont Roberts. This is a Fred Packzad project…Ramon will know. This project had to address a indirect connection to a downstream wetland.",
    "tda": 1,
    "wet": true,
    "hydro": "Yes",
    "infil": false,
    "tags": [
      "dispersion"
    ],
    "specials": [
      "hydroperiod",
      "wetland"
    ],
    "files": [
      {
        "name": "14034-SWRPT-APPROVED.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "14055",
    "muni": "Ferndale",
    "swmm": "2014",
    "ptype": "Commercial",
    "landuse": "Commercial / industrial",
    "system": "Detention Pond and BayFilters",
    "desc": "Commercial project discharges into a detention pond for flow control. Immediately after the controls structure is a  BayFilters which provides enhanced treatment.",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": false,
    "tags": [
      "cartridge",
      "detention"
    ],
    "specials": [],
    "files": [
      {
        "name": "14055 - Approved Barrett Rd Storm Report.pdf",
        "kind": "report"
      },
      {
        "name": "14055-Addendum #1-Approved.pdf",
        "kind": "addendum"
      }
    ]
  },
  {
    "id": "14069",
    "muni": "Ferndale",
    "swmm": "2014",
    "ptype": "Long Plat",
    "landuse": "Long plat",
    "system": "Combined Detention Wetvault",
    "desc": "Subdivision uses a combined detention wetvault for flow control and runoff treatment",
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
        "name": "14069-Approved Gabriela's Storm Report.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "15006",
    "muni": "Whatcom County",
    "swmm": "2014",
    "ptype": "Commercial",
    "landuse": "Commercial / industrial",
    "system": "Delta Tech Storm System - Roof infiltration trenches",
    "desc": "Project is in the Delta Tech industrial park. Each lot discharges runoff into plat required swales which overflow runoff to the parks combined detention wetpond. This project exceeded the amount of impervious allocated for the lot and had to mitigate using downspout infiltration trenches per BMP T5.10A.",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": true,
    "tags": [
      "dispersion",
      "infiltration",
      "wetpool",
      "detention"
    ],
    "specials": [
      "plat-allowance"
    ],
    "files": [
      {
        "name": "15006-Stormwater-Report-SUB3-APPROVED.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "15027",
    "muni": "Sumas",
    "swmm": "2014",
    "ptype": "Commercial  - Gas Station",
    "landuse": "Commercial / industrial",
    "system": "Permeable pavement",
    "desc": "Construct new convenience store at gas station with housing on top. Used permeable pavement for runoff treatment and to stay under requirement for flow control.",
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
        "name": "15027-STORMR SUB1 12142018.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "15036",
    "muni": "Ferndale",
    "swmm": "2014",
    "ptype": "Commercial",
    "landuse": "Commercial / industrial",
    "system": "Modular wetland, pump, detention vault",
    "desc": "Project stormwater system first collects and conveys runoff to the modular wetland unit. Runoff is then pumped into the detention vault for flow control. See \"1536 S\" for South Site Mitigation SSP.",
    "tda": 1,
    "wet": true,
    "hydro": "Yes",
    "infil": false,
    "tags": [
      "modular wetland",
      "detention"
    ],
    "specials": [
      "hydroperiod",
      "wetland"
    ],
    "files": [
      {
        "name": "15036-Stormwater-Report.pdf",
        "kind": "report"
      },
      {
        "name": "15036-Approved Timken South SSP-2023.02.07.pdf",
        "kind": "plans"
      }
    ]
  },
  {
    "id": "15036",
    "muni": "Ferndale",
    "swmm": "2019",
    "ptype": "Commercial",
    "landuse": "Commercial / industrial",
    "system": "none",
    "desc": "Simple preloading and filling of wetland (all approved beforehand). Abbreviated SSP, no hard surface.",
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
        "name": "15036-Stormwater-Report.pdf",
        "kind": "report"
      },
      {
        "name": "15036-Approved Timken South SSP-2023.02.07.pdf",
        "kind": "plans"
      }
    ]
  },
  {
    "id": "15080",
    "muni": "Whatcom County",
    "swmm": "2014",
    "ptype": "Short Plat",
    "landuse": "Short plat",
    "system": "Permeable pavement, Perforated Stub out connections",
    "desc": "project used permeable pavement to stay under flow control thresholds.",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": true,
    "tags": [
      "dispersion",
      "permeable"
    ],
    "specials": [],
    "files": [
      {
        "name": "15080-Stormwater-Report.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "15083",
    "muni": "Blaine",
    "swmm": "2014",
    "ptype": "Long Plat",
    "landuse": "Long plat",
    "system": "Contech Filters and Outfall Vault",
    "desc": "Large residential subdivision. Project used Contech StormFilters for treatment. Also installed new outfall vault with gabion basket weirs into Drayton Harbor.",
    "tda": 1,
    "wet": true,
    "hydro": "no",
    "infil": false,
    "tags": [
      "cartridge"
    ],
    "specials": [
      "wetland"
    ],
    "files": [
      {
        "name": "15083-Approved Stormwater Report- 3-22-2024.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "15085",
    "muni": "Ferndale",
    "swmm": "2014",
    "ptype": "Residential",
    "landuse": "Other / unspecified",
    "system": "Combined Detention wetvault",
    "desc": "This has two projects under this number. The owner decided to abandon the larger long plat and construct duplex. The first project used a combined detention wetvault. Second was a smaller duplex which did not require any stormwater systems other than pipes and CBs.",
    "tda": 2,
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
        "name": "15085-STORMRPT-SUB2-03262019.pdf",
        "kind": "report"
      },
      {
        "name": "15085-Stormwater-Maintenance SITE 2_12-23-19.pdf",
        "kind": "om"
      }
    ]
  },
  {
    "id": "15085",
    "muni": "Ferndale",
    "swmm": "2019",
    "ptype": "Long Plat",
    "landuse": "Long plat",
    "system": "Combined Wetpond",
    "desc": "Developing duplexes and single family homes on 2 parcels seperated by Primrose Lane. The project includes two open top wetponds for detention and basic treatment. Additionally it includes design of a drainage bypass for the upstream municipal system.",
    "tda": 2,
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
        "name": "15085-STORMRPT-SUB2-03262019.pdf",
        "kind": "report"
      },
      {
        "name": "15085-Stormwater-Maintenance SITE 2_12-23-19.pdf",
        "kind": "om"
      }
    ]
  },
  {
    "id": "16013",
    "muni": "Lynden",
    "swmm": "2014",
    "ptype": "Long Plat",
    "landuse": "Long plat",
    "system": "Infiltration, Contech StormFilter",
    "desc": "Large subdivision in Lynden. Project discharges to Nooksack River which is flow control exempt and a basic level receiving water. Project used Contech StormFilters for treatment. Lots used infiltration for management. Project had to review backwater from floodplain.",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": false,
    "tags": [
      "cartridge"
    ],
    "specials": [
      "exempt"
    ],
    "files": [
      {
        "name": "16013 - Storm Verification - 11222019.pdf",
        "kind": "verification"
      }
    ]
  },
  {
    "id": "16020",
    "muni": "Ferndale",
    "swmm": "2014",
    "ptype": "Apartments",
    "landuse": "Multifamily",
    "system": "BayFilters, detention vaults",
    "desc": "project used detention vault and BayFilters for enhanced treatment and flow control. I wrote a flood plain letter of non-significance for the fill.",
    "tda": 1,
    "wet": true,
    "hydro": "no",
    "infil": false,
    "tags": [
      "cartridge",
      "detention"
    ],
    "specials": [
      "wetland"
    ],
    "files": [
      {
        "name": "16020-Stormwater-Report_Approved.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "16045",
    "muni": "Bellingham",
    "swmm": "2014",
    "ptype": "Mixed Use",
    "landuse": "Multifamily",
    "system": "Permeable pavement for treatment, Contech Filters",
    "desc": "Used permeable pavement for runoff treatment only. Use Contech StormFilters onsite for runoff treatment.",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": false,
    "tags": [
      "permeable",
      "cartridge"
    ],
    "specials": [],
    "files": [
      {
        "name": "16045 - Storm Report Sub3 - 1-04-5.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "17004",
    "muni": "Bellingham",
    "swmm": "2014",
    "ptype": "Multi-Family",
    "landuse": "Multifamily",
    "system": "combined detention/wetvaults, Contech StormFilters",
    "desc": "Bulk of project used a combined detention wetvault followed by Contech StormFilters. ROW improvements on Bakerview used two step treatment rain with detention wetvault followed by Contech StormFilters.",
    "tda": 2,
    "wet": true,
    "hydro": "yes",
    "infil": false,
    "tags": [
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
        "name": "17004-StormReport-SUB3 - 07082019.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "17005",
    "muni": "Ferndale",
    "swmm": "2014",
    "ptype": "Long-Plat",
    "landuse": "Long plat",
    "system": "Combined Detention wetvault",
    "desc": "Project used two vaults due to steep slopes for stormwater management. This project used an energy dissipater designed using momentum equations for the outfall of the larger vault.",
    "tda": 2,
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
        "name": "17005 - Woodridge StormR Approved.pdf",
        "kind": "report"
      },
      {
        "name": "17005-STRM OM-FINAL-11232020.pdf",
        "kind": "om"
      }
    ]
  },
  {
    "id": "17009",
    "muni": "Lummi Nation",
    "swmm": "2014",
    "ptype": "Road Improvement",
    "landuse": "Road / conveyance",
    "system": "StormFilters",
    "desc": "Project discharges to a tidally influenced creek which made it flow control exempt. Used Contech StormFilters for treatment.",
    "tda": 3,
    "wet": true,
    "hydro": "no",
    "infil": false,
    "tags": [
      "cartridge"
    ],
    "specials": [
      "exempt",
      "wetland"
    ],
    "files": [
      {
        "name": "17009 - Approved Storm Report 2012.pdf",
        "kind": "report"
      },
      {
        "name": "17009 - Stormwater-Maintenance-08212019.pdf",
        "kind": "om"
      }
    ]
  },
  {
    "id": "17014",
    "muni": "Ferndale",
    "swmm": "2014",
    "ptype": "Industrial",
    "landuse": "Commercial / industrial",
    "system": "CAVFS, Detention Vault",
    "desc": "Expansion project for Metrie (wood manufacturing). Used CAVFS for enhanced treatment followed by a detention vault for flow control. Project used SSD table for detention modeling. Had to modify spreadsheet for construction constraints.",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": true,
    "tags": [
      "detention",
      "cavfs"
    ],
    "specials": [],
    "files": [
      {
        "name": "17014-Approved Metrie SSP Addendum 1.pdf",
        "kind": "addendum"
      },
      {
        "name": "17014-Approved Metrie Kiln Storm Site Plan.pdf",
        "kind": "plans"
      }
    ]
  },
  {
    "id": "17046",
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
        "name": "17046-6949 Ocean Misr Dr-StormReport-SUB2.pdf",
        "kind": "report"
      },
      {
        "name": "17046-5411 Beach Rock Loop-StormReport-SUB2.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "17049",
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
        "name": "17049-Lot 65-StormReport-sub3.pdf",
        "kind": "report"
      },
      {
        "name": "17049-Lot 79-StormReport-sub3.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "17051",
    "muni": "Ferndale",
    "swmm": "2014",
    "ptype": "Long Plat",
    "landuse": "Long plat",
    "system": "Combined detention/wetvault",
    "desc": "used combined detention/wetvault for runoff both flow control and runoff treatment",
    "tda": 3,
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
        "name": "17051-STRMRPT-NEW VAULT LOCATION-APPROVED.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "17055",
    "muni": "Ferndale",
    "swmm": "2014",
    "ptype": "Short Plat",
    "landuse": "Short plat",
    "system": "Detention Vault",
    "desc": "used a detention vault for flow control",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": false,
    "tags": [
      "detention"
    ],
    "specials": [],
    "files": [
      {
        "name": "17055 - Stormwater-Maintenance-FINAL 05162019.pdf",
        "kind": "om"
      }
    ]
  },
  {
    "id": "17073",
    "muni": "Whatcom County",
    "swmm": "2014",
    "ptype": "Single-Family Home",
    "landuse": "Single-family",
    "system": "Bioretention",
    "desc": "Bioretention swale for 19 lots in Salish breeze",
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
        "name": "17073-LOT 18 STORMR-SUB2 01172019.pdf",
        "kind": "report"
      },
      {
        "name": "17073-LOT 19 STORMR-SUB2 01172019.pdf",
        "kind": "report"
      },
      {
        "name": "17073-LOT 20 STORMR-SUB2 01172019.pdf",
        "kind": "report"
      },
      {
        "name": "17073-LOT 21 STORMR-SUB2 01172019.pdf",
        "kind": "report"
      },
      {
        "name": "17073-LOT 22 STORMR-SUB2 01172019.pdf",
        "kind": "report"
      },
      {
        "name": "17073-LOT 23 STORMR-SUB2 01182019.pdf",
        "kind": "report"
      },
      {
        "name": "17073-LOT 24 STORMR-SUB2 01182019.pdf",
        "kind": "report"
      },
      {
        "name": "17073-LOT 25 STORMR-SUB2 01232018.pdf",
        "kind": "report"
      },
      {
        "name": "17073-LOT 27 STORMR-SUB2 01232019.pdf",
        "kind": "report"
      },
      {
        "name": "17073-LOT 28 STORMR-SUB2 01232019.pdf",
        "kind": "report"
      },
      {
        "name": "17073-LOT 26 STORMR- SUB2 01232019.pdf",
        "kind": "report"
      },
      {
        "name": "17073-Lot 29 - StormReport Sub1 - 10-4-2017.pdf",
        "kind": "report"
      },
      {
        "name": "17073-Lot 30 - StormReport Sub1 - 10-6-2017.pdf",
        "kind": "report"
      },
      {
        "name": "17073-Lot 31 - StormReport Sub1 - 10-6-2017.pdf",
        "kind": "report"
      },
      {
        "name": "17073-Lot 33 - StormReport Sub1 - 10-4-2017.pdf",
        "kind": "report"
      },
      {
        "name": "17073-Lot 34 - StormReport Sub1 - 10-4-2017.pdf",
        "kind": "report"
      },
      {
        "name": "17073-Lot 35 - StormReport Sub1 - 10-4-2017.pdf",
        "kind": "report"
      },
      {
        "name": "17073-Lot 36 - StormReport Sub1 - 10-4-2017.pdf",
        "kind": "report"
      },
      {
        "name": "17073-Lot 37 - StormReport SUB1 - 10-10-2017.pdf",
        "kind": "report"
      },
      {
        "name": "17073-Lot 38 - StormReport Sub1 - 10-10-2017.pdf",
        "kind": "report"
      },
      {
        "name": "17073-Lot 39 - StormReport SUB1 - 10-10-2017.pdf",
        "kind": "report"
      },
      {
        "name": "17073-Lot 32 - Storm Report Sub 1 - 10-4-2017.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "17079",
    "muni": "Bellingham",
    "swmm": "2014",
    "ptype": "Mixed Use",
    "landuse": "Multifamily",
    "system": "Contech StormFilters",
    "desc": "Helped Matz regrade his parking lot and revise his runoff treatment system. Provided a stormwater memorandum to the COB.",
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
        "name": "17079-Old Town Flats stormwater report 6-27-16.pdf",
        "kind": "report"
      },
      {
        "name": "17079 - Storm Memo 12-21-17.pdf",
        "kind": "memo"
      }
    ]
  },
  {
    "id": "17080",
    "muni": "Blaine",
    "swmm": "2014",
    "ptype": "Single-Family Home",
    "landuse": "Single-family",
    "system": "Pavers, roof infiltration trench",
    "desc": "Exceeded allowable impervious in Semiahmoo golf coarse HOA",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": true,
    "tags": [
      "infiltration"
    ],
    "specials": [
      "plat-allowance"
    ],
    "files": [
      {
        "name": "17080-Lot 6 Stom Report SUB1 - 10-31-17.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "17084",
    "muni": "Blaine",
    "swmm": "2014",
    "ptype": "Short Plat",
    "landuse": "Short plat",
    "system": "Dispersion trenches for roof and parking. Contech StormFilter for runoff treatment.",
    "desc": "three lot subdivision. Parking are collected by Contech StormFilter and disperses runoff into the lawn which flows down to the creek/wetland. Roof uses downspout dispersion trenches per BMP T5.10B.",
    "tda": 1,
    "wet": true,
    "hydro": "yes",
    "infil": false,
    "tags": [
      "dispersion",
      "cartridge"
    ],
    "specials": [
      "hydroperiod",
      "wetland"
    ],
    "files": [
      {
        "name": "17084-STRMRPT-SUB5-08302021.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "17085",
    "muni": "Ferndale",
    "swmm": "2014",
    "ptype": "Short Plat",
    "landuse": "Short plat",
    "system": "Dispersion BMPs",
    "desc": "Two lot subdivision. Used a modified dispersion trench for stormwater management.",
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
        "name": "17085 - Storm Report Sub3 - 3-15-18.pdf",
        "kind": "report"
      }
    ]
  },
  {
    "id": "17095",
    "muni": "Lynden",
    "swmm": "2014",
    "ptype": "Apartments",
    "landuse": "Multifamily",
    "system": "Infiltration Chamber",
    "desc": "The plat for required the uses of permeable pavement for the multi-family subdivision. The contractor requested that we change it an underground infiltration chamber. Wrote tech memo to Mark from the City of Lynden.",
    "tda": 1,
    "wet": false,
    "hydro": "no",
    "infil": true,
    "tags": [
      "permeable",
      "infiltration"
    ],
    "specials": [],
    "files": [
      {
        "name": "17095 - Tech Memo for Lot 7 12-7-2017.pdf",
        "kind": "memo"
      }
    ]
  },
  {
    "id": "17096",
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
        "name": "17096 - Storm Report - SUB 1 Updated Site Plan.pdf",
        "kind": "plans"
      }
    ]
  }
]
