const { catchAsyncError } = require("../middleware/catchAsyncError.middleware");
const { ProductModel } = require("../Models/product.model");
const { ApiFeature } = require("../utils/Apifeture");
const { ErrorHandler } = require("../utils/ErrorHandler");
// Create A Product

const createProduct = catchAsyncError(async (req, res, next) => {
  const payload = req.body;
  payload.user = req.user.id;
  const product = new ProductModel(payload);

  await product.save();
  res.status(201).send({
    error: false,
    message: "Product Added Successfully",
  });
});

// Get All Product
const getAllProducts = catchAsyncError(async (req, res, next) => {
  const perPage = req.query.limit || 5;
  const apiFeture = new ApiFeature(ProductModel.find(), req.query)
    .search()
    .filter()
    .pagenation(perPage);
  const products = await apiFeture.query;
  const total = await ProductModel.countDocuments();
  res.status(200).send({ error: false, data: products, total });
});

// Get Single Product
const getSingleProduct = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const product = await ProductModel.findById(id);
  if (!product) {
    return next(new ErrorHandler(`Product Is Not Found By Id:${id}`, 404));
  }

  res.status(200).send({ error: false, data: product });
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
  res.status(201).send({
    error: false,
    message: `Product With id:${id} Deleted SuccessFully`,
  });
});

const createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    comment,
    name: req.user.name,
    rating: Number(rating),
  };

  const product = await ProductModel.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() == req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() == req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => (avg += rev.rating));
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).send({
    error: false,
    message: "Review Added Success",
  });
});

// Get All Review

const getAllReview = catchAsyncError(async (req, res, next) => {
  const product = await ProductModel.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(200).send({
    error: false,
    reviews: product?.reviews,
    total: product?.reviews.length,
  });
});

// Delete Review

const deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await ProductModel.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  let avg = 0;
  reviews.forEach((rev) => (avg += rev.rating));
  product.ratings = avg / reviews.length;
  product.reviews = reviews;
  product.numOfReviews = reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).send({
    error: false,
    message: "review deleted success",
  });
});

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getAllReview,
  deleteReview,
};
