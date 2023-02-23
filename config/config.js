const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_URL, console.log("DB connected"));

mongoose.connection.on("connected", () => {
  console.log("MONGO connected");
});
mongoose.connection.on("disconnected", () => {
  console.log("MONGO disconnected");
});
