import { z } from 'zod'

export const cookieNames = z.enum(['x-auth-token'])
