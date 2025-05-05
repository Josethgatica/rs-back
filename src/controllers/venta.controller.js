import { pool } from '../db.js';

// Obtener todas las ventas con sus detalles, mostrando nombres, IDs y subtotal
export const obtenerVentasConDetalles = async (req, res) => {
  try {
    const [result] = await pool.query(`
     SELECT
    v.NumeroFactura,
    dv.ID_Detalle,
    v.ID_Tiempo,
     c.Nombre As nombreCliente,
    p.nombreProducto,
    dv.Cantidad,
    dv.PrecioVenta,
    (dv.Cantidad * dv.PrecioVenta) AS subtotal
FROM
    Venta_factura v
INNER JOIN
    Cliente c ON v.ID_Cliente = c.ID_Cliente -- Corrección: relacionar por ID_Cliente
INNER JOIN
    Detalle_venta_factura dv ON v.NumeroFactura = dv.NumeroFactura
INNER JOIN
    Producto p ON dv.ID_Producto = p.ID_Producto;

    `);
    
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las ventas.',
      error: error
    });
  }
};


// Obtener todas las ventas
export const obtenerVentas = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        v.id_venta,
        v.fecha_venta,
        CONCAT(e.primer_nombre, ' ', e.primer_apellido) AS nombre_empleado,
        CONCAT(c.primer_nombre, ' ', c.primer_apellido) AS nombre_cliente,
        v.total_venta
      FROM Ventas v
      INNER JOIN Clientes c ON v.id_cliente = c.id_cliente
      INNER JOIN Empleados e ON v.id_empleado = e.id_empleado
    `);
    
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las ventas.',
      error: error
    });
  }
};


// Eliminar una venta (los detalles se eliminan automáticamente por ON DELETE CASCADE)
export const eliminarVentas = async (req, res) => {
  try {
    const { id_venta } = req.params;

    const [result] = await pool.query('DELETE FROM Ventas WHERE id_venta = ?', [id_venta]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Venta no encontrada' });
    }

    res.json({ mensaje: 'Venta y sus detalles eliminados correctamente' });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al eliminar la venta',
      error: error.message
    });
  }
};





// Registrar una nueva venta con detalles
export const registrarVenta = async (req, res) => {
  const { id_cliente, id_empleado, fecha_venta, total_venta, detalles } = req.body;

  try {
    const fechaVentaFormateada = new Date(fecha_venta).toISOString().slice(0, 19).replace('T', ' '); // Convierte a 'YYYY-MM-DD HH:mm:ss'
    const [ventaResult] = await pool.query(
      'INSERT INTO Ventas (id_cliente, id_empleado, fecha_venta, total_venta) VALUES (?, ?, ?, ?)',
      [id_cliente, id_empleado, fechaVentaFormateada , total_venta]
    );

    const id_venta = ventaResult.insertId;

    for (const detalle of detalles) {
      await pool.query(
        'INSERT INTO Detalles_Ventas (id_venta, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
        [id_venta, detalle.id_producto, detalle.cantidad, detalle.precio_unitario]
      );
      await pool.query(
        'UPDATE Productos SET stock = stock - ? WHERE id_producto = ?',
        [detalle.cantidad, detalle.id_producto]
      );
    }

    res.json({ mensaje: 'Venta registrada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar la venta', error: error.message });
  }
};



// Actualizar una venta con sus detalles
export const actualizarVenta = async (req, res) => {
  const { id_venta } = req.params;
  const { id_cliente, id_empleado, fecha_venta, total_venta, detalles } = req.body;

  try {
    // Formatear la fecha al formato MySQL
    const fechaVentaFormateada = new Date(fecha_venta).toISOString().slice(0, 19).replace('T', ' ');

    // Actualizar la venta
    const [ventaResult] = await pool.query(
      'UPDATE Ventas SET id_cliente = ?, id_empleado = ?, fecha_venta = ?, total_venta = ? WHERE id_venta = ?',
      [id_cliente, id_empleado, fechaVentaFormateada, total_venta, id_venta]
    );

    if (ventaResult.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Venta no encontrada' });
    }

    // Obtener detalles actuales para restaurar stock
    const [detallesActuales] = await pool.query(
      'SELECT id_producto, cantidad FROM Detalles_Ventas WHERE id_venta = ?',
      [id_venta]
    );

    // Restaurar stock de productos anteriores
    for (const detalle of detallesActuales) {
      await pool.query(
        'UPDATE Productos SET stock = stock + ? WHERE id_producto = ?',
        [detalle.cantidad, detalle.id_producto]
      );
    }

    // Eliminar detalles actuales
    await pool.query('DELETE FROM Detalles_Ventas WHERE id_venta = ?', [id_venta]);

    // Insertar nuevos detalles y actualizar stock
    for (const detalle of detalles) {
      await pool.query(
        'INSERT INTO Detalles_Ventas (id_venta, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
        [id_venta, detalle.id_producto, detalle.cantidad, detalle.precio_unitario]
      );
      await pool.query(
        'UPDATE Productos SET stock = stock - ? WHERE id_producto = ?',
        [detalle.cantidad, detalle.id_producto]
      );
    }

    res.json({ mensaje: 'Venta actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la venta', error: error.message });
  }
};



