const CourseModel = require("../models/courseModel");
const AppError = require("../utils/appError");
const { tryCatch } = require("../utils/tryCatch");
exports.getAllCourse = tryCatch(async (req, res, next) => {
  const couses = await CourseModel.find();

  return res.status(200).json({
    status: true,
    couses,
  });
});
