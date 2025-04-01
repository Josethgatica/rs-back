import { pool } from '../db.js';

// Obtener todos los proveedores
export const obtenerProveedor= async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Proveedores');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los proveedores.',
      error: error
    });
  }
};

// Obtener un proveedor por su ID
export const obtenerProveedorid = async (req, res) => {
    try {
      const [result] = await pool.query('SELECT * FROM proveedor WHERE id_proveedor = ?', [req.params.id]);
      
      if (result.length <= 0) {
        return res.status(404).json({
          mensaje: `Error al leer los datos. El ID ${req.params.id} del proveedor no fue encontrado.`
        });
      }
      res.json(result[0]);
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ha ocurrido un error al leer los datos del proveedor.'
      });
    }
  };
