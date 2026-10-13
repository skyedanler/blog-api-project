const errorHandler = (err, req, res, next) => {
  console.log(`\nError: ${err.message}`);
  console.log(`Route: ${req.method} ${req.url}`);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";


  res.status(statusCode).json({
    error: {
      message: message,
      statusCode: statusCode,
    },
  });
};

module.exports = errorHandler;
