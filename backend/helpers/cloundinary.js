const cloudinary = require('cloudinary').v2;
const multer = require('multer');

 // Configuration
cloudinary.config({
    cloud_name: 'dgk81gypw', 
    api_key: '697359392368388', 
    api_secret: '2n0MHaWFq_nTw12dubgUkdw38fA' // Click 'View API Keys' above to copy your API secret
})

const storage = new multer.memoryStorage();

 // Upload an image
 const uploadResult = await cloudinary.uploader
 .upload(
     'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
         public_id: 'shoes',
     }
 )
 .catch((error) => {
     console.log(error);
 });

console.log(uploadResult);