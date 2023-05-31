const mongoose = require('mongoose')

// Create a service for USER. User model should have First Name, Last Name, Email, and Contact No.
'use strict'

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    contact: {
        type: Number,
        required: true
    }
})

const User = mongoose.model('users', userSchema)

module.exports = User;