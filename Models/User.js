const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email field required']
    },
    password: {
        type: String,
        required: [true, 'password field required']
    },
    phone: {
        unique: true,
        type: String,
    },
    birthdate: {
        type: Date,
    },
    profile_picture: {
        type: String,
    },



    isAdmin: {
        type: Boolean,
        default: false
    },

    isBlocked: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', userSchema)