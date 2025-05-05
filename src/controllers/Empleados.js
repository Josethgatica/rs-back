import { pool } from '../db.js';

// Obtener todos las empleados
export const obtenerEmpleados= async (req, res) => {
  try {
    const [result] = await pool.query('select * from Empleados');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las empleados.',
      error: error
    });
  }
};