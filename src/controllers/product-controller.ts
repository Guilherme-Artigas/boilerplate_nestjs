import { Request, Response } from "express";
import { productService } from "../services/productService";
import { createProductSchema, updateProductSchema } from "../schemas/product-schema";

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
			});
		}
		const data = parseResult.data;

		try {
			const product = await productService.createProduct(data);
			return res.status(201).json(product);
		} catch (error: any) {
			if (error.message === "Company does not exist.") {
				return res.status(400).json({ message: error.message });
			}

			if (error.message.includes("already has a product")) {
				return res.status(409).json({ message: error.message });
			}

			return res.status(500).json({ message: "Internal server error." });
		}
	},

	// DELETE /product/:id
	delete: async (req: Request, res: Response) => {
		const { id } = req.params;

		if (!id || typeof id !== "string") {
			return res.status(400).json({ message: "Invalid product ID." });
		}

		try {
			const companyDeleted = await productService.deleteProduct(id);
			if (!companyDeleted) {
				return res.status(404).json({ message: "Product not found." });
			}

			return res.status(204).send();
		} catch (error) {
			console.error("Error: ", error);
			return res.status(500).json({ message: "Internal server error." });
		}
	},

	// PUT /products/:id
	update: async (req: Request, res: Response) => {
		const { id } = req.params;

		if (!id || typeof id !== "string") {
			return res.status(400).json({ message: "Invalid product ID." });
		}

		const parseResult = updateProductSchema.safeParse(req.body);

		if (!parseResult.success) {
			return res.status(400).json({
				message: "Validation error",
				errors: parseResult.error.errors,
			});
		}

		const updatedData = parseResult.data;

		try {
			const updatedProduct = await productService.updateProduct(id, updatedData);
			if (!updatedProduct) {
				return res.status(404).json({ message: "Product not found." });
			}
			return res.status(200).json(updatedProduct);
		} catch (error: any) {
			if (error.message === "Company does not exist.") {
				return res.status(400).json({ message: error.message });
			}

			if (error.message.includes("already has a product")) {
				return res.status(409).json({ message: error.message });
			}

			return res.status(500).json({ message: "Internal server error." });
		}
	},

	// GET /products?page=0&limit=0
	listAll: async (req: Request, res: Response) => {
		const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 10;

		const skip = (page - 1) * limit;

		try {
			const [products, total] = await Promise.all([productService.listPaginated(skip, limit), productService.countAll()]);

			return res.status(200).json({
				data: products,
				page,
				limit,
				total,
				totalPages: Math.ceil(total / limit),
			});
		} catch (error) {
			console.error("Error listing products:", error);
			return res.status(500).json({ message: "Internal server error." });
		}
	},

  // GET /products/search?name=
	findByName: async (req: Request, res: Response) => {
		const { name } = req.query;

		if (!name || typeof name !== "string") {
			return res.status(400).json({ message: "Name query param is required." });
		}

		try {
			const products = await productService.findByName(name);
			return res.status(200).json(products);
		} catch (error) {
			console.error("Error:", error);
			return res.status(500).json({ message: "Internal server error." });
		}
	},
};
