const express = require("express");
const { getAllProducts } = require("../Controlers/product.controler");

const productRouter = express.Router();

//Get All Product 
productRouter.get("/",getAllProducts)

module.exports = { productRouter };
