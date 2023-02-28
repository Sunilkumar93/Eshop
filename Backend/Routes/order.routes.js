const express = require("express");
const {
  newOrder,
  getSingleOrder,
  getMyOrder,
  getAllOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../Controlers/order.controler");
const {
  Autherise,
  AutheriseRole,
} = require("../middleware/autherise.middleware");

const orderRouter = express.Router();

orderRouter.post("/new", Autherise, newOrder);
orderRouter.get("/myorder/:id", Autherise, getSingleOrder);
orderRouter.get("/myorder", Autherise, getMyOrder);
orderRouter.get(
  "/admin/allorders",
  Autherise,
  AutheriseRole("admin"),
  getAllOrder
);

orderRouter.patch(
  "/admin/update/:id",
  Autherise,
  AutheriseRole("admin"),
  updateOrderStatus
);
orderRouter.delete(
  "/admin/delete/:id",
  Autherise,
  AutheriseRole("admin"),
  deleteOrder
);

module.exports = {
  orderRouter,
};
