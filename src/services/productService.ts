import { Prisma } from "@prisma/client";
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
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2002") {
					throw new Error("This company already has a product with this name.");
				}
				if (error.code === "P2003") {
					throw new Error("Company does not exist.");
				}
			}

			console.error("Error creating product:", error);
			throw new Error("Error creating product.");
		}
	},

	deleteProduct: async (id: string) => {
		try {
			const product = await prisma.product.findUnique({ where: { id } });
			if (!product) {
				return null;
			}
			const deletedProduct = await prisma.product.delete({
				where: {
					id: id,
				},
			});
			return deletedProduct;
		} catch (error) {
			console.error("Error deleting product.", error);
			throw error;
		}
	},

	updateProduct: async (id: string, data: Partial<{ name: string; description: string; price: number }>) => {
		try {
			const product = await prisma.product.findUnique({ where: { id } });
			if (!product) {
				return null;
			}
			const updatedProduct = await prisma.product.update({
				where: { id },
				data,
			});
			return updatedProduct;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2002") {
					throw new Error("This company already has a product with this name.");
				}
				if (error.code === "P2003") {
					throw new Error("Company does not exist.");
				}
			}

			console.error("Error updating product:", error);
			throw new Error("Error updating product.");
		}
	},

	listPaginated: async (skip: number, take: number) => {
		return await prisma.product.findMany({
			skip,
			take,
			orderBy: { name: "asc" },
			include: {
				company: true,
			},
		});
	},

	countAll: async () => {
		return await prisma.product.count();
	},

	findByName: async (name: string) => {
		try {
			const products = await prisma.product.findMany({
				where: {
					name: {
						contains: name,
						mode: "insensitive",
					},
				},
				include: {
					company: true,
				},
			});

			return products;
		} catch (error) {
			console.error("Error finding products by name.", error);
			throw new Error("Error finding products by name.");
		}
	},
};
