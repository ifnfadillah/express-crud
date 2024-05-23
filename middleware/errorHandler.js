const errorhandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: "Something went wrong",
  });
  next();
};
module.exports = errorhandler;
