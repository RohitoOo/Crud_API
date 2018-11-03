const errors = require('restify-errors');
const Customer = require('../models/Customers')


module.exports = server => {
    server.get('/customers' , async (req,res, next) => {
        
        // Old Method 
        // Customer.find({})
        // .then(customersFromDatabase => {
        //     console.log({customersFromDatabase})
        // })

        // Modern Async Await Method 

        try {
            const customersFromDatabase = await Customer.find({})
            console.log({customersFromDatabase})
    
        }

        catch(err) {
            // Handling Errors - Restify Errors 
            console.log(err)
        }
       


        next();
    })
}