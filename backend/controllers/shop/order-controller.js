const Order = require("../../models/Order"); // Import Order model
const Cart = require("../../models/Cart"); // Import Cart model
const Product = require("../../models/Product")

const { paypalClient } = require("../../helpers/paypal");
const paypal = require("@paypal/checkout-server-sdk");

const createOrderController = async (req, res) => {
  try {
    const { userId, cartItems, addressInfo, totalAmount, cartId, orderStatus, paymentMethod, paymentStatus, orderDate, orderUpdateDate, paymentId, payerId } = req.body;

    // console.log("Received Order Data in Backend:", JSON.stringify(req.body, null, 2));


    // PayPal Order Data
    const orderData = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: { currency_code: "USD", value: totalAmount.toFixed(2) },
        },
      ],
      application_context: {
        return_url: `${process.env.CLIENT_URL}/shop/paypal-return`,
        cancel_url: `${process.env.CLIENT_URL}/shop/paypal-cancel`,
      },
    };

    // Create PayPal Order Request
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody(orderData);

    // Execute PayPal Order
    const response = await paypalClient.execute(request);

    if (!response || !response.result.id) {
      return res.status(500).json({ success: false, message: "Failed to create PayPal order" });
    }

    // Save Order in Database
    const newOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      totalAmount,
      orderUpdateDate,
      payerId,
      paymentId,
      paypalOrderId: response.result.id,
    });

    await newOrder.save();

    // Get Approval URL

    // console.log("PayPal Response:", JSON.stringify(response.result, null, 2));

    const approvalURL = response.result.links.find(link => link.rel === "approve")?.href;


    res.status(201).json({ success: true, approvalURL, orderId: newOrder._id });
  } catch (error) {
    console.error("Error in createOrderController:", error);
    res.status(500).json({ success: false, message: "Error creating PayPal order" });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { payerId, orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order){
      return res.status(400).json({ success: false, message: "Order cannot be find" });
    }

    // Create Capture Request

    // const request = new paypal.orders.OrdersCaptureRequest(orderId);
    // request.requestBody({});

    // Execute Capture Request

    // const response = await paypalClient.execute(request);

    // if (response.statusCode !== 201) {
    //   return res.status(500).json({ success: false, message: "Failed to capture payment" });
    // }

    // Update Order in Database
    order.paymentStatus = 'paid';
    order.orderStatus = 'confirmed';
    order.payerId = payerId;

    for(let item of order.cartItems){
      let product = await Product.findById(item.productId)

      if (!product){
        return res.status(400).json({
          success: false,
          message: `Not enough stock for this product ${product.title} `
        })
      }
      
        product.totalStock -= item.quantity
        await product.save()
      
    }

    const getCartId = order.cartId;
     await Cart.findByIdAndDelete(getCartId)

     await order.save();

     res.status(200).json({
      success: true,
      message: 'Order confirmed',
      data: order
     })

  } catch (error) {
    console.error("Error in capturePayment:", error);
    res.status(500).json({ success: false, message: "Error capturing payment" });
  }
};

const getAllOrdersByUser = async (req, res) => {

  try{

   const { userId } = req.params;
  
   const orders = await Order.find({ userId })

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

const getAllOrderDetails = async (req, res) => {

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

module.exports = {
    createOrder: createOrderController,
    capturePayment,
    getAllOrdersByUser,
    getAllOrderDetails
}