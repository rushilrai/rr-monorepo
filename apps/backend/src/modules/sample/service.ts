import { eq } from 'drizzle-orm'
import { db } from '../../configs/db'
import { samplesTable } from './schema'
import type { SampleInsertSchema, SampleUpdateSchema } from './schema'

export async function getAllSamples() {
  return db.select().from(samplesTable)
}

export async function getSampleById(id: string) {
  const results = await db
    .select()
    .from(samplesTable)
    .where(eq(samplesTable.id, id))

  return results[0] ?? null
}

export async function createSample(data: SampleInsertSchema) {
  const results = await db
    .insert(samplesTable)
    .values({ id: crypto.randomUUID(), ...data })
    .returning()

  return results[0] ?? null
}

export async function updateSample(id: string, data: SampleUpdateSchema) {
  const results = await db
    .update(samplesTable)
    .set(data)
    .where(eq(samplesTable.id, id))
    .returning()

  return results[0] ?? null
}

export async function deleteSample(id: string) {
  const results = await db
    .delete(samplesTable)
    .where(eq(samplesTable.id, id))
    .returning()

  return results[0] ?? null
}
