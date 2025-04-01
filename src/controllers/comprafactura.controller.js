import { pool } from '../db.js';

// Obtener todas las ventas con sus detalles, mostrando nombres, IDs y subtotal
export const obtenerComprasConDetalles = async (req, res) => {
  try {
    const [result] = await pool.query(`
     SELECT
    cf.ID_CompraFactura,
    cf.N_Factura,
    p.NombreProveedor,
    cf.Fecha,
    dcf.ID_Compra,
    prod.nombreProducto,
    dcf.Cantidad,
    dcf.Precio,
    (dcf.Cantidad * dcf.Precio) AS Subtotal
FROM
    Compra_factura cf
JOIN
    Proveedores p ON cf.ID_Proveedores = p.ID_Proveedores
JOIN
    DetalleCompraFactura dcf ON cf.ID_CompraFactura = dcf.ID_CompraFactura
JOIN
    Producto prod ON dcf.ID_Producto = prod.ID_Producto;

    `);
    
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las ventas.',
      error: error
    });
  }
};