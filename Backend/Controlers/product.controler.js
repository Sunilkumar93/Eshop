const { catchAsyncError } = require("../middleware/catchAsyncError.middleware");
const { ProductModel } = require("../Models/product.model");
const { ErrorHandler } = require("../utils/ErrorHandler");
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

// Get All Product
const getAllProducts = catchAsyncError(async (req, res, next) => {
  const products = await ProductModel.find();
  res.status(200).send({ error: false, data: products });
});

// Update Product By Id

const updateProduct = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;

  let product = await ProductModel.findById(id);

  if (!product) {
    return next(new ErrorHandler(`Product Is Not Found By Id:${id}`, 404));
  }
  product = await ProductModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(201).send({ error: false, data: product });
});

// Delete Product By Id

const deleteProduct = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;

  let product = await ProductModel.findById(id);

  if (!product) {
    return next(new ErrorHandler(`Product Is Not Found By Id:${id}`, 404));
  }
  product = await ProductModel.findByIdAndDelete(id);
  res
    .status(201)
    .send({
      error: false,
      message: `Product With id:${id} Deleted SuccessFully`,
    });
});

module.exports = { getAllProducts, createProduct, updateProduct,deleteProduct };
