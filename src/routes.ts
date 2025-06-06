import express from 'express'
import { companyController } from './controllers/company-controller'

const router = express.Router()

router.post('/companies/create', companyController.create)
router.get('/companies/:id', companyController.showOne)

export { router }