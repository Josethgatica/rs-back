    import { Router } from 'express';
    import { obtenerCompraConDetalles} from '../controllers/comprafactura.controller.js';

    const router = Router();

    // Ruta para obtener todos los clientes
    router.get('/comprafactura', obtenerCompraConDetalles);


    export default router;