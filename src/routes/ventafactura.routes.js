    import { Router } from 'express';
    import { obtenerVentasConDetalles} from '../controllers/venta.controller.js'

    const router = Router();

    // Ruta para obtener todos los clientes
    router.get('/ventafactura', obtenerVentasConDetalles);


    export default router;