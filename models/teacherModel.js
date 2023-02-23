const monoose = require("mongoose");
const validator = require("validator");

const teacherSchema = new monoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: [validator.isEmail, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "ConfirmPassword is required and must b same"],
      select: false,
    },
    profile_image: {
      link: String,
      id: String,
    },
    description: {
      type: String,
      required: [true, "Teacher Detail is required"],
    },
    ranks: {
      type: String,
      enum: [
        "lecturer",
        "assistant professor",
        "associate professor",
        "professor",
      ],
      default: "lecturer",
    },
    education: [
      {
        degree: String,
        university: String,
      },
    ],
    experience: [
      {
        company_name: String,
        designation: String,
        start_date: Date,
        end_date: Date,
        address: String,
        skills: [String],
      },
    ],
    courses: {
      type: Number,
      default: 0,
    },
    student_enrolled: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const TeacherModel = monoose.model("teacher", teacherSchema);
module.exports = TeacherModel;
