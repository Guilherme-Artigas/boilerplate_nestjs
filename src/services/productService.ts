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
			const newCompany = await prisma.product.create({
				data,
			});
			return newCompany;
		} catch (error: any) {
      console.error("Error creating company.", error)
			throw error
		}
	},
}
