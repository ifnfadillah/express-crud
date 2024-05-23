const createDatabaseConnection = require("../database");

const databaseMiddleware = (req, res, next) => {
  req.db = createDatabaseConnection();
  res.on("finish", () => {
    if (req.db) {
      req.db.end((err) => {
        if (err) {
          console.error("Error closing database connection", err);
        } else {
          console.log("Database connection closed");
        }
      });
    }
  });
  next();
};

module.exports = databaseMiddleware;
