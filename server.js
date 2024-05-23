const express = require("express");
const app = express();
const database = require("./database");
const userController = require("./controllers/userController");
const errorhandler = require("./middleware/errorHandler");
const logger = require("./middleware/logger");
const upload = require("./utils/upload");
const multerError = require("./middleware/multerError");
const userRoutes = require("./routes/userRoutes");
const databaseMiddleware = require("./middleware/databaseMiddleware");

const PORT = 8000;

//Middleware
//Get data from client
app.use(express.json());

//Mengurangi data from client
app.use(express.urlencoded({ extended: true }));

//Menangani error
app.use(errorhandler);

//Logger
app.use(logger);

// FILE UPLOAD
app.post("/file-upload", upload.single("file"), [multerError], (req, res) => {
  res.json({ message: "File uploaded!" });
});

//Route
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use(databaseMiddleware);
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`));

//Ambil data semua user
app.get("/api/users", userController.getAllUsers);

//Method Post Add New User
app.post("/api/users", userController.createNewUser);

//Mengubah data
app.put("/api/users/:id", userController.updateUserById);

//Menghapus Data
app.delete("/api/users/:id", userController.deleteUserById);

// METHOD GET dengan paramter id
app.get("/api/users/:id", userController.getUserById);
