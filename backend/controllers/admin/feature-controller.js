const Feature = require('../../models/Features')

const addFeatureImage = async (req, res) => {

  try{
    
    const { image } = req.body;

    const featureImage = new Feature({
        image
    })

    await featureImage.save();

    res.status(200).json({
        success: true,
        data: featureImage
    })

  }catch(e){
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Error in addFeatureImage'
    })
  }
}

const getFeatureImage = async(req,res) => {
    
  try{
    
    const images = await Feature.find({})

    res.status(200).json({
        success: true,
        data: images
    })

  }catch(e){
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Error in getFeatureImage'
    })
  }
}

module.exports = {
    addFeatureImage,
    getFeatureImage
}