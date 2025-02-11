const Product = require('../../models/Product')

const searchProducts = async(req, res) => {
  try{

  const { keyword } = req.params;
  if(!keyword || typeof keyword !== 'string' ){
    return res.status(400).json({
         success: false,
         message: 'keyword is required must be a string format'
    })
  }

  const regex = new RegExp(keyword, 'i')

  const createSearchQuery = {
    $or : [
        {title: regex},
        {description: regex},
        {category: regex},
        {brand: regex},
    ]
  }

  const searchResults = await Product.find(createSearchQuery);

  res.status(200).json({
    success: true,
    data: searchResults
  })

  }catch (e){
    console.log(e)
    res.status(500).json({
        success: false,
        message: 'Error in searchProducts'
    })
  }
}

module.exports = {
    searchProducts
}