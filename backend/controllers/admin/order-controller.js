const Order = require('../../models/Order')
const Cart = require('../../models/Cart')

const getAllOrdersOfAllUsers = async (req, res) => {

  try{
  
   const orders = await Order.find({ })

   if (!orders.length){
    return res.status(400).json({
      success: false,
      message: 'No order found'
    })
   }

   res.status(200).json({
     success: true,
     data:  orders
   })

  }catch (error) {
    console.error("Error in getAllorderByUser:", error);
    res.status(500).json({ success: false, message: "Error getAllorderByUser" });
  }
}

const getAllOrderDetailsForAdmin = async (req, res) => {

  try{
 
    const { id } = req.params;

    const order = await Order.findById(id)

    if (!order){
     return res.status(400).json({
       success: false,
       message: 'order not found'
     })
    }

    res.status(200).json({
      success: true,
      data:  order
    })


  }catch (error) {
    console.error("Error in getAllorderByUser:", error);
    res.status(500).json({ success: false, message: "Error getAllorderByUser" });
  }
}

const updateOrderStatus = async (req, res) => {

  try{

   const { id } = req.params;
   const { orderStatus } = req.body;

   const order = await Order.findById(id)

   if (!order){
    return res.status(400).json({
      success: false,
      message: 'order not found'
    })
   }

   await Order.findByIdAndUpdate(id, {orderStatus})

   res.status(200).json({
    success: true,
    message:  'Order status is updated successfully'
  })

  }catch(e){
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Error in updateOrderStatus'
    })
  }
}

module.exports = {
    getAllOrdersOfAllUsers,
    getAllOrderDetailsForAdmin,
    updateOrderStatus
}