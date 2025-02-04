const express = require("express");
const { getFilterProducts } = require('../../controllers/shop/products-controller');

const router = express.Router();

router.get("/fetch",  getFilterProducts);

module.exports = router;
