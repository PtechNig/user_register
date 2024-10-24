const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, 'Username exists']
    },
    tel: {
        type: String,
        required: true,
        maxlength: 11, 
        match: /^[0-9]+$/
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Register', registerSchema)