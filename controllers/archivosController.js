const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
const Enlace = require('../models/Enlace');

module.exports = {
    subirArchivo: async (req, res, next)=> {

        const configMulter = {
      limits: { fileSize: req.usuario ? 1024 * 1024 * 10 : 1024 * 1024 },
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, __dirname + '/../uploads');
        },
        filename: (req, file, cb) => {
          const extension = file.originalname.substring(
            file.originalname.lastIndexOf('.'),
            file.originalname.length
          );
          cb(null, `${shortid.generate()}${extension}`);
        },
      }),
    };

        const upload = multer(configMulter).single('archivo');


        upload(req, res, async(error) => {
            if(!error){
                res.json({archivo: req.file.filename})
            }
            else {
                console.log(error);
                return next();
            }
        }
        
            
    )},

    eliminarArchivo: async (req, res)=> {
        console.log(req.archivo)

        try {
            fs.unlinkSync(__dirname + `/../uploads/${req.archivo}`);
            console.log('Archivo eliminado');
        }
         catch (error) {
            console.log(error);
        }
    },

    descargar: async (req, res, next) => {

      //Obtener enlace
      const enlace = await Enlace.findOne({ nombre: req.params.archivo });

      const archivo = __dirname + '/../uploads/' + req.params.archivo;

      res.download(archivo);

      //Eliminar archivo y entrada de base de datos
      const { descargas, nombre } = enlace

    //Si las descargas son iguales a 1, Borrar la entrada y borrar el archivo
    if(descargas === 1) {
        req.archivo = nombre

        await Enlace.findOneAndRemove(enlace.id)

        next()

    }
    else {
        //Si las descargas son mayores a 1, Restar 1
        descargas--;
        await enlace.save();
    }


    }
}