import { describe, it, expect } from 'vitest'
import { calculateOpportunityScore, normalize, DEFAULT_WEIGHTS } from './scoring'

describe('normalize', () => {
  it('clamps values to 0-100', () => {
    expect(normalize(150)).toBe(100)
    expect(normalize(-10)).toBe(0)
  })

  it('returns correct normalized value', () => {
    expect(normalize(50, 0, 100)).toBe(50)
    expect(normalize(0, 0, 100)).toBe(0)
    expect(normalize(100, 0, 100)).toBe(100)
  })

  it('handles equal min and max', () => {
    expect(normalize(50, 50, 50)).toBe(0)
  })
})

describe('calculateOpportunityScore', () => {
  it('returns 0 and insufficient confidence when no inputs', () => {
    const result = calculateOpportunityScore({})
    expect(result.total).toBe(0)
    expect(result.confidence).toBe('insufficient')
    expect(result.includedComponents).toHaveLength(0)
  })

  it('calculates correctly with all inputs', () => {
    const result = calculateOpportunityScore({
      demand: 80,
      trendMomentum: 60,
      contentScarcity: 70,
      audienceRelevance: 75,
      monetizationPotential: 65,
    })
    expect(result.total).toBeGreaterThan(0)
    expect(result.total).toBeLessThanOrEqual(100)
    expect(result.confidence).toBe('high')
    expect(result.includedComponents).toHaveLength(5)
    expect(result.excludedComponents).toHaveLength(0)
  })

  it('renormalizes weights when components are missing', () => {
    calculateOpportunityScore({
      demand: 80,
      trendMomentum: 80,
      contentScarcity: 80,
      audienceRelevance: 80,
      monetizationPotential: 80,
    })

    // With only demand and trend (both 80), renormalized result should still be ~80
    const partialResult = calculateOpportunityScore({
      demand: 80,
      trendMomentum: 80,
    })

    expect(partialResult.total).toBeCloseTo(80, 0)
    expect(partialResult.confidence).toBe('low') // 2/5 = 0.4
    expect(partialResult.excludedComponents).toHaveLength(3)
  })

  it('scores equal inputs at that value regardless of weights', () => {
    const result = calculateOpportunityScore({
      demand: 60,
      trendMomentum: 60,
      contentScarcity: 60,
      audienceRelevance: 60,
      monetizationPotential: 60,
    })
    expect(result.total).toBe(60)
  })

  it('applies default weights correctly', () => {
    const result = calculateOpportunityScore({
      demand: 100,
      trendMomentum: 0,
      contentScarcity: 0,
      audienceRelevance: 0,
      monetizationPotential: 0,
    })
    // demand weight is 0.30, so score ≈ 30
    expect(result.total).toBe(30)
  })

  it('marks medium confidence with 3 of 5 components', () => {
    const result = calculateOpportunityScore({
      demand: 70,
      trendMomentum: 70,
      contentScarcity: 70,
    })
    expect(result.confidence).toBe('medium')
  })

  it('uses custom weights when provided', () => {
    const customWeights = { ...DEFAULT_WEIGHTS, demand: 1.0, trendMomentum: 0, contentScarcity: 0, audienceRelevance: 0, monetizationPotential: 0 }
    const result = calculateOpportunityScore({ demand: 80 }, customWeights)
    expect(result.total).toBe(80)
  })

  it('includes explanation text', () => {
    const result = calculateOpportunityScore({ demand: 70 })
    expect(result.explanation).toBeTruthy()
    expect(typeof result.explanation).toBe('string')
  })
})
