import { CreateCompanyInput } from "../models/Company"
import { prisma } from "../prisma/client"

export const companyService = {
  findById: async (id: string) => {
    try {
      const company = await prisma.company.findUnique({
        where: { id: id },
        include: {
          products: true,
        },  
      })

      if (!company) {
        throw new Error('Company not found')
      }

      return company
    } catch (error) {
      console.error('Error finding company by id.', error)
      throw error
    }
  },

  createCompany: async (data: CreateCompanyInput) => {
    try {
      const newCompany = await prisma.company.create({
        data
      })
      return newCompany
    } catch (error: any) {
      if (error.code === 'P2002') {
        console.error('CNPJ already exists.')
      } else {
        console.error('Error creating company.', error)
      }
      throw error
    }
  }
}