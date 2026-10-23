import { useQuery } from '@tanstack/react-query'
import { getPlatforms, getPlatformById } from '../services/platforms'

export function usePlatforms(search?: string) {
  return useQuery({
    queryKey: ['platforms', search],
    queryFn: () => getPlatforms(search),
    staleTime: 1000 * 60 * 10,
  })
}

export function usePlatform(id: string) {
  return useQuery({
    queryKey: ['platform', id],
    queryFn: () => getPlatformById(id),
    staleTime: 1000 * 60 * 10,
    enabled: !!id,
  })
}
