import { Request, Response } from "express";
import { productService } from "../services/productService";
import { createProductSchema } from "../schemas/product-schema";

export const productController = {
	// GET /products/:id
	showOne: async (req: Request, res: Response) => {
		const { id } = req.params;

		if (!id || typeof id !== "string") {
			return res.status(400).json({ message: "Invalid product ID." });
		}

		try {
			const product = await productService.findById(id);
			if (!product) {
				return res.status(404).json({ message: "Product not found." });
			}

			return res.status(200).json(product);
		} catch (error) {
			console.error("Error: ", error);
			return res.status(500).json({ message: "Internal server error." });
		}
	},

	// POST /companies/create
	create: async (req: Request, res: Response) => {
		const parseResult = createProductSchema.safeParse(req.body);

		if (!parseResult.success) {
			return res.status(400).json({
				message: "Validation error",
				errors: parseResult.error.errors,
			})
		}
		const data = parseResult.data

		try {
			const product = await productService.createProduct(data)
			return res.status(201).json(product)
		} catch (error: any) {
			console.error("Error creating product:", error)
			return res.status(500).json({ message: "Internal server error." })
		}
	},
};
