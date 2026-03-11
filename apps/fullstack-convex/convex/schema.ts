import { defineSchema } from 'convex/server'

import { sampleTable } from './modules/sample/schema'

export default defineSchema({
  samples: sampleTable,
})
