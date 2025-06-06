import express from 'express'
import { companyController } from './controllers/company-controller'

const router = express.Router()

router.get('/companies/:id', companyController.showOne)

export { router }