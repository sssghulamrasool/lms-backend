const CourseModel = require("../models/courseModel");
const AppError = require("../utils/appError");
const { tryCatch } = require("../utils/tryCatch");

exports.getAllCourse = tryCatch(async (req, res, next) => {
  const couses = await CourseModel.find()
    .select
    // "* title image payment_status language"
    ();
  return res.status(200).json({
    status: true,
    count: couses.length,
    couses,
  });
});
// exports.createCourse = tryCatch(async (req, res, next) => {
//   const {
//     title,
//     payment_status,
//     language,
//     durations,

//     course_type,
//     instructor,
//   } = req.body;

//   const course = {
//     title: title,
//     payment_status: payment_status,
//     language: language,
//     durations: durations,
//     course_type: course_type,

//     course_content: req.body.course,
//   };

//   const creaeted = await CourseModel.create(course);
//   return res.status(201).json({
//     status: true,
//     couses: creaeted,
//   });
// });
exports.createCourse = tryCatch(async (req, res, next) => {
  const {
    title,
    payment_status,
    language,
    durations,
    course_type,
    instructor,
  } = req.body;

  const course = {
    title: title,
    image: {
      img_url: "Url",
      img_id: "Demo",
    },
    payment_status: payment_status,
    language: language,
    durations: durations,
    course_type: course_type,
    course_content: req.body.course,
  };

  const creaeted = await CourseModel.create(course);
  return res.status(201).json({
    status: true,
    couses: creaeted,
  });
});

exports.deleteCourse = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const firstFind = await CourseModel.findOne({
    _id: id,
  });
  if (!firstFind) {
    return next(new AppError(`This ID is not ${id}`, 404));
  }
  await CourseModel.deleteOne({ _id: id });

  return res.status(200).json({
    status: true,
    message: "Delete SuccessFully",
  });
});
exports.getSingleCourse = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const getCourse = await CourseModel.findOne({
    _id: id,
  });
  if (!getCourse) {
    return next(new AppError(`This ID is not ${id}`, 404));
  }

  return res.status(200).json({
    status: true,
    data: getCourse,
  });
});
