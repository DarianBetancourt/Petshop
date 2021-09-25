const express = require("express")
const router = express.Router()
const User = require("../models/user")
const jwt = require("../auth/jwt")
const middle = require("../auth/authMiddleware") //middleware


/* const authMiddleware = async (req, res, next) => {
  const [, token] = req.headers.authorization.split(' ')
    
  try {
    const payload = await jwt.verify(token)
    console.log ("payload = "+payload)
    const user = await User.findById(payload.user)

    if (!user) {
      return res.send(401)
    }

    req.auth = user

    next()
  } catch (error) {
    res.status(401).send(error)
  }
} */

router.post("/signup",async(req,res)=>{
    try {
        
        const result = await User.create(req.body)
        const { password, ...user } = result.toObject()
        
        const token = jwt.sign({ user: user.id })
        
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
 
})

router.get('/login', async (req, res) => {
    
  const [, hash] = req.headers.authorization.split(' ')
  
  const [email, password] = Buffer.from(hash, 'base64')
    .toString()
    .split(':')

  try {
    const user = await User.findOne({email}).exec();
    
    
    if (!user) {
      
      return res.status(401).send("user not found")

    }else{
        if(user.isValidPassword(password)){
            
            const token = jwt.sign({ user: user.id })
            res.send({ user, token })
        
        }
       
        else{

           return res.status(401).send("password error") 
        
        }

    }

    
  } catch (error) {
    console.log(error)  
    res.send(error)
  }
})


router
    .route("/")
        .get(middle.authMiddleware, async (req , res ) => {
            const users = await User.find({},{password:0}).sort({createAt : 'desc'})
            res.json(users) 
        })
        .post( async( req , res , next ) => {
            req.user = new User()
            console.log(req.body.name)
            next()
        },save_edit("new"))

router
    .route("/:id")
        .get( async( req , res ) => {
            const id = req.params.id
            const user = await User.findById(id,{password:0}) 
            res.send([
                {
                    message : "getting user whit id "+id,
                    user    :  user
                }
            ])
        })
        .put( async( req , res , next) => {
            req.user = await User.findById(req.params.id)
            next()
        })
        .delete( async( req, res ) => {
            await User.findByIdAndDelete(req.params.id);
            res.send("User whit id:"+req.params.id+" deleted" )
        })

function save_edit(path) {
    return async (req, res) => {
        let user         = req.user
        user.name        = req.body.name
        user.email       = req.body.email
        user.password    = req.body.password
        
        try {
            console.log(user); 
            user = await user.save();
            if(path === "new"){
                res.status("200").send(`O usuario : "${user.name}" foi salvado com sucesso`)
            }
            else{
                res.status("200").send(`O usuario : "${user.name}" foi actualizado com sucesso`)
            }
            
            
        } catch(error){
            console.log(error)
            res.send("error")
        }
      }
}
module.exports = router