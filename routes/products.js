import express from 'express'; // Import express
import { getAllProducts, addProduct, updateProduct, deleteProduct, getProductById } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/", addProduct);
productRouter.patch("/:id", updateProduct);
productRouter.get("/:id", getProductById);
productRouter.delete("/:id", deleteProduct);



export default productRouter;