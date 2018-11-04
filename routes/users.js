const restify = require('restify');
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
module.exports = server => {
    server.post('/register', async (req,res,next) => {
        
        const { email, password} = req.body; 

        
        const user = new User({
            email,
            password
        });


        // bcrypt.genSalt(10, (err, salt) => {
        //     bcrypt.hash(user)
        // })


        const newUser = await user.save()
        .then( () => {
            console.log("Registered!",newUser )
        })

        res.send(200)

        next();

    })
}