const errorHandler = (err, req, res, next) => {
  // Log the error
  console.log(`\nError: ${err.message}`);
  console.log(`Route: ${req.method} ${req.url}`);

  // Default to 500 server error
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Send error response
  res.status(statusCode).json({
    error: {
      message: message,
      statusCode: statusCode,
    },
  });
};

module.exports = errorHandler;
