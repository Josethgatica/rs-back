import { Router } from 'express';
import {
  totalVentasPorDia,
  totalVentasPorMes,
  totalVentasPorAnio,
  totalVentasPorEmpleado,
  cantidadVentasPorEmpleado,
  totalVentasPorEmpleadoMes,
  totalComprasPorCliente,
  cantidadComprasPorCliente,
  totalComprasPorClienteMes,
  productosMasVendidosPorCantidad,
  productosMasVendidosPorValor,
  ventasProductosPorMes,
  totalVentasPorCategoria,
  totalVentasPorCategoriaMes,
  productosBajoStock,
  stockPorCategoria,
  ventasPorClienteEmpleadoMes,
  ventasPorCategoriaEmpleadoMes,
  ventasPorClienteCategoriaMes,
  promedioVentasPorEmpleado,
  promedioVentasPorEmpleadoMes,
  clientesFrecuentes,
  clientesFrecuentesPorMes,
  productosMasCompradosPorCliente,
  categoriasMasCompradasPorCliente,
  totalVentasPorDiaSemana,
  ventasPorCategoriaDiaSemana,
  productosMayorRotacion,
  categoriasMayorRotacion,
} from '../controllers/estadisticas.controller.js';

const router = Router();

// 1. Análisis de Ventas por Dimensión Tiempo
router.get('/totalventaspordia', totalVentasPorDia);
router.get('/totalventaspormes', totalVentasPorMes);
router.get('/totalventasporanio', totalVentasPorAnio);

// 2. Análisis de Ventas por Empleado
router.get('/totalventasporempleado', totalVentasPorEmpleado);
router.get('/cantidadventasporempleado', cantidadVentasPorEmpleado);
router.get('/totalventasporempleadomes', totalVentasPorEmpleadoMes);

// 3. Análisis de Ventas por Cliente
router.get('/totalcomprasporcliente', totalComprasPorCliente);
router.get('/cantidadcomprasporcliente', cantidadComprasPorCliente);
router.get('/totalcomprasporclientemes', totalComprasPorClienteMes);

// 4. Análisis de Ventas por Producto
router.get('/productosmasvendidosporcantidad', productosMasVendidosPorCantidad);
router.get('/productosmasvendidosporvalor', productosMasVendidosPorValor);
router.get('/ventasproductospormes', ventasProductosPorMes);

// 5. Análisis de Ventas por Categoría
router.get('/totalventasporcategoria', totalVentasPorCategoria);
router.get('/totalventasporcategoriames', totalVentasPorCategoriaMes);

// 10. Análisis de Stock
router.get('/productosbajostock', productosBajoStock);
router.get('/stockporcategoria', stockPorCategoria);

// 11. Análisis Combinado de Ventas
router.get('/ventasporclienteempleadomes', ventasPorClienteEmpleadoMes);
router.get('/ventasporcategoriaempleadomes', ventasPorCategoriaEmpleadoMes);
router.get('/ventasporclientecategoriames', ventasPorClienteCategoriaMes);

// 13. Análisis de Eficiencia de Empleados
router.get('/promedioventasporempleado', promedioVentasPorEmpleado);
router.get('/promedioventasporempleadomes', promedioVentasPorEmpleadoMes);

// 14. Análisis de Clientes Frecuentes
router.get('/clientesfrecuentes', clientesFrecuentes);
router.get('/clientesfrecuentespormes', clientesFrecuentesPorMes);

// 15. Análisis de Productos por Cliente
router.get('/productosmascompradosporcliente', productosMasCompradosPorCliente);
router.get('/categoriasmascompradasporcliente', categoriasMasCompradasPorCliente);

// 16. Análisis de Ventas por Día de la Semana
router.get('/totalventaspordiasemana', totalVentasPorDiaSemana);
router.get('/ventasporcategoriadiasemana', ventasPorCategoriaDiaSemana);

// 17. Análisis de Rotación de Inventario
router.get('/productosmayorrotacion', productosMayorRotacion);
router.get('/categoriasmayorrotacion', categoriasMayorRotacion);

export default router;