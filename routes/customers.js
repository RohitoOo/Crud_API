const errors = require('restify-errors');
const Customer = require('../models/Customers')
const mongoose = require('mongoose')
const config = require('../config')
const rjwt = require('restify-jwt-community')

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
            // console.log(err.message)
            // Handling Errors - Restify Errors 
            return next(new errors.InternalError(err.message))
        }
        next();
    })

    // Add Customers ( PROTECTED ROUTE )

    server.post('/customer' , rjwt({ secret: config.JWT_SECRET }), async (req,res,next) => {

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

    // Find one customer 

    server.get('/customer/:id' , async (req,res, next) => {
        
        // Old Methods ( Promise.then OR Callbacks )
        // Customer.find({})
        // .then(customersFromDatabase => {
        //     console.log({customersFromDatabase})
        // })

        // Modern Async Await Method 

        try {
            const customerFromDatabase = await Customer.findById({_id: req.params.id})
            res.send({customerFromDatabase})
        }

        catch(err) {
            // console.log(err.message)
            // Handling Errors - Restify Errors 
            return next(new errors.InternalError(err.message))
        }
        next();
    })

    // Update Customer ( Protected Route )

    server.put('/customer/:id' , rjwt({ secret: config.JWT_SECRET }) , async (req,res, next) => {
        
        // Old Methods ( Promise.then OR Callbacks )
        // Customer.find({})
        // .then(customersFromDatabase => {
        //     console.log({customersFromDatabase})
        // })

        // Modern Async Await Method 

        try {
            // findOneAndUpdate()
            // Find with id from Params ( first Argument ) and Update with req.body ( Second Argument )
            const customerFromDatabase = await Customer.findOneAndUpdate({_id: req.params.id}, req.body)
            res.send(200)
        }

        catch(err) {
            // console.log(err.message)
            // Handling Errors - Restify Errors 
            return next(new errors.InternalError(err.message))
        }
        next();
    })

    // Delete Customer ( Protected Route )

    server.del('/customer/:id' , rjwt({ secret: config.JWT_SECRET }) , async (req,res, next) => {
        
        // Old Methods ( Promise.then OR Callbacks )
        // Customer.find({})
        // .then(customersFromDatabase => {
        //     console.log({customersFromDatabase})
        // })

        // Modern Async Await Method 

        try {
            // findOneAndDelete()
            const customerFromDatabase = await Customer.findOneAndDelete({_id: req.params.id})
            res.send(200)
        }

        catch(err) {
            // console.log(err.message)
            // Handling Errors - Restify Errors 
            return next(new errors.InternalError(err.message))
        }
        next();
    })
    
}