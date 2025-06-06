import { z } from "zod"

export const createCompanySchema = z.object({
  name: z.string().min(1, "Name is required"),
  cnpj: z.string().min(14, "CNPJ must be at least 14 characters"),
  adress: z.string().min(1, "Address is required"),
})

export type CreateCompanyInput = z.infer<typeof createCompanySchema>

export const updateCompanySchema = z.object({
  name: z.string().optional(),
  adress: z.string().optional(),
})