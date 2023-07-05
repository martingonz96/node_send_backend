const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require ('jsonwebtoken');

module.exports = {

    autenticarUsuario: async (req, res, next) => {
        //Revisar si hay errores
        let errores = validationResult(req);

        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() })
        }

        //Buscar el usuario para ver si esta registrado
        const { email, password } = req.body

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            res.status(401).json({ msg: 'El usuario no existe' });
            return next();
        }

        //Verificar el password y autenticar el usuario
        const passwordCorrecto = await bcrypt.compare(password, usuario.password);
        if (!passwordCorrecto) {
            res.status(401).json({ msg: 'Password Incorrecto' });
            return next();
        }
        //Crear JWT
        const token = jwt.sign({
            nombre: usuario.nombre,
            id: usuario._id,
            email: usuario.email
        }, process.env.SECRETA, {
            expiresIn: '8h',
        })

        res.json({ token })
    },

    usuarioAutenticado: (req, res, next) => {
        
    res.json({ usuario: req.usuario})

}  

}