import { z } from 'zod'
import { dateTimeField } from './utils.js'

export const SampleDto = z.object({
  id: z.string(),
  data: z.string(),
  createdAt: dateTimeField,
})

export type SampleDto = z.infer<typeof SampleDto>
