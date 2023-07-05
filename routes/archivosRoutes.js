const express = require('express');
const archivosController = require('../controllers/archivosController');
const validarUsuario = require('../middleware/validateUser')
const auth = require('../middleware/auth')
//Subida de archivos

const router = express.Router();

router.post('/' , auth, archivosController.subirArchivo);

router.get('/:archivo', archivosController.descargar, archivosController.eliminarArchivo);

module.exports = router;