const Enlace = require('../models/Enlace');
const shortid = require ('shortid')
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');


module.exports = {
    nuevoEnlace: async (req, res, next) => {

    //Revisar Errores
    const errores = validationResult(req);

    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    //Crear Objeto enlace
        const { nombre_original, nombre } = req.body;
    const enlace = new Enlace();

    enlace.url = shortid.generate();
    enlace.nombre = nombre;
    enlace.nombre_original = nombre_original;
    enlace.descargas = 1;


    //Si usuario esta autenticado
    if(req.usuario) {
        const { password, descargas } = req.body;
         
        //Asignar a enlace numero de descargas
        if(descargas){
            enlace.descargas = descargas;
        }
        //Asignar un password
        if(password){
            const salt = await bcrypt.genSalt(10)
            enlace.password = await bcrypt.hash(password,salt);
        }
        //Asignar el autor
        enlace.autor = req.usuario.id;
    }

    try {
        await enlace.save();
        res.json({msg: `${enlace.url}`})
        return next();
    } catch (error) {
        console.log(error);
    }
},

//Retorna si el enlace tiene password o no
tienepassword: async (req, res, next) => {
    const { url } = req.params;

    ///Verificar Enlace
    const enlace = await Enlace.findOne({ url });
    if(!enlace) {
       res.status(404).json({msg: 'Enlace no encontrado'})
       return next();
    }

    if(enlace.password) {
        return res.json({password: true, enlace: enlace.url})
    }

    next()

},

//Verificar si el password es correcto
verificarPassword: async (req, res, next) => { 

  const { url } = req.params; 

  const { password } = req.body

  const enlace = await Enlace.findOne({ url });
  
  //Verificar password

  if(bcrypt.compareSync(password, enlace.password)) {
    //Permitirle al usuario descargar el archivo
    next();
} else {
  return res.status(401).json({msg: 'Password Incorrecto'})
}

},


 //Obtener enlace
 obtenerEnlace: async (req, res, next) => {
    const { url } = req.params;

    ///Verificar Enlace
    const enlace = await Enlace.findOne({ url });
    if(!enlace) {
       res.status(404).json({msg: 'Enlace no encontrado'})
       return next();
    }

    //Enlace existe
    res.json({archivo: enlace.nombre, password: false})

    next()
   },

   //Obtener todos los enlaces
   todosEnlaces : async (req, res) => {
    try {
        const enlaces = await Enlace.find({}).select('url -_id')
        res.json({enlaces})
    }
     catch (error) {
        console.log(error);
    }
   }
}