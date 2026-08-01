export type CsvRow = Record<string, string>

export function parseCsv(text: string): CsvRow[] {
  const lines = text
    .split(/\r\n|\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  if (lines.length < 2) return []

  const headers = splitCsvLine(lines[0]).map((h) => h.trim())

  return lines.slice(1).map((line) => {
    const values = splitCsvLine(line)
    const row: CsvRow = {}
    headers.forEach((header, index) => {
      row[header] = (values[index] ?? "").trim()
    })
    return row
  })
}

function splitCsvLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let insideQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      insideQuotes = !insideQuotes
      continue
    }

    if (char === "," && !insideQuotes) {
      result.push(current)
      current = ""
      continue
    }

    current += char
  }

  result.push(current)
  return result
}