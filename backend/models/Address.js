const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
   userId: {
     type: String,
   },
   address: {
     type: String,
   },
   city: {
     type: String,
   },
   pincode: {
     type: String,
   },
   phone: {
     type: String,
   },
  //  pincode: {
  //    type: String,
  //  },
   notes: {
     type: String,
   },
}, {timestamps: true})

const Address = mongoose.model("Address", addressSchema)

module.exports = Address;