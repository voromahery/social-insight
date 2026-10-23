import { describe, it, expect } from 'vitest'
import { calculateOpportunityScore, normalize, DEFAULT_WEIGHTS } from '../lib/scoring'

describe('normalize', () => {
  it('clamps to 0 at minimum', () => {
    expect(normalize(-10)).toBe(0)
  })

  it('clamps to 100 at maximum', () => {
    expect(normalize(110)).toBe(100)
  })

  it('maps 50 to 50 on 0–100 scale', () => {
    expect(normalize(50)).toBe(50)
  })
})

describe('calculateOpportunityScore', () => {
  it('returns 0 and insufficient confidence when no inputs', () => {
    const result = calculateOpportunityScore({})
    expect(result.total).toBe(0)
    expect(result.confidence).toBe('insufficient')
    expect(result.includedComponents).toHaveLength(0)
  })

  it('uses all components when all provided', () => {
    const result = calculateOpportunityScore(
      { demand: 80, trendMomentum: 70, contentScarcity: 60, audienceRelevance: 90, monetizationPotential: 75 },
      DEFAULT_WEIGHTS
    )
    expect(result.confidence).toBe('high')
    expect(result.includedComponents).toHaveLength(5)
    expect(result.excludedComponents).toHaveLength(0)
    expect(result.total).toBeGreaterThan(0)
    expect(result.total).toBeLessThanOrEqual(100)
  })

  it('renormalizes weights when components are missing', () => {
    const result = calculateOpportunityScore({
      demand: 100,
      trendMomentum: 100,
    })
    // Should still produce a score (renormalized)
    expect(result.total).toBeGreaterThan(0)
    expect(result.excludedComponents.length).toBeGreaterThan(0)
    expect(result.confidence).toBe('low')
  })

  it('produces high score for all-100 inputs', () => {
    const result = calculateOpportunityScore({
      demand: 100,
      trendMomentum: 100,
      contentScarcity: 100,
      audienceRelevance: 100,
      monetizationPotential: 100,
    })
    expect(result.total).toBe(100)
  })

  it('produces low score for all-0 inputs', () => {
    const result = calculateOpportunityScore({
      demand: 0,
      trendMomentum: 0,
      contentScarcity: 0,
      audienceRelevance: 0,
      monetizationPotential: 0,
    })
    expect(result.total).toBe(0)
  })

  it('lists excluded component names when inputs are missing', () => {
    const result = calculateOpportunityScore({ demand: 60 })
    expect(result.excludedComponents).toContain('Trend Momentum')
    expect(result.excludedComponents).toContain('Content Scarcity')
  })
})
