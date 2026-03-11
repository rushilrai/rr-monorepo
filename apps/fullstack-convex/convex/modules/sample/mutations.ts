import { mutation } from 'convex/_generated/server'
import { v } from 'convex/values'

import { getById } from './helpers'
import type { Id } from 'convex/_generated/dataModel'

export const create = mutation({
  args: {
    title: v.string(),
    data: v.string(),
  },
  handler: async (
    ctx,
    args,
  ): Promise<{ sampleId: Id<'samples'> } | { error: string }> => {
    try {
      const sampleId = await ctx.db.insert('samples', {
        title: args.title,
        data: args.data,
        deleted: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })

      return { sampleId }
    } catch (error) {
      console.error('Error creating sample', error)

      return { error: 'SAMPLE_CREATE_FAILED' }
    }
  },
})

export const update = mutation({
  args: {
    id: v.id('samples'),
    title: v.optional(v.string()),
    data: v.optional(v.string()),
  },
  handler: async (
    ctx,
    args,
  ): Promise<{ updated: true } | { error: string }> => {
    const sample = await getById(ctx, args.id)

    if (!sample) {
      return { error: 'SAMPLE_NOT_FOUND' }
    }

    try {
      await ctx.db.patch(args.id, {
        ...(args.title !== undefined && { title: args.title }),
        ...(args.data !== undefined && { data: args.data }),
        updatedAt: Date.now(),
      })

      return { updated: true }
    } catch (error) {
      console.error('Error updating sample', error)

      return { error: 'SAMPLE_UPDATE_FAILED' }
    }
  },
})

export const remove = mutation({
  args: { id: v.id('samples') },
  handler: async (
    ctx,
    args,
  ): Promise<{ deleted: true } | { error: string }> => {
    const sample = await getById(ctx, args.id)

    if (!sample) {
      return { error: 'SAMPLE_NOT_FOUND' }
    }

    try {
      await ctx.db.patch(args.id, {
        deleted: true,
        updatedAt: Date.now(),
      })

      return { deleted: true }
    } catch (error) {
      console.error('Error deleting sample', error)

      return { error: 'SAMPLE_DELETE_FAILED' }
    }
  },
})
