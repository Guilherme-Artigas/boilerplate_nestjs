import { Request, Response } from "express";
import { companyService } from "../services/companyService";
import { createCompanySchema, updateCompanySchema } from "../schemas/company-schema";

export const companyController = {
	// GET /companies/:id
	showOne: async (req: Request, res: Response) => {
		const { id } = req.params;

		if (!id || typeof id !== "string") {
			return res.status(400).json({ message: "Invalid company ID." });
		}

		try {
			const company = await companyService.findById(id);
			if (!company) {
				return res.status(404).json({ message: "Company not found." });
			}

			return res.status(200).json(company);
		} catch (error) {
			console.error("Error: ", error);
			return res.status(500).json({ message: "Internal server error." });
		}
	},

	// POST /companies/create
	create: async (req: Request, res: Response) => {
		const parseResult = createCompanySchema.safeParse(req.body);

		if (!parseResult.success) {
			return res.status(400).json({
				message: "Validation error",
				errors: parseResult.error.errors,
			});
		}
		const data = parseResult.data;

		try {
			const company = await companyService.createCompany(data);
			return res.status(201).json(company);
		} catch (error: any) {
			if (error.code === "P2002") {
				return res.status(409).json({ message: "CNPJ already exists." });
			}
			console.error("Error creating company:", error);
			return res.status(500).json({ message: "Internal server error." });
		}
	},

	// DELETE /companies/:id
	delete: async (req: Request, res: Response) => {
		const { id } = req.params;

		if (!id || typeof id !== "string") {
			return res.status(400).json({ message: "Invalid company ID." });
		}

		try {
			const companyDeleted = await companyService.deleteCompany(id);
			if (!companyDeleted) {
				return res.status(404).json({ message: "Company not found." });
			}

			return res.status(204).send();
		} catch (error) {
			console.error("Error: ", error);
			return res.status(500).json({ message: "Internal server error." });
		}
	},

	// PUT /companies/:id
	update: async (req: Request, res: Response) => {
		const { id } = req.params;

		if (!id || typeof id !== "string") {
			return res.status(400).json({ message: "Invalid company ID." });
		}

		const parseResult = updateCompanySchema.safeParse(req.body);

		if (!parseResult.success) {
			return res.status(400).json({
				message: "Validation error",
				errors: parseResult.error.errors,
			});
		}

		const updatedData = parseResult.data;

		try {
			const updatedCompany = await companyService.updateCompany(id, updatedData);
			if (!updatedCompany) {
				return res.status(404).json({ message: "Company not found." });
			}
			return res.status(200).json(updatedCompany);
		} catch (error) {
			console.error("Error updating company:", error);
			return res.status(500).json({ message: "Internal server error." });
		}
	},

	// GET /companies?page=0&limit=0
	listAll: async (req: Request, res: Response) => {
		const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 10;

		const skip = (page - 1) * limit;

		try {
			const [companies, total] = await Promise.all([companyService.listPaginated(skip, limit), companyService.countAll()]);

			return res.status(200).json({
				data: companies,
				page,
				limit,
				total,
				totalPages: Math.ceil(total / limit),
			});
		} catch (error) {
			console.error("Error listing companies:", error);
			return res.status(500).json({ message: "Internal server error." });
		}
	},

	// GET /companies/search?name=
	findByName: async (req: Request, res: Response) => {
		const { name } = req.query;

		if (!name || typeof name !== "string") {
			return res.status(400).json({ message: "Name query param is required." });
		}

		try {
			const companies = await companyService.findByName(name);
			return res.status(200).json(companies);
		} catch (error) {
			console.error("Error:", error);
			return res.status(500).json({ message: "Internal server error." });
		}
	},
};
