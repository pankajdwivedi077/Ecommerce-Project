const Address = require('../../models/Address');
const User = require('../../models/User');

const addAddress = async(req, res) => {

    try{

       const { userId, address, city, pincode, phone, notes } = req.body;

        if(!userId || !address || !city || !pincode || !phone || !notes){
            return res.status(400).json({
                success: false,
                message: 'Invalid data provided'
            })
        }

        const newlyCreatedAddress = new Address({
            userId,
            address,
            city,
            pincode,
            phone,
            notes
        })

        await newlyCreatedAddress.save();

        res.status(201).json({
            success: true,
            data: newlyCreatedAddress
        })

    }catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Something went wrong in addAddress function"
        })
    }
}

const fetchAllAddress = async(req, res) => {

    try{

    const { userId } = req.params;

    if(!userId ){
        return res.status(400).json({
            success: false,
            message: 'Userid is required'
        })
    }

    const addressList = await Address.find({ userId })

    res.status(200).json({
        success: true,
        data: addressList
    })

    }catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Something went wrong in fegtchAllAddress function"
        })
    }
}

const editAddress = async(req, res) => {

    try{

     const { userId, addressId } = req.params;
     const formData = req.body;

     if(!userId || !addressId){
        return res.status(400).json({
            success: false,
            message: 'Userid and addressId is required'
        })
    }

    const address = await Address.findByIdAndUpdate({
        _id: addressId,
        userId,
    }, formData, {new: true})

    if(!address){
        return res.status(404).json({
            success: false,
            message: "Address not founs"
        })
    }

    res.status(200).json({
            success: false,
            data: address
    })

    }catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Something went wrong in editAddress function"
        })
    }
}

const deleteAddress = async(req, res) => {

    try{

        const { userId, addressId } = req.params;

        if(!userId || !addressId){
           return res.status(400).json({
               success: false,
               message: 'Userid and addressId is required'
           })
       }
       
       const address = await Address.findByIdAndDelete({
        _id: addressId,
        userId,
       })

       if(!address){
        return res.status(404).json({
            success: false,
            message: "Address not founs"
        })
    }

    res.status(200).json({
            success: false,
            message: "Address deleted successfully"
    })

    }catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Something went wrong in deleteAddress function"
        })
    }
}

module.exports = {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress
} 