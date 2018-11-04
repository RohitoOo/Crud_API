const restify = require('restify');
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const errors = require('restify-errors');
const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = server => {
    server.post('/register', async (req,res,next) => {
        
        const { email, password } = req.body; 

        
        const user = new User({
            email,
            password
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, async (err, hash) => {
                // Hash Password 
                user.password = hash

                // Save User 
                try {
                     await user.save()
                        .then( () => {
                            console.log("Registered!")
                        })
                        res.send(201)
                        next();
                    }catch(err){
                        return next(new errors.InternalErrors(err.message))
                    }
            })

        })
    })


    server.post('/auth', async (req,res,next) => {

       try {const user = await User.findOne({email: req.body.email})

        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            if(isMatch){
                // Create JWT 

                const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {expiresIn: '15m'})


                const { iat, exp } = jwt.decode(token)

                // Respond with Token

                res.send({ iat, exp, token})

                // res.send({
                //     message: "User Found",
                //     user
                // })
            }else {
                res.send({
                    message: "Authentication Failed"
                })
            }
        })}catch(err){
            return next(new errors.UnauthorizedError(err.message))

        }
        

    })
}