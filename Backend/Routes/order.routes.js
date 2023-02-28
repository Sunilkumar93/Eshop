const express = require("express");
const { newOrder } = require("../Controlers/order.controler");
const { Autherise } = require("../middleware/autherise.middleware");

const orderRouter = express.Router();

orderRouter.post("/new", Autherise, newOrder);

module.exports = {
  orderRouter,
};
