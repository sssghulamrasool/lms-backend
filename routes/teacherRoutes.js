const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");

// THIS IS FOR ADD IMAGE'S
// teacherController.upload.single("profile_image"),
router
  .route("/")
  .get(teacherController.getTeachers)
  .post(teacherController.addTeacher);

router
  .route("/:id")
  .get(teacherController.getTeacher)
  .delete(teacherController.deleteTeacher)
  .put(teacherController.updateTeacher);
module.exports = router;
