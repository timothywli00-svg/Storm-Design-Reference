import { useEffect, useMemo, useState, type ReactNode } from "react"
import { projects, type Project } from "@/data/projects"
import {
  determine,
  emptyInputs,
  fmtSf,
  labelBand,
  type Inputs,
  type LandUse,
  type Manual,
  type Wetland,
  type YesNo,
} from "@/lib/determine"
import { buildOutline } from "@/lib/outline"
import { matchProjects } from "@/lib/match"
import { presets } from "@/lib/presets"
import { DraftPanel } from "@/components/draft-panel"
import { emptyBits, INFIL_LABEL, sizeBmps, type InfilSoil, type SiteBits } from "@/lib/bmp"
import { emptySheet, type ProjectSheet } from "@/lib/project-sheet"

const JURISDICTIONS = [
  "Whatcom County",
  "Ferndale",
  "Bellingham",
  "Blaine",
  "Lynden",
  "Lummi Nation",
  "Skagit County",
  "Sudden Valley",
  "Sumas",
  "Mount Vernon",
  "Edmonds",
  "San Juan County",
]

const LANDS: { id: LandUse; label: string }[] = [
  { id: "sfr", label: "Single-family" },
  { id: "short", label: "Short plat" },
  { id: "long", label: "Long plat" },
  { id: "multi", label: "Multifamily" },
  { id: "commercial", label: "Commercial / industrial" },
  { id: "road", label: "Road" },
]

const STORAGE = "ldes-storm-desk-v1"

type Tab = "home" | "design" | "draft" | "library" | "outline"

