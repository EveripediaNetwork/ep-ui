import { z } from 'zod'

export type TGenerateInput = {
  search: string
  language?: string
  enableStream?: boolean
  isChat?: boolean
}

export const answerSourcesSchema = z.object({
  title: z.string(),
  url: z.string().nullable(),
  folderId: z.string().nullable(),
})

export const intermediateStepSchema = z.object({
  action: z.object({
    tool: z.string(),
    toolInput: z.any(),
    log: z.string(),
  }),
  observation: z.string(),
})

export const generateOutputSchema = z.object({
  search: z.string(),
  answer: z.string().optional(),
  answerSources: z.array(answerSourcesSchema),
  intermediateSteps: z.array(intermediateStepSchema).optional(),
  duration: z.number().nullable(),
  messageId: z.number().nullable(),
  chat: z
    .object({
      title: z.string(),
      id: z.string(),
      updatedAt: z.preprocess((v) => new Date(v as string), z.date()),
      createdAt: z.preprocess((v) => new Date(v as string), z.date()),
      userAddress: z.string().nullable(),
      deleted: z.boolean(),
      pinned: z.boolean(),
    })
    .optional(),
})

export type IntermediateStep = z.infer<typeof intermediateStepSchema>
