const AppError = require("../utils/appError");

const InvalidIdError = (err) => {
  return new AppError(`Invalid ${err.path} of ${err.value}`, 404);
};
const developmentError = (err, res) => {
  return res.status(err.statusCode).json({
    message: "failed",
    error: {
      status: err.status,
      statusCode: err.statusCode,
      message: err.message,
      error: err,
      stack: err.stack,
    },
  });
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = err;

  if (error.name === "CastError") {
    error = InvalidIdError(error);
  }
  developmentError(error, res);
};
