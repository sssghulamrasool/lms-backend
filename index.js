const express = require("express");
const app = express();
const dotenv = require("dotenv");
const courseRouters = require("./routes/courseRoutes");
const teacherRouters = require("./routes/teacherRoutes");
const errorController = require("./controllers/errorController");
const AppError = require("./utils/appError");
const morgan = require("morgan");
dotenv.config();
require("./config/config.js");
const cloudinary = require("cloudinary").v2;

// CLOUDINARY CONFIG
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// MIDDLEWARES

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
// API ROUTING

app.use("/api/courses", courseRouters);
app.use("/api/teacher", teacherRouters);

app.all("*", (req, res, next) => {
  return next(new AppError(`Can't Find ${req.originalUrl}`, 500));
});
app.use(errorController);

app.listen(
  process.env.PORT,
  console.log("Server is Running", process.env.PORT)
);