export function StormDesk() {
  const [tab, setTab] = useState<Tab>("home")
  const [inputs, setInputs] = useState<Inputs>(emptyInputs)
  const [sheet, setSheet] = useState<ProjectSheet>(emptySheet)
  const [bits, setBits] = useState<SiteBits>(emptyBits)
  const [pinned, setPinned] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE)
      if (!raw) return
      const saved = JSON.parse(raw) as {
        inputs?: Inputs
        sheet?: ProjectSheet
        bits?: SiteBits
        pinned?: string | null
        tab?: string
      }
      if (saved.inputs) setInputs({ ...emptyInputs(), ...saved.inputs })
      if (saved.sheet) setSheet({ ...emptySheet(), ...saved.sheet })
      if (saved.bits) setBits({ ...emptyBits(), ...saved.bits })
      if (saved.pinned) setPinned(saved.pinned)
      if (saved.tab === "determine" || saved.tab === "design") setTab("design")
      else if (saved.tab === "draft" || saved.tab === "library" || saved.tab === "outline" || saved.tab === "home") setTab(saved.tab)
    } catch {
      /* ignore broken storage */
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify({ inputs, sheet, bits, pinned, tab }))
  }, [inputs, sheet, bits, pinned, tab])

  const result = useMemo(() => determine(inputs), [inputs])
  const bmp = useMemo(() => sizeBmps(inputs, bits), [inputs, bits])
  const matches = useMemo(() => matchProjects(inputs, result, 6), [inputs, result])
  const pinnedProject = projects.find((p) => p.id === pinned) ?? matches[0]?.project ?? null
  const outline = useMemo(
    () => buildOutline(inputs, result, pinnedProject),
    [inputs, result, pinnedProject],
  )

  function patch(partial: Partial<Inputs>) {
    setInputs((prev) => ({ ...prev, ...partial }))
  }

  function patchSheet(partial: Partial<ProjectSheet>) {
    setSheet((prev) => ({ ...prev, ...partial }))
  }

  function patchBits(partial: Partial<SiteBits>) {
    setBits((prev) => ({ ...prev, ...partial }))
  }

  async function copyOutline() {
    try {
      await navigator.clipboard.writeText(outline)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper text-ink lg:grid lg:grid-cols-[17.5rem_minmax(0,1fr)]">
      <aside className="border-b border-line bg-sidebar px-5 py-6 lg:sticky lg:top-0 lg:h-screen lg:overflow-auto lg:border-r lg:border-b-0">
        <p className="text-xs font-extrabold tracking-wide text-brass uppercase">Design reference</p>
        <h1 className="mt-2 max-w-[10ch] text-4xl leading-none font-extrabold">Storm Design</h1>
        <p className="mt-3 text-sm text-muted">Thresholds, BMP sizes, past reports, and a draft you can edit.</p>
        <nav className="mt-6 grid grid-cols-2 gap-1.5 lg:grid-cols-1" aria-label="Sections">
          {(
            [
              ["home", "Home"],
              ["design", "Design"],
              ["library", "Library"],
              ["draft", "Draft"],
              ["outline", "Outline"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={
                "rounded-card px-3 py-2.5 text-left text-sm font-bold " +
                (tab === id ? "bg-panel text-pine" : "text-ink hover:bg-panel")
              }
            >
              {label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="min-w-0 px-4 py-6 sm:px-8 lg:px-10">
        {tab === "home" && <Home onOpen={setTab} />}
        {tab === "design" && (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <section className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {presets.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setInputs(p.inputs)}
                    className="rounded-card border border-line bg-panel px-3 py-2 text-left text-sm hover:border-brass"
                  >
                    <span className="font-semibold">{p.label}</span>
                    <span className="mt-0.5 block text-xs text-muted">{p.blurb}</span>
                  </button>
                ))}
              </div>
              <Form inputs={inputs} onChange={patch} />
              <BmpCard bits={bits} onChange={patchBits} />
            </section>
            <aside className="lg:sticky lg:top-4 lg:self-start">
              <Result
                inputs={inputs}
                bits={bits}
                bmp={bmp}
                result={result}
                matches={matches}
                pinned={pinnedProject?.id ?? null}
                onDraft={() => setTab("draft")}
                onPin={(id) => {
                  setPinned(id)
                  setTab("draft")
                }}
              />
            </aside>
          </div>
        )}
        {tab === "draft" && (
          <DraftPanel
            sheet={sheet}
            onChange={patchSheet}
            inputs={inputs}
            result={result}
            example={pinnedProject}
          />
        )}
        {tab === "library" && (
          <Library
            onUse={(id) => {
              setPinned(id)
              setTab("draft")
            }}
          />
        )}
        {tab === "outline" && (
          <section className="grid gap-4 lg:grid-cols-[18rem_minmax(0,1fr)]">
            <div className="rounded-card border border-line bg-panel p-4">
              <h2 className="font-serif text-xl">Starting point</h2>
              <p className="mt-1 text-sm text-muted">
                {pinnedProject ? `#${pinnedProject.id} ${pinnedProject.muni}` : "No example pinned"}
              </p>
              <p className="mt-2 text-sm">{pinnedProject?.system || pinnedProject?.desc || "Run Determine to rank examples."}</p>
              <button
                type="button"
                onClick={() => setTab("library")}
                className="mt-4 text-sm font-semibold text-brass"
              >
                Choose a different report
              </button>
            </div>
            <div className="rounded-card border border-line bg-panel p-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-serif text-xl">Draft headings</h2>
                <button
                  type="button"
                  onClick={copyOutline}
                  className="rounded-card bg-brass px-3 py-2 text-sm font-semibold text-panel"
                >
                  {copied ? "Copied" : "Copy outline"}
                </button>
              </div>
              <pre className="mt-4 max-h-[70vh] overflow-auto whitespace-pre-wrap font-sans text-sm leading-relaxed text-ink">
                {outline}
              </pre>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

function Home({ onOpen }: { onOpen: (tab: Tab) => void }) {
  return (
    <section>
      <p className="text-xs font-extrabold text-brass uppercase">Updated for the 2024 manual</p>
      <h2 className="mt-2 max-w-3xl text-4xl leading-none font-extrabold">Fast reference for stormwater design</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="rounded-card border border-line bg-panel p-6 shadow-sm md:col-span-3">
          <p className="text-xs font-extrabold text-brass uppercase">Daily workflow</p>
          <h3 className="mt-2 text-2xl leading-tight font-extrabold">Start with the areas. Size the BMP. Then write.</h3>
          <p className="mt-3 max-w-xl text-sm text-muted">
            The same roof and hard-surface numbers drive the minimum requirements, the downspout trench, and the draft. You do not type the flow into a second calculator.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["2024 SWMMWW", "MR1-MR9", "Dispersion", "Infiltration"].map((item) => (
              <span key={item} className="rounded-full border border-line bg-pine-soft px-3 py-1 text-sm font-semibold">
                {item}
              </span>
            ))}
          </div>
          <button type="button" onClick={() => onOpen("design")} className="mt-5 rounded-card bg-pine px-4 py-2.5 text-sm font-bold text-panel">
            Open the design sheet
          </button>
        </article>
        <Metric
          n="2,000"
          text="sf or more of new plus replaced hard surface, or 7,000 sf or more of land disturbance, requires a stormwater site plan (MR1) through MR5. Below both, no stormwater management report is required. A Construction SWPPP is not required for review either; consider the MR2 elements that apply."
          href="https://fortress.wa.gov/ecy/ezshare/wq/SWMMs/2024SWMMWW/Content/Topics/Shared/MRsAndCEs/ApplicabilityOfTheMRs_CEs.htm"
          link="I-3.3 thresholds"
        />
        <Metric
          n="5,000"
          text="sf or more of new plus replaced hard surface requires every minimum requirement, MR1 through MR9. The same full set applies if the project converts 3/4 acre of vegetation to lawn or landscape, or 2.5 acres of native vegetation to pasture."
          href="https://fortress.wa.gov/ecy/ezshare/wq/SWMMs/2024SWMMWW/Content/Topics/Shared/MRsAndCEs/ApplicabilityOfTheMRs_CEs.htm"
          link="I-3.3 thresholds"
        />
        <Metric
          n="10,000"
          text="sf or more of effective impervious surface in a TDA requires flow control under MR7, unless that TDA discharges to a flow-control exempt receiving water."
          href="https://fortress.wa.gov/ecy/ezshare/wq/SWMMs/2024SWMMWW/Content/Topics/Shared/MRsAndCEs/MR7_CE6.htm"
          link="MR7 flow control"
        />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Topic
          kicker="Roof"
          title="Downspout dispersion and infiltration"
          body="T5.10B is 10 feet of trench per 700 sf of roof, and never more than 50 feet on one trench. T5.10A lengths follow the soil row, 20 to 190 feet per 1,000 sf."
          checks={["25 ft of vegetated flow path past a trench.", "50 ft before a slope over 15%.", "Silt and clay cannot take an infiltration trench."]}
        />
        <Topic
          kicker="Lot"
          title="Full dispersion"
          body="BMP T5.30 wants preserved native area at least 6.5 times the hard surface draining to it, and a 100-foot flow path. Short of that, only 10% of the lot can be fully dispersed."
          checks={["Do not count a wetland as the dispersion area.", "Roofs still need a T5.10B device into that area.", "Model the rest of the hard surface."]}
        />
        <Topic
          kicker="Pipe"
          title="Conveyance, not a pond"
          body="A capacity letter is Manning and the 100-year, 15-minute flow. The pipe card is the full-flow capacity. WWHM still has to supply the flow."
          checks={["Name the as-built you scaled.", "Use the plat’s impervious cap if it has one.", "One sentence the reviewer can stamp against."]}
        />
      </div>
    </section>
  )
}

function Metric({ n, text, href, link }: { n: string; text: string; href: string; link: string }) {
  return (
    <article className="flex min-h-52 flex-col rounded-card border border-line bg-panel p-5 shadow-sm">
      <p className="text-5xl font-extrabold text-pine">{n}</p>
      <p className="mt-3 text-sm text-muted">{text}</p>
      <a className="mt-auto pt-3 text-sm font-bold" href={href} target="_blank" rel="noreferrer">
        {link}
      </a>
    </article>
  )
}

function Topic({ kicker, title, body, checks }: { kicker: string; title: string; body: string; checks: string[] }) {
  return (
    <article className="rounded-card border border-line bg-panel p-5 shadow-sm">
      <p className="text-xs font-extrabold text-brass uppercase">{kicker}</p>
      <h3 className="mt-1 text-lg font-extrabold">{title}</h3>
      <p className="mt-2 text-sm text-muted">{body}</p>
      <ul className="mt-3 list-disc space-y-1 pl-4 text-sm">
        {checks.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </article>
  )
}

function BmpCard({ bits, onChange }: { bits: SiteBits; onChange: (p: Partial<SiteBits>) => void }) {
  return (
    <Card title="Size the practice">
      <p className="mb-3 text-sm text-muted">These use the hard-surface areas above. Change the roof and the trench length changes with it.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Num label="Roof area" value={bits.roofSf} onChange={(n) => onChange({ roofSf: n })} />
        <Num label="Vegetated flow path" value={bits.flowPathFt} onChange={(n) => onChange({ flowPathFt: n })} unit="ft" />
        <Num label="Path before a slope over 15%" value={bits.steepPathFt} onChange={(n) => onChange({ steepPathFt: n })} unit="ft" />
        <Num label="Preserved native area" value={bits.nativeSf} onChange={(n) => onChange({ nativeSf: n })} />
        <label className="text-sm sm:col-span-2">
          <span className="mb-1 block font-semibold">Soil for a downspout infiltration trench</span>
          <select
            value={bits.infilSoil}
            onChange={(e) => onChange({ infilSoil: e.target.value as InfilSoil })}
            className="w-full rounded-card border border-line bg-paper px-3 py-2"
          >
            {(Object.keys(INFIL_LABEL) as InfilSoil[]).map((id) => (
              <option key={id} value={id}>
                {INFIL_LABEL[id]}
              </option>
            ))}
          </select>
        </label>
        <Num label="Pipe diameter" value={bits.pipeIn} onChange={(n) => onChange({ pipeIn: n })} unit="in" />
        <Num label="Pipe slope" value={bits.pipeSlope} onChange={(n) => onChange({ pipeSlope: n })} unit="ft/ft" />
        <Num label="Manning n" value={bits.manningN} onChange={(n) => onChange({ manningN: n })} unit="" />
      </div>
    </Card>
  )
}

function Form({ inputs, onChange }: { inputs: Inputs; onChange: (p: Partial<Inputs>) => void }) {
  return (
    <div className="space-y-5">
      <Card title="Project">
        <div className="grid gap-3 sm:grid-cols-2">
          <Select label="Jurisdiction" value={inputs.jurisdiction} onChange={(v) => onChange({ jurisdiction: v })} options={JURISDICTIONS} />
          <Select
            label="Land use"
            value={inputs.landUse}
            onChange={(v) => onChange({ landUse: v as LandUse })}
            options={LANDS.map((l) => l.label)}
            values={LANDS.map((l) => l.id)}
          />
          <Select
            label="What you are writing"
            value={inputs.intent}
            onChange={(v) => onChange({ intent: v as Inputs["intent"] })}
            options={["Design the site", "Downstream capacity only", "Lot over the plat allowance"]}
            values={["design", "capacity", "plat"]}
          />
          <Select
            label="Manual the permit uses"
            value={inputs.manual}
            onChange={(v) => onChange({ manual: v as Manual })}
            options={["2024", "2019", "2014"]}
          />
        </div>
        <label className="mt-3 flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            className="mt-1 size-4"
            checked={inputs.developedSite}
            onChange={(e) => onChange({ developedSite: e.target.checked })}
          />
          <span>
            Site is already developed (redevelopment). Leave off for a vacant or largely undeveloped lot.
            <span className="mt-1 block text-muted">
              Existing hard surface is {inputs.lotSf > 0 ? `${Math.round((inputs.existingHardSf / inputs.lotSf) * 100)}%` : "—"} of the lot.
              Your memo uses 35% to name new vs redevelopment. The 2024 manual does not. This checkbox is what the desk uses.
            </span>
          </span>
        </label>
      </Card>

      <Card title="Areas">
        <div className="grid gap-3 sm:grid-cols-2">
          <Num label="Lot area" value={inputs.lotSf} onChange={(n) => onChange({ lotSf: n })} />
          <Num label="Existing hard surface" value={inputs.existingHardSf} onChange={(n) => onChange({ existingHardSf: n })} />
          <Num label="New hard surface" value={inputs.newHardSf} onChange={(n) => onChange({ newHardSf: n })} />
          <Num label="Replaced hard surface" value={inputs.replacedHardSf} onChange={(n) => onChange({ replacedHardSf: n })} />
          <Num label="Land disturbance" value={inputs.disturbSf} onChange={(n) => onChange({ disturbSf: n })} />
          <Num label="Vegetation to lawn" value={inputs.lawnSf} onChange={(n) => onChange({ lawnSf: n })} />
          <Num label="Vegetation to pasture" value={inputs.pastureSf} onChange={(n) => onChange({ pastureSf: n })} />
          <Num label="Pollution-generating hard surface" value={inputs.pghsSf} onChange={(n) => onChange({ pghsSf: n })} />
          <Num label="Pollution-generating pervious" value={inputs.pgpsSf} onChange={(n) => onChange({ pgpsSf: n })} />
          <Num label="Effective impervious area" value={inputs.eiaSf} onChange={(n) => onChange({ eiaSf: n })} />
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="size-4"
            checked={inputs.valueOver50}
            onChange={(e) => onChange({ valueOver50: e.target.checked })}
          />
          Improvements exceed 50% of the assessed value of existing site improvements
        </label>
      </Card>

      <Card title="Feasibility and overlays">
        <div className="grid gap-3 sm:grid-cols-2">
          <Select label="Infiltration feasible" value={inputs.infiltration} onChange={(v) => onChange({ infiltration: v as YesNo })} options={["Unknown", "Yes", "No"]} values={["unknown", "yes", "no"]} />
          <Select label="Dispersion feasible" value={inputs.dispersion} onChange={(v) => onChange({ dispersion: v as YesNo })} options={["Unknown", "Yes", "No"]} values={["unknown", "yes", "no"]} />
          <Select
            label="Wetland"
            value={inputs.wetland}
            onChange={(v) => onChange({ wetland: v as Wetland })}
            options={["None", "Nearby, no discharge", "Discharge to wetland"]}
            values={["none", "buffer", "discharge"]}
          />
        </div>
        <div className="mt-3 grid gap-2 text-sm">
          <Check label="Lake Whatcom or Sudden Valley (phosphorus)" checked={inputs.lakeWhatcom} onChange={(v) => onChange({ lakeWhatcom: v })} />
          <Check label="Whatcom special district — Samish, Padden, Birch Bay, Drayton Harbor" checked={inputs.specialDistrict} onChange={(v) => onChange({ specialDistrict: v })} />
          <Check label="Flow-control exempt receiving water" checked={inputs.flowExempt} onChange={(v) => onChange({ flowExempt: v })} />
          <Check label="High-use site that needs oil control" checked={inputs.oilUse} onChange={(v) => onChange({ oilUse: v })} />
          <Check label="UIC well (drywell or infiltration chamber)" checked={inputs.uic} onChange={(v) => onChange({ uic: v })} />
        </div>
      </Card>
    </div>
  )
}

function Result({
  inputs,
  bits,
  bmp,
  result,
  matches,
  pinned,
  onPin,
  onDraft,
}: {
  inputs: Inputs
  bits: SiteBits
  bmp: ReturnType<typeof sizeBmps>
  result: ReturnType<typeof determine>
  matches: { project: Project; score: number }[]
  pinned: string | null
  onPin: (id: string) => void
  onDraft: () => void
}) {
  return (
    <div className="space-y-3">
      <div className="rounded-card border border-line bg-panel p-4">
        <p className="text-xs font-semibold tracking-wide text-muted uppercase">Write this</p>
        <h2 className="mt-1 font-serif text-2xl leading-tight">{result.docLabel}</h2>
        <p className="mt-2 text-sm">
          {labelBand(result.band)} under the {inputs.manual} manual, treated as {result.development}.
        </p>
        <button
          type="button"
          onClick={onDraft}
          className="mt-3 w-full rounded-card bg-pine px-3 py-2.5 text-sm font-semibold text-panel"
        >
          Write the draft
        </button>
        <div className="mt-4 border-t border-line pt-3 text-sm">
          <p className="font-semibold">Downspout dispersion, BMP T5.10B</p>
          <p className="mt-1">
            {fmtSf(bits.roofSf)} of roof needs {bmp.dispersionFt} ft of trench
            {bmp.dispersionNotched ? ", with a notched grade board" : ""}.
            {bmp.dispersionOver ? " That roof is over 3,500 sf, so 50 ft is not enough. Split the roof." : ""}
          </p>
          <p className="mt-1 text-muted">
            Splash block {bmp.splashOk ? "has" : "does not have"} 50 ft of vegetated flow path.
            Trench outlet {bmp.trenchPathOk ? "has" : "needs"} 25 ft to a property line or impervious edge,
            and {bmp.steepOk ? "has" : "needs"} 50 ft before a slope steeper than 15%.
          </p>
          <p className="mt-3 font-semibold">Downspout infiltration, BMP T5.10A</p>
          {bmp.infilFt == null ? (
            <p className="mt-1">This soil is too tight for a downspout infiltration trench.</p>
          ) : (
            <p className="mt-1">
              {bmp.infilFt.toFixed(0)} ft of trench, in {bmp.infilRuns} run{bmp.infilRuns === 1 ? "" : "s"} so no run exceeds 100 ft from the inlet.
            </p>
          )}
          <p className="mt-3 font-semibold">Full dispersion, BMP T5.30</p>
          <p className="mt-1">
            New plus replaced hard surface needs {fmtSf(bmp.nativeNeed)} of preserved forest or native vegetation (6.5 times the hard surface).
            You entered {fmtSf(bits.nativeSf)}. {bmp.nativeOk && bmp.pathOk ? "The area and the 100-ft flow path both clear." : "It does not clear both tests."}{" "}
            If the native area is short, the manual still allows full dispersion of up to 10% of the lot ({fmtSf(bmp.tenPercentSf)}).
          </p>
          <p className="mt-3 font-semibold">Pipe, flowing full</p>
          <p className="mt-1">
            A {bits.pipeIn}-inch pipe at {bits.pipeSlope} ft/ft and n = {bits.manningN} carries about {bmp.pipeCfs.toFixed(2)} cfs. This is conveyance capacity, not a WWHM flow-control result.
          </p>
        </div>
        <ul className="mt-3 space-y-1 text-sm">
          {result.steps.map((s) => (
            <li key={s.n} className="flex gap-2">
              <span className={s.on ? "font-semibold text-pine" : "text-muted"}>{s.on ? "On" : "Off"}</span>
              <span className={s.on ? "" : "text-muted"}>{s.n}</span>
            </li>
          ))}
        </ul>
      </div>

      {result.conflicts.length > 0 && (
        <div className="rounded-card border border-alert bg-alert-soft p-4">
          <h3 className="font-semibold text-alert">Checklist does not match the manual</h3>
          <ul className="mt-2 space-y-2 text-sm">
            {result.conflicts.map((c) => (
              <li key={c.title}>
                <span className="font-semibold">{c.title}. </span>
                {c.detail}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-muted">
            Office sheet would say {labelBand(result.officeBand)}
            {result.officeDevelopment !== "unknown" ? ` and would call this ${result.officeDevelopment} from the 35% test` : ""}.
            New plus replaced hard surface is {fmtSf(result.newPlusReplaced)}.
          </p>
        </div>
      )}

      {result.locals.length > 0 && (
        <div className="rounded-card border border-brass bg-brass-soft p-4 text-sm">
          <h3 className="font-semibold">On top of the manual</h3>
          <ul className="mt-2 space-y-2">
            {result.locals.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-card border border-line bg-panel p-4">
        <h3 className="font-semibold">Closest reports</h3>
        <ul className="mt-2 space-y-2">
          {matches.map(({ project }) => (
            <li key={project.id}>
              <button
                type="button"
                onClick={() => onPin(project.id)}
                className={
                  "w-full rounded-card border px-3 py-2 text-left text-sm " +
                  (pinned === project.id ? "border-pine bg-pine-soft" : "border-line hover:border-brass")
                }
              >
                <span className="font-semibold">#{project.id}</span>
                <span className="text-muted"> · {project.muni}</span>
                <span className="mt-0.5 block">{project.system || project.ptype || "See the file"}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Library({ onUse }: { onUse: (id: string) => void }) {
  const [q, setQ] = useState("")
  const [muni, setMuni] = useState("All")
  const [land, setLand] = useState("All")
  const [tag, setTag] = useState("All")
  const munis = ["All", ...Array.from(new Set(projects.map((p) => p.muni))).sort()]
  const lands = ["All", ...Array.from(new Set(projects.map((p) => p.landuse))).sort()]
  const tags = ["All", "dispersion", "bioretention", "permeable", "infiltration", "cartridge", "detention", "wetpool", "modular wetland", "phosphorus", "exempt", "hydroperiod", "uic"]

  const shown = projects.filter((p) => {
    if (muni !== "All" && p.muni !== muni) return false
    if (land !== "All" && p.landuse !== land) return false
    if (tag === "phosphorus" || tag === "exempt" || tag === "hydroperiod" || tag === "uic") {
      if (!p.specials.includes(tag)) return false
    } else if (tag !== "All" && !p.tags.includes(tag)) return false
    if (!q.trim()) return true
    const blob = `${p.id} ${p.muni} ${p.ptype} ${p.system} ${p.desc}`.toLowerCase()
    return blob.includes(q.trim().toLowerCase())
  })

  return (
    <section>
      <div className="grid gap-3 sm:grid-cols-4">
        <label className="text-sm sm:col-span-1">
          <span className="mb-1 block font-semibold">Search</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Project number or BMP"
            className="w-full rounded-card border border-line bg-panel px-3 py-2"
          />
        </label>
        <Filter label="Place" value={muni} options={munis} onChange={setMuni} />
        <Filter label="Land use" value={land} options={lands} onChange={setLand} />
        <Filter label="Approach" value={tag} options={tags} onChange={setTag} />
      </div>
      <p className="mt-3 text-sm text-muted">{shown.length} projects from the office index</p>
      <ul className="mt-3 grid gap-3">
        {shown.map((p) => (
          <li key={p.id} className="rounded-card border border-line bg-panel p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-serif text-xl">
                #{p.id} <span className="text-base text-muted">{p.muni}</span>
              </h3>
              <span className="text-xs font-semibold tracking-wide text-muted uppercase">
                {p.swmm ? `${p.swmm} manual` : "Manual year not logged"} · {p.landuse}
              </span>
            </div>
            <p className="mt-1 text-sm font-semibold">{p.system || p.ptype || "No system noted on the index"}</p>
            <p className="mt-1 text-sm text-ink">{p.desc || "The spreadsheet row has a number and files, but no written approach."}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {p.files.map((f) => (
                <span key={f.name} className="rounded-full bg-paper px-2 py-1 text-xs text-muted">
                  {f.kind} · {f.name}
                </span>
              ))}
            </div>
            <button type="button" onClick={() => onUse(p.id)} className="mt-3 text-sm font-semibold text-brass">
              Use this report as the pattern
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-card border border-line bg-panel p-4">
      <h2 className="font-serif text-xl">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  )
}

function Num({
  label,
  value,
  onChange,
  unit = "sf",
}: {
  label: string
  value: number
  onChange: (n: number) => void
  unit?: string
}) {
  return (
    <label className="text-sm">
      <span className="mb-1 block font-semibold">{label}</span>
      <span className="flex items-center gap-2">
        <input
          inputMode="decimal"
          value={Number.isFinite(value) ? String(value) : ""}
          onChange={(e) => onChange(Number(e.target.value.replace(/,/g, "")) || 0)}
          className="w-full rounded-card border border-line bg-paper px-3 py-2"
        />
        {unit ? <span className="text-xs text-muted">{unit}</span> : null}
      </span>
    </label>
  )
}

function Select({
  label,
  value,
  onChange,
  options,
  values,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  values?: string[]
}) {
  return (
    <label className="text-sm">
      <span className="mb-1 block font-semibold">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-card border border-line bg-paper px-3 py-2"
      >
        {options.map((opt, i) => (
          <option key={opt} value={values ? values[i] : opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  )
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-start gap-2">
      <input type="checkbox" className="mt-1 size-4" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  )
}

function Filter({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (v: string) => void
}) {
  return (
    <label className="text-sm">
      <span className="mb-1 block font-semibold">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-card border border-line bg-panel px-3 py-2">
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </label>
  )
}

