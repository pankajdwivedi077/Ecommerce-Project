const Product = require('../../models/Product');

const getFilterProducts = async (req, res) => {
    try{

     const { category = [], brand = [], sortBy = "price-lowtohigh"} = req.query;

     let filters = {};

     if (category.length){
        filters.category = {$in: category.split(',')}
     }

     if (brand.length){
        filters.brand = {$in: brand.split(',')}
     }

     let sort = {}

     switch(sortBy)  {

        case 'price-lowtohigh' : 
         sort.price = 1
         break;

         case 'price-hightolow' : 
         sort.price = -1
         break;

         case 'title-atoz' : 
         sort.title = 1
         break;

         case 'title-ztoa' : 
         sort.title = -1
         break;

         default:
          sort.price = 1
         break;
     }

     const products = await Product.find(filters).sort(sort);
     res.status(200).json({
        success: true,
        data: products
     })
    } catch (e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'error in getFilterProducts function'
        })
    }
}

const getProductDetails = async (req, res) => {
    try{
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) return res.status(400).json({
         success: false,
            message: "product not found"
      })
      res.status(200).json({
        success: true,
        data: product
      })
    } catch (e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "error in getProductDetails"
        })
    }
}

module.exports = {
    getFilterProducts,
    getProductDetails
}