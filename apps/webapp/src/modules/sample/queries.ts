import { queryOptions, useQuery } from '@tanstack/react-query'

import { fetchSamples, fetchSampleById } from './service'

export const samplesQueryOptions = queryOptions({
  queryKey: ['samples'],
  queryFn: fetchSamples,
})

export const sampleByIdQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['samples', id],
    queryFn: () => fetchSampleById(id),
  })

export function useSamplesQuery() {
  return useQuery(samplesQueryOptions)
}

export function useSampleByIdQuery(id: string) {
  return useQuery(sampleByIdQueryOptions(id))
}
