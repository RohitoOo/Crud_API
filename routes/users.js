const restify = require('restify');
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
module.exports = server => {
    server.post('/register', async (req,res,next) => {
        
        const { email, password } = req.body; 

        
        const user = new User({
            email,
            password
        });

        console.log("Not HASED",user.password)

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
                        console.log(err)
                    }
            })

       

        })



   


       

    })
}