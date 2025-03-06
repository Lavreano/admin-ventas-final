import express from "express";
import { createProduct, deleteProduct, getProducts, getProductsById } from "../controllers/productController.js";
import { autenticar } from "../middleware/autenticar.js"
const router = express.Router();

router.use( express.json());

// Agregar un Producto
router.post('/', createProduct ,autenticar)

// Retorna la lista de productos
router.get('/', getProducts)

// Retorna un producto por el ID
router.get('/:id', getProductsById)

// Elimina un producto
router.delete('/:id', deleteProduct ,autenticar)

export default router;