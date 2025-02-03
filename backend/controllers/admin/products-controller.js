const { imageUploadUtil } = require("../../helpers/cloundinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
    try {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const url = "data:" + req.file.mimetype + ";base64," + b64;
      const result = await imageUploadUtil(url);
  
      res.json({
        success: true,
        result,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Error occured",
      });
    }
  };

//   add new product

  const addProduct = async (req, res) => {

      try{
       
       const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

       const newlyCreatedProduct = new Product({
         image,
         title,
         description,
         category,
         brand,
         price,
         salePrice,
         totalStock
       })

       await newlyCreatedProduct.save();
       res.status(201).json({
        success: true,
        data: newlyCreatedProduct
       });

      } catch (e){
        console.log(e)
        res.status(500).josn({
            success: false,
            message: 'Error occured in add new product'
        })
      }
  }

//   fetch all products

 const fetchAllProducts = async (req, res) => {
    try{
       
       const listOfProduct = await Product.find({});
       res.status(200).json({
        sucess: true,
        data: listOfProduct
       })

    } catch (e){
      console.log(e)
      res.status(500).josn({
          success: false,
          message: 'Error occured in fetchAllProduct'
      })
    }
 }

//   edit a product

 const editProductById = async(req, res) => {
    try{
       
       const { id } = req.params;
       const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

       const findProduct = await Product.findById(id);
       if (!findProduct) return res.status(400).json({
        success: false,
        message: "Product not found"
       })

       findProduct.title = title || findProduct.title
       findProduct.description = description || findProduct.description
       findProduct.category = category || findProduct.category
       findProduct.brand = brand || findProduct.brand
       findProduct.price = price || findProduct.price
       findProduct.salePrice = salePrice || findProduct.salePrice
       findProduct.totalStock = totalStock || findProduct.totalStock
       findProduct.image = image || findProduct.image

       await findProduct.save();
       res.status(200).json({
        success: true,
        data: findProduct
       })

    } catch (e){
      console.log(e)
      res.status(500).josn({
          success: false,
          message: 'Error occured in edit  product'
      })
    }
 }

//   delete a product

const deleteProductById = async (req, res) => {
    try{
       
        const { id } = req.params;
        const findProduct = await Product.findByIdAndDelete(id);
        if (!findProduct) return res.status(400).json({
            success: false,
            message: "Product not found"
           })
        res.status(200).json({
            sucess: true,
            message: 'Product deleted Successfully'
        })

    } catch (e){
      console.log(e)
      res.status(500).josn({
          success: false,
          message: 'Error occured in delete  product'
      })
    }
}


module.exports = {
    handleImageUpload,
    addProduct,
    fetchAllProducts,
    deleteProductById,
    editProductById
}