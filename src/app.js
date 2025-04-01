import express from 'express';
import cors from 'cors'; // Importa el paquete cors
import rutasClientes  from './routes/clientes.routes.js';
import rutasUsuarios  from './routes/usuarios.routes.js';
import rutasProductos from './routes/productos.routes.js';
import rutasProveedor from './routes/proveedor.routes.js';
import rutasCategoria from './routes/categoria.routes.js';
import rutasVenta from './routes/ventafactura.routes.js';
//import rutasCompra from './routes/comprafactura.routes.js';

const app = express();

// Configura CORS para permitir solicitudes desde un origen específico (recomendado)
app.use(cors({
  origin: 'http://localhost:5173' // Reemplaza con el origen de tu frontend
}));

app.use(express.json());

app.use('/api', rutasClientes);
app.use('/api', rutasUsuarios);
app.use('/api', rutasProductos);
app.use('/api', rutasProveedor);
app.use('/api', rutasCategoria);
app.use('/api', rutasVenta);
//app.use('/api', rutasCompra);

app.use((req, res, next) => { 
  res.status(404).json({
    message: 'La ruta que ha especificado no se encuentra registrada.'
  });
});

export default app;