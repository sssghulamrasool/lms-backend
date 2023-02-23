const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");

router.route("/").get(teacherController.getTeachers).post(
  // teacherController.upload.single("profile_image"),
  teacherController.addCourse
);
router.route("/:id").get().delete().put();
module.exports = router;
