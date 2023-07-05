const express = require('express');
const enlacesController = require('../controllers/enlacesController');
const auth = require('../middleware/auth')
const validateEnlace = require('../middleware/validateEnlace');
const archivosController = require('../controllers/archivosController');

const router = express.Router();

router.post('/', auth, validateEnlace, enlacesController.nuevoEnlace);
router.get('/', auth, enlacesController.todosEnlaces);

router.get('/:url', enlacesController.tienepassword, enlacesController.obtenerEnlace)

router.post('/:url' , enlacesController.verificarPassword, enlacesController.obtenerEnlace)

module.exports = router;