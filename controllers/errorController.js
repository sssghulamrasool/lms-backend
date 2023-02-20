module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  return res.status(err.statusCode).json({
    message: "success",
    error: {
      status: err.status,
      statusCode: err.statusCode,
      message: err.message,
    },
  });
};
