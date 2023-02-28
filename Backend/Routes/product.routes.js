const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getAllReview,
  deleteReview,
} = require("../Controlers/product.controler");
const {
  Autherise,
  AutheriseRole,
} = require("../middleware/autherise.middleware");

const productRouter = express.Router();

//Get All Product
productRouter.get("/", getAllProducts);

//Get single Product
productRouter.get("/:id", getSingleProduct);

// Create A Product -Admin
productRouter.post(
  "/admin/new",
  Autherise,
  AutheriseRole("admin"),
  createProduct
);

// Update Product -Admin
productRouter.patch(
  "/admin/:id",
  Autherise,
  AutheriseRole("admin"),
  updateProduct
);

// Delete Product -Admin
productRouter.delete(
  "/admin/:id",
  Autherise,
  AutheriseRole("admin"),
  deleteProduct
);

// Add A Review
productRouter.patch("/review/add", Autherise, createProductReview);

// getAll Reviews
productRouter.get("/review/all", getAllReview);

// Delete A Review
productRouter.delete("/review/delete", Autherise, deleteReview);

module.exports = { productRouter };
