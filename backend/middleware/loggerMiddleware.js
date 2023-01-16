export const loggerHandler = (err, req, res, next) => {
  if (req.originalUrl !== "/api/users/profile") {
    global.logger.error({
      method: req.method,
      error: err.message,
      url: req.originalUrl,
    });
  }

  next(err);
};
