const Product = require('../../models/Product');

const getFilterProducts = async (req, res) => {
    try{
     const products = await Product.find({})
     res.status(200).json({
        success: true,
        data: products
     })
    } catch (e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'error in getFilterProducts function '
        })
    }
}

module.exports = {
    getFilterProducts
}