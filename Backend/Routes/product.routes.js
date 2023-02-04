const express = require("express");
const { getAllProducts,createProduct } = require("../Controlers/product.controler");

const productRouter = express.Router();

//Get All Product 
productRouter.get("/",getAllProducts)

// Create A Product -Admin
productRouter.post("/new",createProduct)

module.exports = { productRouter };
