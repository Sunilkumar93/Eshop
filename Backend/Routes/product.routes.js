const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../Controlers/product.controler");
const { Autherise, AutheriseRole } = require("../middleware/autherise.middleware");

const productRouter = express.Router();

//Get All Product
productRouter.get("/", getAllProducts);

//Get single Product
productRouter.get("/:id", getSingleProduct);

// Create A Product -Admin
productRouter.post("/new", Autherise, AutheriseRole("admin"), createProduct);

// Update Product -Admin
productRouter.patch("/:id", Autherise, AutheriseRole("admin"), updateProduct);

// Delete Product -Admin
productRouter.delete("/:id", Autherise, AutheriseRole("admin"), deleteProduct);

module.exports = { productRouter };
