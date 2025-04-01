import { Router } from 'express';
import {  obtenerCategoria, obtenerCategoriaid, registrarCategoria } from '../controllers/categoria.controller.js';


const router = Router();

// Ruta para obtener todas las categorias
router.get('/categorias', obtenerCategoria);

// Ruta para obtener todos los clientes id
router.get('/categorias/:id', obtenerCategoriaid);


// ruta para registrar caregoria
router.post('/registrarcategoria', registrarCategoria);


export default router;