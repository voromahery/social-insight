import type { OpportunityScore, ConfidenceLevel, UserPreferences } from '../types'

export interface ScoreInputs {
  demand?: number        // 0-100 audience demand signal
  trendMomentum?: number // 0-100 trend direction strength
  contentScarcity?: number // 0-100 how scarce good content is
  audienceRelevance?: number // 0-100 match to user preferences
  monetizationPotential?: number // 0-100 pathways available
}

export interface ScoreWeights {
  demand: number
  trendMomentum: number
  contentScarcity: number
  audienceRelevance: number
  monetizationPotential: number
}

export const DEFAULT_WEIGHTS: ScoreWeights = {
  demand: 0.30,
  trendMomentum: 0.20,
  contentScarcity: 0.20,
  audienceRelevance: 0.15,
  monetizationPotential: 0.15,
}

const COMPONENT_LABELS: Record<keyof ScoreInputs, string> = {
  demand: 'Audience Demand',
  trendMomentum: 'Trend Momentum',
  contentScarcity: 'Content Scarcity',
  audienceRelevance: 'Audience Relevance',
  monetizationPotential: 'Monetization Potential',
}

export function normalize(value: number, min = 0, max = 100): number {
  if (max === min) return 0
  return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))
}

const ALL_COMPONENTS = Object.keys(COMPONENT_LABELS) as Array<keyof ScoreInputs>

export function calculateOpportunityScore(
  inputs: ScoreInputs,
  weights: ScoreWeights = DEFAULT_WEIGHTS
): OpportunityScore {
  const components: Array<{ key: keyof ScoreInputs; value: number; weight: number }> = []
  const excluded: string[] = []

  for (const key of ALL_COMPONENTS) {
    const v = inputs[key]
    if (v !== undefined && v !== null) {
      components.push({ key, value: normalize(v), weight: weights[key] })
    } else {
      excluded.push(COMPONENT_LABELS[key])
    }
  }

  if (components.length === 0) {
    return {
      total: 0,
      demand: 0,
      trendMomentum: 0,
      contentScarcity: 0,
      audienceRelevance: 0,
      monetizationPotential: 0,
      includedComponents: [],
      excludedComponents: Object.values(COMPONENT_LABELS),
      confidence: 'insufficient',
      explanation: 'No data available to calculate a score.',
    }
  }

  // Renormalize weights for available components
  const totalWeight = components.reduce((sum, c) => sum + c.weight, 0)
  const total = components.reduce((sum, c) => sum + (c.value * c.weight) / totalWeight, 0)

  const confidence = determineConfidence(components.length, ALL_COMPONENTS.length)

  const scores: Record<string, number> = {}
  for (const c of components) {
    scores[c.key] = c.value
  }

  return {
    total: Math.round(total),
    demand: scores['demand'] ?? 0,
    trendMomentum: scores['trendMomentum'] ?? 0,
    contentScarcity: scores['contentScarcity'] ?? 0,
    audienceRelevance: scores['audienceRelevance'] ?? 0,
    monetizationPotential: scores['monetizationPotential'] ?? 0,
    includedComponents: components.map(c => COMPONENT_LABELS[c.key]),
    excludedComponents: excluded,
    confidence,
    explanation: buildExplanation(components, excluded, totalWeight, confidence),
  }
}

function determineConfidence(available: number, total: number): ConfidenceLevel {
  const ratio = available / total
  if (ratio === 1) return 'high'
  if (ratio >= 0.6) return 'medium'
  if (ratio >= 0.4) return 'low'
  return 'insufficient'
}

function buildExplanation(
  components: Array<{ key: keyof ScoreInputs; value: number; weight: number }>,
  excluded: string[],
  _totalWeight: number,
  confidence: ConfidenceLevel
): string {
  const parts: string[] = []
  parts.push(`Score based on ${components.length} of ${components.length + excluded.length} components.`)
  if (excluded.length > 0) {
    parts.push(`Missing: ${excluded.join(', ')}. Remaining weights renormalized to sum to 100%.`)
  }
  parts.push(`Confidence: ${confidence}.`)
  if (confidence !== 'high') {
    parts.push('Scores with different available components should not be directly compared.')
  }
  return parts.join(' ')
}

export function adjustWeightsForPreferences(prefs: UserPreferences): ScoreWeights {
  const w = { ...DEFAULT_WEIGHTS }
  // Boost monetization for monetization-focused goals
  if (prefs.primaryGoal === 'monetization') {
    w.monetizationPotential = 0.25
    w.demand = 0.25
    w.trendMomentum = 0.20
    w.contentScarcity = 0.15
    w.audienceRelevance = 0.15
  }
  return w
}
