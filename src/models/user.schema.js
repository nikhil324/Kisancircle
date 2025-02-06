const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const userSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    contact: {
        type: Number,
        required: true,

    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,

    },
    address: {
        type: String,
        required: true
    },
    sellerType: {
        type: String,
        required: true
    }
}, { timestamps: true });



const User = mongoose.model('User', userSchema);
module.exports = User;