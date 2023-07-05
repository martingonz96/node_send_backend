const { check } = require("express-validator");

const validarEnlace = [
    check('nombre', 'Sube un Archivo').not().isEmpty(),
    check('nombre_original', 'Sube un Archivo').not().isEmpty(),
]

module.exports = validarEnlace