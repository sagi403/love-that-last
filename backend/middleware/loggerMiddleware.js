export const loggerHandler = (err, req, res, next) => {
  global.logger.error({
    method: req.method,
    error: err.message,
    url: req.originalUrl,
  });

  next();
};
