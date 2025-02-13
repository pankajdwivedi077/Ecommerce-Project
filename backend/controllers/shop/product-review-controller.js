const Review = require("../../models/Review");
const Order = require("../../models/Order");
const Product = require("../../models/Product");
const mongoose = require("mongoose");

const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    const order = await Order.findOne({ userId, "cartItems.productId": productId });

    // console.log(productId, userId, userName, reviewMessage, reviewValue, order)

    if (!order){
        return res.status(403).json({
            success: false,
            message: "You need to purchase product to review it.",
          });
    }

    const existingReview = await Review.findOne({ userId, productId });

    if (existingReview){
        return res.status(400).json({
            success: false,
            message: "You already reviewed this product!",
          });
    }

    const newReview = new Review({
        productId,
        userId,
        userName,
        reviewMessage,
        reviewValue
    })

    await newReview.save();

    // console.log(newReview, "mw")

    const reviews = await Review.find({productId});
    const totalLength = reviews.length;
    const averageReview = reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0 )/ totalLength;

    await Product.findByIdAndUpdate(productId, { averageReview })

    res.status(200).json({
        success: true,
        data: newReview,
    })

  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Errro in addProductReview",
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId });

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Errro in getProductReview",
    });
  }
};

module.exports = {
  addProductReview,
  getProductReviews,
};
