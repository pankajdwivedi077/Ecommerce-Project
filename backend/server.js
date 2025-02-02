require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require('./routes/auth/auth-routes')
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

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})