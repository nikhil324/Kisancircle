const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const Otpverification = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    expiresAt: Date
}, { timestamps: true });



const UserOtpVerification = mongoose.model('UserOtpVerification', Otpverification);
module.exports = { UserOtpVerification };