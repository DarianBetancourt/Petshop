const express = require("express")
const router = express.Router()
const User = require("../models/user")

router
    .route("/")
        .get( async (req , res ) => {
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
            /* const user = await User.findById(id) */
            res.send([
                {
                    message : "getting user whit id "+id,
                    user    :  user
                }
            ])
        })
        .put( async( req , res , next) => {
            //const message = "updating user whit id "+req.params.id
            req.user = await User.findById(req.params.id)
            next()
        })
        .delete( async( req, res ) => {
            res.send("deleting user whit id "+req.params.id)
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