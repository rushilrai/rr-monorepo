import { defineTable } from 'convex/server'
import { v } from 'convex/values'

export const sampleFields = {
  title: v.string(),
  data: v.string(),
  deleted: v.boolean(),
  createdAt: v.number(),
  updatedAt: v.number(),
}

export const sampleTable = defineTable(sampleFields).index('by_deleted', [
  'deleted',
])
