const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const courseRouters = require("./routes/courseRoutes");
const errorController = require("./controllers/errorController");
const AppError = require("./utils/appError");

// MIDDLEWARES

app.use(express.json());

// CONFIG FIELS
require("./config/config.js");

app.use("/api/courses", courseRouters);

app.all("*", (req, res, next) => {
  return next(new AppError(`Can't Find ${req.originalUrl}`, 500));
});
app.use(errorController);

app.listen(process.env.PORT, console.log("Server is Running"));
