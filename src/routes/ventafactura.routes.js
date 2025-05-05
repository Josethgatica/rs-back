    import { Router } from 'express';
    import { obtenerVentasConDetalles,obtenerVentas,eliminarVentas,registrarVenta,actualizarVenta} from '../controllers/venta.controller.js'

    const router = Router();

    // Ruta para obtener todos los clientes
    router.get('/ventafactura', obtenerVentasConDetalles);


    // Ruta para obtener todas las ventas
    router.get('/obtenerventas', obtenerVentas);

    // Ruta para eliminar una venta
    router.delete('/eliminarventa/:id_venta', eliminarVentas);

// Ruta para registrar una nueva venta
router.post('/registrarventa', registrarVenta);

// Ruta para actualizar una venta
router.patch('/actualizarventa/:id_venta', actualizarVenta);

    export default router;