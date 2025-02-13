const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: {
        type: String
    },
    title: {
      type: String
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    brand: {
        type: String
    },
    price: {
        type: Number
    },
    salePrice: {
        type: Number
    },
    totalStock: {
        type: Number
    },
    averageReview: { type: Number, default: 0 } 
}, {timestamps: true})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;