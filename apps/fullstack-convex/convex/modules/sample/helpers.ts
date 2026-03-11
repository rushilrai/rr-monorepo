import type { MutationCtx, QueryCtx } from 'convex/_generated/server'
import type { Id } from 'convex/_generated/dataModel'

export const getById = async (
  ctx: QueryCtx | MutationCtx,
  id: Id<'samples'>,
) => {
  const sample = await ctx.db.get(id)

  if (!sample || sample.deleted) {
    return null
  }

  return sample
}

export const getAll = async (ctx: QueryCtx | MutationCtx) => {
  return ctx.db
    .query('samples')
    .withIndex('by_deleted', (q) => q.eq('deleted', false))
    .collect()
}
