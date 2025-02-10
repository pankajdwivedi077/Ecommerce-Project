const express = require("express");
const { getAllOrdersOfAllUsers, getAllOrderDetailsForAdmin } = require('../../controllers/admin/order-controller')

const router = express.Router();

router.get('/get', getAllOrdersOfAllUsers);
router.get('/details/:id', getAllOrderDetailsForAdmin);

module.exports = router;