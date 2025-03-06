import express from "express";
import { createPayments, getPayments, getPaymentsById } from "../controllers/paymentsController.js";
const router = express.Router();

router.use( express.json());

// Retorna los medios de pago
router.get('/', getPayments)

// Retorna los medios de pago
router.get('/:id', getPaymentsById)

// Agregar un medio de pago
router.post('/', createPayments)

export default router;