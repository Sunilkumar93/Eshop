const { catchAsyncError } = require("../middleware/catchAsyncError.middleware");
const { ProductModel } = require("../Models/Product.model.js");
// Create A Product

const createProduct = catchAsyncError(async (req, res, next) => {
  const payload = req.body;

  const product = new ProductModel(payload);

  await product.save();
  res.status(201).send({
    error: false,
    message: "Product Added Successfully",
  });
});

const getAllProducts = catchAsyncError(async (req, res, next) => {
  const products = await ProductModel.find();
  res.status(200).send({ error: false, data: products });
});

module.exports = { getAllProducts, createProduct };
