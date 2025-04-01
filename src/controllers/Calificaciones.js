import { pool } from '../db.js';

// Obtener todos la calificacion del producto
export const obtenerCalificacion= async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM calificacion');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las calificaciones.',
      error: error
    });
  }
};

// Obtener una calificacion por su ID
export const obtenerCalificacionid = async (req, res) => {
    try {
      const [result] = await pool.query('SELECT * FROM calificaciom WHERE id_calificacion = ?', [req.params.id]);
      
      if (result.length <= 0) {
        return res.status(404).json({
          mensaje: `Error al leer los datos. El ID ${req.params.id} del categoria no fue encontrado.`
        });
      }
      res.json(result[0]);
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ha ocurrido un error al leer los datos del cliente.'
      });
    }
  };
