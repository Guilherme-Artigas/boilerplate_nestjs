import { prisma } from "../prisma/client"

export const companyService = {
  findById: async (id: number) => {
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
  }
}