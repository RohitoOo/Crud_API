const errors = require('restify-errors');
const Customer = require('../models/Customers')
const mongoose = require('mongoose')

module.exports = server => {

    // Get Customers 
    server.get('/customers' , async (req,res, next) => {
        
        // Old Methods ( Promise.then OR Callbacks )
        // Customer.find({})
        // .then(customersFromDatabase => {
        //     console.log({customersFromDatabase})
        // })

        // Modern Async Await Method 

        try {
            const customersFromDatabase = await Customer.find({})
            res.send({customersFromDatabase})
    
        }

        catch(err) {
            // Handling Errors - Restify Errors 
            console.log(err)
        }
        next();
    })

    // Add Customers 

    server.post('/customer' , async (req,res,next) => {

        // Destructuring Req.Body Object 
        const {name,email,balance} = req.body;

        const customer = new Customer ({
         name, 
         email,
         balance
        })

        try {
             await customer.save()
            res.send({
                msg: "Customer Saved To Database",
                customer
            })
            next();
        } catch(err){
            console.log(err)
        }

        next();
    })
}