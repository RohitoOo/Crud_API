const mongoose = require('mongoose')
const timeStamp = require('mongoose-timestamp')
const UserSchema = new mongoose.Schema({
    email: {
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
UserSchema.plugin(timeStamp);

const User = module.exports = mongoose.model("User", UserSchema);