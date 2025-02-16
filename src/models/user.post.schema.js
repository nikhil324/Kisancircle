const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: [String],
        required: true,
    },
    crop: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    sellatrupee: {
        type: Number,
        required: true,
    },
    selltill: {
        type: Date,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
