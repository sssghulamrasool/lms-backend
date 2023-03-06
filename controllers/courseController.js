const CourseModel = require("../models/courseModel");
const AppError = require("../utils/appError");
const { tryCatch } = require("../utils/tryCatch");
const multer = require("multer");
exports.upload = multer({ dest: "public/images" }).single("feature-image");
const cloudinary = require("cloudinary").v2;
exports.getAllCourse = tryCatch(async (req, res, next) => {
  const couses = await CourseModel.find()
    .select({
      course_content: 0,
    })
    .populate({
      path: "instructor",
      select: {
        name: 1,
        profile_image: 1,
        ranks: 1,
        _id: 0,
      },
    });

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
    course_content,
    instructor,
  } = req.body;

  let image = { img_url: "", img_id: "" };
  // await cloudinary.uploader.upload(req.body.image).then((result) => {
  //   image.img_url = result.url;
  //   image.img_id = result.public_id;
  // });
  const course = {
    title: title,
    image: image,
    payment_status: payment_status,
    language: language,
    durations: durations,
    course_type: course_type,
    course_content: course_content,
    instructor: instructor,
  };
  const created = await CourseModel.create(course);
  return res.status(201).json({
    status: true,
    couses: {
      id: created._id,
    },
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
  }).populate("instructor");
  if (!getCourse) {
    return next(new AppError(`This ID is not ${id}`, 404));
  }

  return res.status(200).json({
    status: true,
    data: getCourse,
  });
});
