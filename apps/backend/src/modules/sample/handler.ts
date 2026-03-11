import type { FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'
import { SampleDto } from '@monorepo/dto'
import { SampleInsertSchema, SampleUpdateSchema } from './schema'
import {
  getAllSamples,
  getSampleById,
  createSample,
  updateSample,
  deleteSample,
} from './service'

export async function handleGetAllSamples(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const samples = await getAllSamples()
    const parsed = samples.map((s) => SampleDto.parse(s))

    return reply.send({ samples: parsed })
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ error: error.message })
    }

    console.error('handleGetAllSamples error', error)
    return reply.status(500).send({ error: 'Internal server error' })
  }
}

export async function handleGetSampleById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = z.object({ id: z.string() }).parse(request.params)
    const sample = await getSampleById(id)

    if (!sample) {
      return reply.status(404).send({ error: 'Sample not found' })
    }

    return reply.send({ sample: SampleDto.parse(sample) })
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ error: error.message })
    }

    console.error('handleGetSampleById error', error)
    return reply.status(500).send({ error: 'Internal server error' })
  }
}

export async function handleCreateSample(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const body = SampleInsertSchema.parse(request.body)
    const sample = await createSample(body)

    if (!sample) {
      return reply.status(500).send({ error: 'Failed to create sample' })
    }

    return reply.status(201).send({ sample: SampleDto.parse(sample) })
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ error: error.message })
    }

    console.error('handleCreateSample error', error)
    return reply.status(500).send({ error: 'Internal server error' })
  }
}

export async function handleUpdateSample(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = z.object({ id: z.string() }).parse(request.params)
    const body = SampleUpdateSchema.parse(request.body)
    const sample = await updateSample(id, body)

    if (!sample) {
      return reply.status(404).send({ error: 'Sample not found' })
    }

    return reply.send({ sample: SampleDto.parse(sample) })
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ error: error.message })
    }

    console.error('handleUpdateSample error', error)
    return reply.status(500).send({ error: 'Internal server error' })
  }
}

export async function handleDeleteSample(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = z.object({ id: z.string() }).parse(request.params)
    const sample = await deleteSample(id)

    if (!sample) {
      return reply.status(404).send({ error: 'Sample not found' })
    }

    return reply.send({ sample: SampleDto.parse(sample) })
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ error: error.message })
    }

    console.error('handleDeleteSample error', error)
    return reply.status(500).send({ error: 'Internal server error' })
  }
}
