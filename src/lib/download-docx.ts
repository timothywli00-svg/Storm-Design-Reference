import type { Block, DraftReport } from "@/lib/report-draft"

export async function downloadDocx(report: DraftReport): Promise<void> {
  const { AlignmentType, Document, Footer, Header, Packer, PageNumber, Paragraph, TextRun } = await import("docx")

  const children = report.blocks.map((block) => paragraph(block, TextRun, Paragraph, AlignmentType))

  const doc = new Document({
    sections: [
      {
        properties: {
          page: { margin: { top: 864, bottom: 864, left: 1080, right: 1080 } },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Preliminary draft — Land Development Engineering & Surveying",
                    italics: true,
                    size: 16,
                    font: "Calibri",
                    color: "5E6872",
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: "Not for submittal  ·  Page ",
                    italics: true,
                    size: 16,
                    font: "Calibri",
                    color: "5E6872",
                    children: [PageNumber.CURRENT],
                  }),
                ],
              }),
            ],
          }),
        },
        children,
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = report.filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

function paragraph(
  block: Block,
  TextRun: typeof import("docx").TextRun,
  Paragraph: typeof import("docx").Paragraph,
  AlignmentType: typeof import("docx").AlignmentType,
) {
  if (block.kind === "kicker") {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [new TextRun({ text: block.text, bold: true, color: "8D3B2C", size: 18, font: "Calibri" })],
    })
  }
  if (block.kind === "title") {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
      children: [new TextRun({ text: block.text, bold: true, font: "Cambria", size: 32, color: "1E4A38" })],
    })
  }
  if (block.kind === "sub") {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      children: [new TextRun({ text: block.text, font: "Cambria", size: 24 })],
    })
  }
  if (block.kind === "h") {
    return new Paragraph({
      spacing: { before: 240, after: 80 },
      children: [new TextRun({ text: block.text, bold: true, font: "Cambria", size: 24, color: "1E4A38" })],
    })
  }
  if (block.kind === "meta") {
    return new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({ text: `${block.label}: `, bold: true, font: "Calibri", size: 22 }),
        new TextRun({ text: block.value, font: "Calibri", size: 22 }),
      ],
    })
  }
  if (block.kind === "note") {
    return new Paragraph({
      spacing: { before: 80, after: 80 },
      children: [new TextRun({ text: block.text, italics: true, font: "Calibri", size: 20, color: "8A5528" })],
    })
  }
  return new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text: block.text, font: "Calibri", size: 22 })],
  })
}
