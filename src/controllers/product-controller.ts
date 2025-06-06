import { Request, Response } from "express";
import { productService } from "../services/productService";

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
	}
}
