require("dotenv").config();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

 // Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
})

// cloudinary.api.ping()
// .then(result => console.log("✅ Cloudinary Connection Successful:", result))
//     .catch(error => console.error("❌ Cloudinary Connection Failed:", error));

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
  
    return result;
  }

 // Upload an image
//  const uploadResult = await cloudinary.uploader
//  .upload(
//      'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//          public_id: 'shoes',
//      }
//  )
//  .catch((error) => {
//      console.log(error);
//  });

// console.log(uploadResult);

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };