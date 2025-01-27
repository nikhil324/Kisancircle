const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    contact: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    address: {
        type: String,
        required: true
    },
    sellerType: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpiry: {
        type: Date,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;