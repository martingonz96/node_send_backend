const { check } = require('express-validator');

const validarUsuario = [
    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 })
]

module.exports = validarUsuario
