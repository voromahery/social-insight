import type { ContentOpportunity, SavedInsight } from '../types'

export function exportToCSV<T extends Record<string, unknown>>(
  data: T[],
  filename: string
): void {
  if (data.length === 0) return
  const headers = Object.keys(data[0])
  const rows = data.map(row =>
    headers.map(h => {
      const v = row[h]
      const str = Array.isArray(v) ? v.join('; ') : String(v ?? '')
      return `"${str.replace(/"/g, '""')}"`
    }).join(',')
  )
  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export function opportunitiesToCSV(opportunities: ContentOpportunity[]): Record<string, unknown>[] {
  return opportunities.map(o => ({
    id: o.id,
    title: o.title,
    platform: o.platform,
    market: o.market,
    industry: o.industry ?? '',
    score: o.score.total,
    confidence: o.score.confidence,
    trendDirection: o.trendDirection,
    competitorCoverage: o.competitorCoverage,
    topics: o.topics,
    contentFormats: o.contentFormats,
    mode: o.mode,
    lastUpdated: o.lastUpdated,
    description: o.description,
  }))
}

export function savedInsightsToCSV(items: SavedInsight[]): Record<string, unknown>[] {
  return items.map(i => ({
    id: i.id,
    type: i.type,
    title: i.title,
    tags: i.tags,
    collection: i.collectionName ?? '',
    notes: i.notes ?? '',
    savedAt: i.savedAt,
  }))
}
