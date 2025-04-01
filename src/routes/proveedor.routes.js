import { Router } from 'express';
import {  obtenerProveedor, obtenerProveedorid } from '../controllers/proveedor.controller.js';

const router = Router();

// Ruta para obtener todas los proveedores
router.get('/proveedor', obtenerProveedor);

// Ruta para obtener un proveedor por su ID
router.get('/proveedor/:id', obtenerProveedorid);

export default router;