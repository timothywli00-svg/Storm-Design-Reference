import { useState } from "react"
import { Download } from "lucide-react"
import type { Project } from "@/data/projects"
import type { Determination, Inputs } from "@/lib/determine"
import { downloadDocx } from "@/lib/download-docx"
import type { ProjectSheet } from "@/lib/project-sheet"
import { buildDraft, type Block } from "@/lib/report-draft"

export function DraftPanel({
  sheet,
  onChange,
  inputs,
  result,
  example,
}: {
  sheet: ProjectSheet
  onChange: (partial: Partial<ProjectSheet>) => void
  inputs: Inputs
  result: Determination
  example: Project | null
}) {
  const report = buildDraft(sheet, inputs, result, example)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(false)

  async function download() {
    setBusy(true)
    setError(false)
    try {
      await downloadDocx(report)
    } catch {
      setError(true)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
      <div className="space-y-4">
        <div className="rounded-card border border-line bg-panel p-4 lg:hidden">
          <p className="text-xs font-semibold tracking-wide text-muted uppercase">{result.docLabel}</p>
          <button
            type="button"
            onClick={download}
            disabled={busy}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-card bg-pine px-4 py-2.5 text-sm font-semibold text-panel disabled:opacity-60"
          >
            <Download className="size-4" aria-hidden="true" />
            {busy ? "Preparing" : "Download Word file"}
          </button>
          {error && <p className="mt-2 text-sm text-alert">The file did not download. Try again.</p>}
        </div>
        <section className="rounded-card border border-line bg-panel p-4">
          <h2 className="font-serif text-xl">Project</h2>
          <p className="mt-1 text-sm text-muted">
            These lines land on the cover and in Section 2. The areas on Determine stay as you left them.
          </p>
          <div className="mt-3 grid gap-3">
            <Field label="LDES number" value={sheet.ldes} onChange={(v) => onChange({ ldes: v })} placeholder="24104" />
            <Field label="Project name" value={sheet.name} onChange={(v) => onChange({ name: v })} placeholder="Hillside Lot 285" />
            <Field label="Site address" value={sheet.location} onChange={(v) => onChange({ location: v })} placeholder="Street, city" />
            <Field label="Tax parcel" value={sheet.parcel} onChange={(v) => onChange({ parcel: v })} placeholder="Parcel number" />
            <Field label="Applicant" value={sheet.applicant} onChange={(v) => onChange({ applicant: v })} placeholder="Owner or builder" />
            <Field label="Applicant contact" value={sheet.applicantContact} onChange={(v) => onChange({ applicantContact: v })} placeholder="Address and phone" />
            <Field label="Report date" value={sheet.date} onChange={(v) => onChange({ date: v })} />
          </div>
        </section>

        <section className="rounded-card border border-line bg-panel p-4">
          <h2 className="font-serif text-xl">Who signs it</h2>
          <div className="mt-3 grid gap-3">
            <Field label="Engineer" value={sheet.engineer} onChange={(v) => onChange({ engineer: v })} />
            <Field label="Firm" value={sheet.firm} onChange={(v) => onChange({ firm: v })} />
            <Field label="Office" value={sheet.firmAddress} onChange={(v) => onChange({ firmAddress: v })} />
            <Field label="Phone" value={sheet.firmPhone} onChange={(v) => onChange({ firmPhone: v })} />
          </div>
        </section>

        <section className="rounded-card border border-line bg-panel p-4">
          <h2 className="font-serif text-xl">What only you know</h2>
          <p className="mt-1 text-sm text-muted">Blank lines stay in brackets in the Word file so you can find them.</p>
          <div className="mt-3 grid gap-3">
            <Area label="Zoning and what is there now" value={sheet.zoning} onChange={(v) => onChange({ zoning: v })} />
            <Area label="Vegetation" value={sheet.vegetation} onChange={(v) => onChange({ vegetation: v })} />
            <Area label="Slope and where water leaves" value={sheet.topography} onChange={(v) => onChange({ topography: v })} />
            <Area label="Soils and infiltration" value={sheet.geology} onChange={(v) => onChange({ geology: v })} />
            <Area label="Proposed BMP" value={sheet.bmp} onChange={(v) => onChange({ bmp: v })} />
            <Area label="Downstream, plat allowance, or reviewer comment" value={sheet.downstream} onChange={(v) => onChange({ downstream: v })} />
          </div>
        </section>
      </div>

      <div className="lg:sticky lg:top-4 lg:self-start">
        <div className="rounded-card border border-line bg-panel p-4 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-wide text-muted uppercase">{result.docLabel}</p>
              <h2 className="mt-1 font-serif text-2xl">Preliminary report</h2>
            </div>
            <button
              type="button"
              onClick={download}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-card bg-pine px-4 py-2.5 text-sm font-semibold text-panel disabled:opacity-60"
            >
              <Download className="size-4" aria-hidden="true" />
              {busy ? "Preparing" : "Download Word file"}
            </button>
          </div>
          <p className="mt-2 text-sm text-muted">
            Opens in Word. The seal is not on it. Change the wording, attach the model, then have the engineer of record sign.
          </p>
          {error && <p className="mt-2 text-sm text-alert">The file did not download. Try again.</p>}
          {report.gaps.length > 0 && (
            <p className="mt-3 text-sm">
              <span className="font-semibold">Still open: </span>
              {report.gaps.join(", ")}.
            </p>
          )}
          {example && (
            <p className="mt-2 text-sm text-muted">
              Pattern: #{example.id} {example.muni}
              {example.system ? ` — ${example.system}` : ""}
            </p>
          )}
          <article className="mt-4 max-h-[70vh] overflow-auto rounded-card border border-line bg-paper px-5 py-6">
            {report.blocks.map((block, index) => (
              <PreviewBlock key={index} block={block} />
            ))}
          </article>
        </div>
      </div>
    </div>
  )
}

function PreviewBlock({ block }: { block: Block }) {
  if (block.kind === "kicker") {
    return <p className="text-center text-xs font-semibold tracking-wide text-alert uppercase">{block.text}</p>
  }
  if (block.kind === "title") {
    return <h3 className="mt-2 text-center font-serif text-xl text-pine">{block.text}</h3>
  }
  if (block.kind === "sub") {
    return <p className="text-center text-sm">{block.text}</p>
  }
  if (block.kind === "h") {
    return <h4 className="mt-4 font-serif text-lg text-pine">{block.text}</h4>
  }
  if (block.kind === "meta") {
    return (
      <p className="mt-1 text-sm">
        <span className="font-semibold">{block.label}: </span>
        {block.value}
      </p>
    )
  }
  if (block.kind === "note") {
    return <p className="mt-3 text-sm text-brass italic">{block.text}</p>
  }
  return <p className="mt-2 text-sm leading-relaxed">{block.text}</p>
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <label className="text-sm">
      <span className="mb-1 block font-semibold">{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-card border border-line bg-paper px-3 py-2"
      />
    </label>
  )
}

function Area({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="text-sm">
      <span className="mb-1 block font-semibold">{label}</span>
      <textarea
        value={value}
        rows={3}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-card border border-line bg-paper px-3 py-2"
      />
    </label>
  )
}
