import express from 'express'; // Import express
import { addCompany, deleteCompany, getAllCompanies, getCompanyById, updateCompany } from '../controllers/companyController.js';

const companyRouter = express.Router();

companyRouter.get("/", getAllCompanies);
companyRouter.post("/", addCompany);
companyRouter.patch("/:id", updateCompany);
companyRouter.get("/:id", getCompanyById);
companyRouter.delete("/:id", deleteCompany);



export default companyRouter;