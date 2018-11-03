const mongoose = require('mongoose')
const timeStamp = require('mongoose-timestamp')

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // Trim Off White Space 
        trim: true
    },
    email: {
        type: String,
        required: true,
        // Trim Off White Space 
        trim: true
    },
    balance: {
        type: Number,
        default: 0
    },
})
// Created At And Updated Add Will be Added Automatically 
CustomerSchema.plugin(timeStamp);

const Customer = module.exports = mongoose.model("Customer", CustomerSchema);