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
  },

  deleteCompany: async (id: string) => {
    try {
      const company = await prisma.company.findUnique({ where: { id } })
      if (!company) {
        return null
      }
      const deletedCompany = await prisma.company.delete({
        where: {
          id: id
        }
      })
      return deletedCompany
    } catch (error) {
      console.error('Error deleting company.', error)
      throw error
    }
  },

  updateCompany: async (id: string, data: Partial<{ name: string; adress: string }>) => {
    try {
      const company = await prisma.company.findUnique({ where: { id } })
      if (!company) {
        return null
      }
      const updatedCompany = await prisma.company.update({
        where: { id },
        data
      })
      return updatedCompany
    } catch (error) {
      console.error("Error updating company.", error)
      throw error
    }
  },

  listPaginated: async (skip: number, take: number) => {
    return await prisma.company.findMany({
      skip,
      take,
      orderBy: { name: 'asc' },
    });
  },

  countAll: async () => {
    return await prisma.company.count();
  }
}