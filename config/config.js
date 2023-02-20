const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {}, () => {
  console.log("DB connected");
});
mongoose.connection.on("connected", () => {
  console.log("MONGO connected");
});
mongoose.connection.on("disconnected", () => {
  console.log("MONGO disconnected");
});
