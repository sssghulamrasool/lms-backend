const express = require("express");

const router = express.Router();
const {
  getAllCourse,
  createCourse,
  deleteCourse,
  getSingleCourse,
  upload,
} = require("../controllers/courseController");

router.route("/").get(getAllCourse).post(upload, createCourse);
// router.get("/", getAllCourse);
// router.post("/", createCourse);
// router.delete("/:id", deleteCourse);
// router.get("/:id", getSingleCourse);
router.route("/:id").delete(deleteCourse).get(getSingleCourse);

module.exports = router;
