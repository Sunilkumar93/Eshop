const { ErrorHandler } = require("../utils/ErrorHandler");

const errorHandler = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // Wrong MongoDb Id Error
  if (err.name == "CastError") {
    const message = `Resourse Not Found. Invalid : ${err.path}`;
    err = new ErrorHandler(message, 400);
  }


  // JWT Error
  if (err.name == "JsonWebTokenError") {
    const message = `JsonWebToken is Invalid Try Again`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).send({
    error: true,
    message: err.message,
  });
};

module.exports = { errorHandler };
