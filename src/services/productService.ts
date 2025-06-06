import { prisma } from "../prisma/client"

export const productService = {
  findById: async (id: string) => {
    try {
      const product = await prisma.product.findUnique({
        where: { id: id },
        include: {
          company: true,
        },  
      })
      return product
    } catch (error) {
      console.error('Error finding product by id.', error)
      throw error
    }
  },
}