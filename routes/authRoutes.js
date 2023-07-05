const express = require('express');
const authController = require('../controllers/authController');
const validarUsuario = require('../middleware/validateUser')
const auth = require('../middleware/auth')

const router = express.Router();

router.post('/', validarUsuario, authController.autenticarUsuario)
router.get('/', auth, authController.usuarioAutenticado)

module.exports = router