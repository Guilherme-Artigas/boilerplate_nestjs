import { describe } from 'node:test'
import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  companyId: z.string().uuid(),
})