const express = require('express');
const connectDB = require('./config/db');
const usuariosRoutes = require('./routes/usuariosRoutes');
const authRoutes = require('./routes/authRoutes');
const enlacesRoutes = require('./routes/enlacesRoutes');
const archivosRoutes = require('./routes/archivosRoutes');
const cors = require('cors');

const app = express();

//conectar a MongoDB
connectDB()

//Habilitar Cors
const opciones = {
    origin: process.env.FRONTEND_URL
}
app.use(cors(opciones));

//Leer valores de body

app.use(express.json());

//Habilitar carpeta publica

app.use(express.static('uploads'));

//Rutas App
app.use ('/api/usuarios', usuariosRoutes)
app.use ('/api/auth', authRoutes)
app.use ('/api/enlaces', enlacesRoutes)
app.use ('/api/archivos', archivosRoutes)
//puerto App

const port = process.env.PORT || 4000;

app.listen(port, '0.0.0.0', () => {
    console.log('Server is running on port 4000');
})