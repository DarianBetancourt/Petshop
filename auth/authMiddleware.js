const jwt = require ("./jwt")
const User = require("../models/user")

const authMiddleware = async (req, res, next) => {
    /* Receive the authorization bearer containing the token with the encrypted user id, */
    /* stores the token in a constant after doing a split to separate it from the Bearer */
  const [, token] = req.headers.authorization.split(' ')

  try {
    /*  stores the verified and decrypted token in a constant  */  
    const payload = await jwt.verify(token)
    /* obtaining the user of the DB with the id before decrypted*/
    const user = await User.findById(payload.user)

    if (!user) {
    
        return res.status(401).send("Error")
    
    }else{
        
        req.auth = user
        next()
    }

    
  } catch (error) {
    res.status(401).send(error)
  }
}

module.exports.authMiddleware= authMiddleware;