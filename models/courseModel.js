const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Enter Course Title"],
    },
    image: {
      img_url: {
        type: String,
      },
      img_id: {
        type: String,
      },
    },
    payment_status: {
      type: String,
      default: "free",
    },
    language: {
      type: String,
      enum: ["english", "urdu", "punjabi"],
      default: "english",
    },
    durations: {
      type: String,
    },
    student_enrolled: {
      type: Number,
      default: 0,
    },
    course_type: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    instructor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacher",
      },
    ],
    course_content: [
      {
        section_name: {
          type: String,
        },
        lectures: [
          {
            lec_url: String,
            lec_desc: String,
            lec_source: String,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CourseModel = mongoose.model("courses", courseSchema);

module.exports = CourseModel;
