const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // Trim Off White Space 
        trim: true
    },
    password: {
        type: String,
        required: true
    }
})
// Created At And Updated Add Will be Added Automatically 
CustomerSchema.plugin(timeStamp);

const Customer = module.exports = mongoose.model("Customer", CustomerSchema);