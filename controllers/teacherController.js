const { tryCatch } = require("../utils/tryCatch");
const TeacherModel = require("../models/teacherModel");
const AppError = require("../utils/appError");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// exports.upload = multer({ dest: "public/images/" }).single("profile_image");

// exports.upload = multer({ storage: multer.storage });

exports.upload = multer({ dest: "public/images" });
// const upload = multer({ dest: "public/images" });

exports.getTeachers = tryCatch(async (req, res, next) => {
  const teachers = await TeacherModel.find().select(
    "+password +confirmPassword"
  );
  return res.status(200).json({
    status: true,
    teachers,
  });
});

exports.addCourse = tryCatch(async (req, res, next) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    description,
    education,
    experience,
    ranks,
  } = req.body;
  if (
    !name ||
    !email ||
    !password ||
    !confirmPassword ||
    !description ||
    !experience ||
    !education
  ) {
    return next(
      new AppError(
        "Name, Email, Password, ConfrimPassword, Profile Image, Description, Experience Eduction THESE FIELDS ARE REQUIRED ",
        400
      )
    );
  }
  const findone = await TeacherModel.findOne({
    email: email,
  });
  if (findone) {
    return next(new AppError("Already Existed", 409));
  }
  if (password !== confirmPassword) {
    return next(
      new AppError("Please is not same Please Enter same Passowrd", 400)
    );
  }

  // console.log("", req.file.path);

  let images;
  await cloudinary.uploader.upload(req.img).then((data) => {
    images = {
      link: data.url,
      id: data.public_id,
    };
  });
  // const course = await TeacherModel.create({
  //   name,
  //   email,
  //   password,
  //   confirmPassword,
  //   profile_image: images,
  //   description,
  //   ranks,
  // });

  return res.status(200).json({
    status: true,
    teacher: [],
  });
});
