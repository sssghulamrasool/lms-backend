const { tryCatch } = require("../utils/tryCatch");
const TeacherModel = require("../models/teacherModel");
const AppError = require("../utils/appError");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcryptjs");
//
exports.upload = multer({ dest: "public/images" });

// GET ALL TEACHER'S ACCOUNTS
exports.getTeachers = tryCatch(async (req, res, next) => {
  const teachers = await TeacherModel.find().select("-education -experience");

  // {
  //    * : 1,
  //   password: 1,
  //   confirmPassword: 1,
  // }
  return res.status(200).json({
    status: true,
    length: teachers.length,
    teachers,
  });
});
// ADD NEW POST ACCOUNT
exports.addTeacher = tryCatch(async (req, res, next) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    description,
    educations,
    experience,
    ranks,
    profile_image,
  } = req.body;

  // CHECKED IF TEACHER NOT ADD ANY VALUE'S
  // if (
  //   !name ||
  //   !email ||
  //   !password ||
  //   !confirmPassword ||
  //   !description ||
  //   !experience ||
  //   !education
  //   // !profile_image
  // ) {
  //   return next(
  //     new AppError(
  //       "Name, Email, Password, ConfrimPassword, Profile Image, Description, Experience Eduction THESE FIELDS ARE REQUIRED ",
  //       400
  //     )
  //   );
  // }

  // CHECKED IF TEACHER EMAIL IS ALREADY EXISTED OR NOT
  const findone = await TeacherModel.findOne({
    email: email,
  });
  // IF EXISITED THEN RETURN BACKEND ERROR
  if (findone) {
    return next(
      new AppError(`Already Existed this email Profile ${findone.name}`, 409)
    );
  }
  // IF PASSWORD OR CONFIRM PASSWORD IS NOT SAME
  if (password !== confirmPassword) {
    return next(new AppError("Please Enter same Passowrd", 400));
  }
  // PASSWORD ENCRYPET
  let hashPassword = await bcrypt.hash(password, 12);
  let hashConfirmPassword = await bcrypt.hash(confirmPassword, 12);
  // UPLOAD IMAGE ON CLOUDINARY

  // if (!req.body.profile_image) {
  //   return next(new AppError("Please Upload Profile Image", 400));
  // }
  // let images;
  // await cloudinary.uploader.upload(req.body.profile_image).then((data) => {
  //   images = {
  //     link: data.url,
  //     id: data.public_id,
  //   };
  // });

  //  FINLA CREATE ACCOUNT
  const course = await TeacherModel.create({
    name,
    email,
    password: hashPassword,
    confirmPassword: hashConfirmPassword,
    profile_image: [],
    description,
    ranks,
    education: educations,
    experience,
  });

  return res.status(200).json({
    status: true,
    // teacher: {
    //   id: course.id,
    //   name: course.name,
    //   email: course.email,
    // },
    // teacher: req.body,
  });
});

// DELETE TEACHER ACCOUNT
exports.deleteTeacher = tryCatch(async (req, res, next) => {
  const teacher = await TeacherModel.findByIdAndDelete(req.params.id);
  if (!teacher) {
    return next(
      new AppError(`Can't Existed teacher of this id ${req.params.id}`, 404)
    );
  }
  return res.status(202).json({
    status: true,
    message: "Delete Teacher",
  });
});

// GET SINGLE TEACHER ACCOUNT
exports.getTeacher = tryCatch(async (req, res, next) => {
  const teacher = await TeacherModel.findById(req.params.id);
  return res.status(200).json({
    status: true,
    message: "Teacher Profile",
    teacher,
  });
});

// UPDATE TEACHER TEACHER ACCOUNT

exports.updateTeacher = tryCatch(async (req, res, next) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    description,
    education,
    experience,
    ranks,
    profile_image,
  } = req.body;

  // const teacher = await TeacherModel.findByIdAndUpdate(
  //   req.params.id,
  //   {
  //     name,
  //     email,
  //     password,
  //     confirmPassword,
  //     description,
  //     ranks,
  //     education,
  //     experience,
  //   },
  //   { new: true }
  // );

  // if (!teacher) {
  //   return next(new AppError("Not found", 404));
  // }

  return res.status(200).json({
    status: true,
  });
});
