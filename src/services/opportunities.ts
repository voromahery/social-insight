import { MOCK_OPPORTUNITIES } from '../mocks/opportunities'
import type { ContentOpportunity, FilterState } from '../types'

export function getOpportunities(filters?: FilterState): ContentOpportunity[] {
  let results = [...MOCK_OPPORTUNITIES]

  if (filters?.platform) {
    results = results.filter(o => o.platform === filters.platform)
  }
  if (filters?.mode) {
    results = results.filter(o => o.mode === filters.mode)
  }
  if (filters?.trendDirection) {
    results = results.filter(o => o.trendDirection === filters.trendDirection)
  }
  if (filters?.minScore !== undefined) {
    results = results.filter(o => o.score.total >= (filters.minScore ?? 0))
  }
  if (filters?.industry) {
    results = results.filter(o => o.industry === filters.industry)
  }
  if (filters?.topic) {
    const q = filters.topic.toLowerCase()
    results = results.filter(o =>
      o.topics.some(t => t.toLowerCase().includes(q)) ||
      o.title.toLowerCase().includes(q)
    )
  }
  if (filters?.country) {
    results = results.filter(o => o.market.toLowerCase().includes(filters.country!.toLowerCase()) || o.market === 'Global')
  }
  if (filters?.confidenceLevel) {
    results = results.filter(o => o.score.confidence === filters.confidenceLevel)
  }

  return results.sort((a, b) => b.score.total - a.score.total)
}

export function getOpportunityById(id: string): ContentOpportunity | undefined {
  return MOCK_OPPORTUNITIES.find(o => o.id === id)
}

export function getRelatedOpportunities(opportunity: ContentOpportunity, limit = 3): ContentOpportunity[] {
  return MOCK_OPPORTUNITIES
    .filter(o => o.id !== opportunity.id)
    .filter(o =>
      o.platform === opportunity.platform ||
      o.industry === opportunity.industry ||
      o.topics.some(t => opportunity.topics.includes(t))
    )
    .slice(0, limit)
}
