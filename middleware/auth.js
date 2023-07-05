const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (authHeader) {
    // Obtener el token
    const token = authHeader.split(' ')[1];
    // Comprobar el JWT
    try {
      const usuario = jwt.verify(token, process.env.SECRETA);
      // Agregar el usuario a req
      req.usuario = usuario;

    } catch (error) {
      console.log(error);
      res.status(403).json({ msg: 'Token no válido' });
    }
  }
  
 return next(); // Continuar con el siguiente middleware o controlador
};
