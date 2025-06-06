import express from 'express'
import { companyController } from './controllers/company-controller'

const router = express.Router()

router.get('/companies/:id', companyController.showOne)
router.post('/companies/create', companyController.create)
router.delete('/companies/:id', companyController.delete)

export { router }