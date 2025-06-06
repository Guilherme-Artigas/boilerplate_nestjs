import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  companyId: z.string().uuid(),
})

export const updateProductSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
})