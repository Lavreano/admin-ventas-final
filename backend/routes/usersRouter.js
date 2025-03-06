import express from "express";
import { createUser, getUser, getUserById, login } from "../controllers/userController.js";

const router = express.Router();

router.use( express.json());

// Agregar un Usuario
router.post('/', createUser)

// Retorna la lista de Usuarios
router.get('/', getUser )

// Retorna la lista de Usuarios por id
router.get('/:id', getUserById )

router.post('/login', login)


export default router;