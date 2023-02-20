const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
});
const CourseModel = mongoose.model("courses", courseSchema);

module.exports = CourseModel;
