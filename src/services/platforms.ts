import { MOCK_PLATFORMS } from '../mocks/platforms'
import type { Platform } from '../types'

export function getPlatforms(search?: string): Platform[] {
  if (!search) return MOCK_PLATFORMS
  const q = search.toLowerCase()
  return MOCK_PLATFORMS.filter(
    p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.industryRelevance.some(i => i.includes(q)) ||
      p.contentFormats.some(f => f.includes(q))
  )
}

export function getPlatformById(id: string): Platform | undefined {
  return MOCK_PLATFORMS.find(p => p.id === id)
}
