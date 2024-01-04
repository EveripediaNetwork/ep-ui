import { z } from 'zod'

export const feedbackActionSchema = z.enum(['liked', 'disliked'])
export type FeedbackType = z.infer<typeof feedbackActionSchema>
