const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    image: {
        type: [String],
        required: true,
        validate: [arrayLimit, '{PATH} needs at least one image']
    },
    crop: {
        type: String,
        required: true,
        enum: ['Wheat', 'Rice', 'Corn', 'Barley', 'Soybean']
    },
    description: {
        type: String,
        required: true
    },
    sellatrupee: {
        type: Number,
        required: true
    },
    selltill: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > new Date();
            },
            message: 'selltill must be a future date'
        }
    }
}, { timestamps: true });

function arrayLimit(val) {
    return val.length > 0;
}

// Virtual to check if the post is still valid
postSchema.virtual('isActive').get(function () {
    return this.selltill > new Date();
});

module.exports = mongoose.model('Post', postSchema);