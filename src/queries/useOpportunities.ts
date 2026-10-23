import { useQuery } from '@tanstack/react-query'
import { getOpportunities, getOpportunityById } from '../services/opportunities'
import type { FilterState } from '../types'

export function useOpportunities(filters?: FilterState) {
  return useQuery({
    queryKey: ['opportunities', filters],
    queryFn: () => getOpportunities(filters),
    staleTime: 1000 * 60 * 5,
  })
}

export function useOpportunity(id: string) {
  return useQuery({
    queryKey: ['opportunity', id],
    queryFn: () => getOpportunityById(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  })
}
