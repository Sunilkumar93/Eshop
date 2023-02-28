const { catchAsyncError } = require("../middleware/catchAsyncError.middleware");
const { OrderModel } = require("../Models/order.model");
const { ProductModel } = require("../Models/product.model");
const { ErrorHandler } = require("../utils/ErrorHandler");

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
    error: false,
    message: "Order Placed Successfully",
    order,
  });
});

// get Single Order
const getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(
      new ErrorHandler(`Order Not Found With This Id:${req.params.id} `, 404)
    );
  }
  res.status(200).send({
    error: false,
    order,
  });
});

// get logged in User Order
const getMyOrder = catchAsyncError(async (req, res, next) => {
  const orders = await OrderModel.find({ user: req.user._id });

  res.status(200).send({
    error: false,
    orders,
  });
});
// get  All Order --Admin
const getAllOrder = catchAsyncError(async (req, res, next) => {
  const orders = await OrderModel.find().populate("user", "name email");

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).send({
    error: false,
    orders,
    totalAmount,
  });
});

async function updateStock(productId, productQuantity, update) {
  const product = await ProductModel.findById(productId);
  update == -1
    ? (product.stock -= productQuantity)
    : (product.stock += productQuantity);
  await product.save({ validateBeforeSave: false });
}

// Update  Order  Status--Admin
const updateOrderStatus = catchAsyncError(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id);
  const newOrderStatus = req.body.orderStatus;

  if (!order) {
    return next(
      new ErrorHandler(`Order Not Found With Id ${req.params.id}`, 404)
    );
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Order Is All Ready Delivered", 400));
  }

  if (newOrderStatus == order.orderStatus) {
    return next(new ErrorHandler(`Order is All Ready ${newOrderStatus}`, 400));
  }
  if (newOrderStatus == "Delivered" && order.orderStatus == "Processing") {
    return next(new ErrorHandler(`First Shipped Order Before Deliver`, 400));
  }

  if (newOrderStatus == "Processing" && order.orderStatus == "Shipped") {
    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity, +1);
    });
  }
  if (newOrderStatus == "Shipped") {
    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity, -1);
    });
  }
  if (newOrderStatus == "Delivered") {
    order.deliveredAt = Date.now();
  }
  order.orderStatus = newOrderStatus;
  await order.save({ validateBeforeSave: false });

  res.status(200).send({
    error: false,
    message: `Order Status Updated To ${newOrderStatus}`,
  });
});

// delete order  -Admin

const deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await OrderModel.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(
      new ErrorHandler(`Order Not Found With Id :${req.params.id}`, 404)
    );
  }

  res.status(200).send({
    error: false,
    message: `Order Deleted Success With Id :${req.params.id}`,
  });
});

module.exports = {
  newOrder,
  getSingleOrder,
  getMyOrder,
  getAllOrder,
  updateOrderStatus,
  deleteOrder,
};
