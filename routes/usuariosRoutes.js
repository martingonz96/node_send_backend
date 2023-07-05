const express = require('express');
const usuariosControllers = require('../controllers/usuariosControllers');
const validarRegistro = require('../middleware/validationRegister');
// const { check } = require('express-validator');

const router = express.Router();

router.post('/', validarRegistro , usuariosControllers.nuevoUsuario)

module.exports = router