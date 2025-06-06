import { productImput } from "../models/Product";
import { prisma } from "../prisma/client";

export const productService = {
	findById: async (id: string) => {
		try {
			const product = await prisma.product.findUnique({
				where: { id: id },
				include: {
					company: true,
				},
			});
			return product;
		} catch (error) {
			console.error("Error finding product by id.", error);
			throw error;
		}
	},

	createProduct: async (data: productImput) => {
		try {
			const newproduct = await prisma.product.create({
				data,
			});
			return newproduct;
		} catch (error: any) {
      console.error("Error creating product.", error)
			throw error
		}
	},

  deleteProduct: async (id: string) => {
    try {
      const product = await prisma.product.findUnique({ where: { id } })
      if (!product) {
        return null
      }
      const deletedProduct = await prisma.product.delete({
        where: {
          id: id
        }
      })
      return deletedProduct
    } catch (error) {
      console.error('Error deleting product.', error)
      throw error
    }
  },

  updateProduct: async (id: string, data: Partial<{ name: string; description: string; price: number }>) => {
    try {
      const product = await prisma.product.findUnique({ where: { id } })
      if (!product) {
        return null
      }
      const updatedProduct = await prisma.product.update({
        where: { id },
        data
      })
      return updatedProduct
    } catch (error) {
      console.error("Error updating product.", error)
      throw error
    }
  }
}