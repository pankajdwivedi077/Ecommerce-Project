require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require('./routes/auth/auth-routes')
const adminProductRouter = require('./routes/admin/product-route');
const shopProductsRouter = require('./routes/shop/product-route')
const shopCartRouer = require('./routes/shop/cart-route');
const addressRouter = require('./routes/shop/address-route')
const shopOrderRouter = require('./routes/shop/order-route')
const adminOrderRouter = require('./routes/admin/order-route')
const shopSearchRouter = require('./routes/shop/search-route')
const productReviewRouter = require('./routes/shop/review-route')
// const { cloudinary } = require('./helpers/cloundinary')

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("mongodb connected")
}).catch((error) => console.log(error))

const app = express()
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials: true
    })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductRouter)
app.use('/api/admin/orders', adminOrderRouter)
app.use('/api/shop/products', shopProductsRouter)
app.use('/api/shop/cart', shopCartRouer)
app.use('/api/shop/address', addressRouter)
app.use('/api/shop/order', shopOrderRouter)
app.use('/api/shop/search', shopSearchRouter)
app.use('/api/shop/review', productReviewRouter)


app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})