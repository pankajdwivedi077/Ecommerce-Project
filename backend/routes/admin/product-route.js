const express = require("express");
const { handleImageUpload, addProduct, editProductById, deleteProductById, fetchAllProducts } = require('../../controllers/admin/products-controller');
const { upload } = require('../../helpers/cloundinary');

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add",  addProduct);
router.put("/edit/:id",  editProductById);
router.delete("/delete/:id",  deleteProductById);
router.get("/fetch",  fetchAllProducts);

module.exports = router;
