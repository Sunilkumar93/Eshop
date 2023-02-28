const { catchAsyncError } = require("../middleware/catchAsyncError.middleware");
const { OrderModel } = require("../Models/order.model");

// create New Order
const newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = new OrderModel({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  await order.save();

  res.status(201).send({
    error:false,
    message:'Order Placed Successfully',
    order
  })
});


module.exports={newOrder}