const jwt = require ("./jwt")
const User = require("../models/user")

const authMiddleware = async (req, res, next) => {
    /* Recibe el Bearer autorization que contiene el token con el id de usuario encriptado, */ 
    /* alamacena el token en una constante luego de hacer un split para separarlo del Bearer */
  const [, token] = req.headers.authorization.split(' ')

  try {
    /* almacena en una constante el token verificado y desencriptado */  
    const payload = await jwt.verify(token)
    /* obteniendo el usuario de la BD con el id antes desencriptado*/
    const user = await User.findById(payload.user)

    if (!user) {
    
        return res.send(401)
    
    }else{
        
        req.auth = user
        next()
    }

    
  } catch (error) {
    res.status(401).send(error)
  }
}

module.exports.authMiddleware= authMiddleware;