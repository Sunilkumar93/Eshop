const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../Controlers/product.controler");

const productRouter = express.Router();

//Get All Product
productRouter.get("/", getAllProducts);

// Create A Product -Admin
productRouter.post("/new", createProduct);

// Update Product -Admin
productRouter.patch("/:id", updateProduct);

// Delete Product -Admin
productRouter.delete("/:id", deleteProduct);

module.exports = { productRouter };
