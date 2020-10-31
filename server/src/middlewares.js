// This is the "not found" middleware; we have 2 because
// the other one is more general
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

// MUST have 4 parameters, otherwise it's just like registering
// the middleware above with 3 parameters
const errorHandler = (error, _req, res, _next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
  });
};

// 'module' is referring to this file
module.exports = {
  notFound,
  errorHandler
}