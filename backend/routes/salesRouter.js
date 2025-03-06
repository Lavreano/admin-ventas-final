import express from "express";
import { createSale, getSale, getSaleById } from "../controllers/saleController.js";

const router = express.Router();

router.use(express.json());

// Ruta de creación de venta
router.post("/create", createSale);

// Obtener todas las ventas
router.get("/", getSale);

// Obtener una venta por ID (Debe ir al final)
router.get("/:id", getSaleById);

export default router;
