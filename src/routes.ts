import express from 'express'
import { companyController } from './controllers/company-controller'
import { productController } from './controllers/product-controller'

const router = express.Router()

router.get('/companies/:id', companyController.showOne)
router.post('/companies/create', companyController.create)
router.put('/companies/:id', companyController.update)
router.delete('/companies/:id', companyController.delete)

router.get('/products/:id', productController.showOne)
router.post('/products/create', productController.create)
router.delete('/products/:id', productController.delete)

export { router }