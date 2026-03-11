import type { SampleDto } from '@monorepo/dto'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:4000'

export async function fetchSamples(): Promise<{ samples: SampleDto[] }> {
  const response = await fetch(`${BACKEND_URL}/api/sample`)

  if (!response.ok) {
    throw new Error('Failed to fetch samples')
  }

  return response.json()
}

export async function fetchSampleById(
  id: string,
): Promise<{ sample: SampleDto }> {
  const response = await fetch(`${BACKEND_URL}/api/sample/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch sample')
  }

  return response.json()
}
