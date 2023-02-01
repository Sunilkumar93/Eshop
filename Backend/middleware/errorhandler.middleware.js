const errorHandler = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).send({
    error: true,
    message: err.message,
  });
};

module.exports = { errorHandler };
