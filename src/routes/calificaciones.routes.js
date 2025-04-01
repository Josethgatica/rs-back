import { Router } from 'express';
import {  obtenerCalificacion, obtenerCalificacionid } from '../controllers/Calificaciones.js';

const router = Router();

// Ruta para obtener todas las calificaciones
router.get('/calificaciones', obtenerCalificacion);

// Ruta para obtener una calificacion por su ID
router.get('/calificacion/:id', obtenerCalificacionid);



export default router;