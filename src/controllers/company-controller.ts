import { Request, Response } from "express"
import { companyService } from "../services/companyService"

export const companyController = {
  //GET /company/:id
  showOne: async (req: Request, res: Response) => {
    const { companyId } = req.params

    try {
      const company = await companyService.findById(Number(companyId))
      if (!company) {
        return res.status(404).json({ message: "Company not found." })
      }

      return res.status(200).json(company)
    } catch (error) {
      console.error("Error: ", error)
      return res.status(500).json({ message: "Internal server error." })
    }
  },
}