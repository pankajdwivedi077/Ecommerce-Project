const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    productId: {
        type: String
    },
    userId: {
        type: String
    },
    userName: {
        type:String
    },
    reviewMessage: {
        type: String
    },
    reviewValue: {
        type: Number
    }
}, {timestamps: true})

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;