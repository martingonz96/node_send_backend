const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator'); 

module.exports = {

  nuevoUsuario: async (req, res) => {

    //Mostar Mensajes de error de express validator
    const errores = validationResult(req);
    if(!errores.isEmpty()){
      return res.status(400).json({ errores: errores.array() });
    }

    //verificar si usuario esta registrado
    const { email } = req.body;

    const usuario = await Usuario.findOne({ email });

    if(usuario){
      return res.status(400).json({ msg: 'El usuario ya esta registrado'});
    }

    //Crear Usuario y guardarlo

    const nuevoUsuario = new Usuario(req.body);


    //Hashear password
    const salt = await bcrypt.genSalt(10);

    nuevoUsuario.password = await bcrypt.hash(req.body.password, salt);

    const almacenarUsuario = await nuevoUsuario.save();

    res.json({msg : 'Usuario Creado Correctamente'});
  }

}