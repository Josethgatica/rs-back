import { Router } from 'express';
import {  obtenerCategoria, obtenerCategoriaid, registrarCategoria, eliminarCategoria, actualizarCategoria } from '../controllers/categoria.controller.js';


const router = Router();

// Ruta para obtener todas las categorias
router.get('/categorias', obtenerCategoria);

// Ruta para obtener todos los clientes id
router.get('/categorias/:id', obtenerCategoriaid);


// ruta para registrar caregoria
router.post('/registrarcategoria', registrarCategoria);

// Ruta para eliminar un cliente por su ID
router.delete('/eliminarcategoria/:id', eliminarCategoria);

// Ruta para actualizar una categoría por su ID
router.patch('/actualizarcategoria/:id', actualizarCategoria);




export default router;