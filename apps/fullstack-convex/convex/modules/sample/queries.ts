import { query } from 'convex/_generated/server'
import { v } from 'convex/values'

import { getAll, getById } from './helpers'
import type { Doc } from 'convex/_generated/dataModel'

export const list = query({
  args: {},
  handler: async (ctx): Promise<{ samples: Doc<'samples'>[] }> => {
    const samples = await getAll(ctx)

    return { samples }
  },
})

export const get = query({
  args: { id: v.id('samples') },
  handler: async (
    ctx,
    args,
  ): Promise<{ sample: Doc<'samples'> } | { error: string }> => {
    const sample = await getById(ctx, args.id)

    if (!sample) {
      return { error: 'SAMPLE_NOT_FOUND' }
    }

    return { sample }
  },
})
