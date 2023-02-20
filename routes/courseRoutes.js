const express = require("express");

const router = express.Router();
const { getAllCourse } = require("../controllers/courseController");

router.get("/", getAllCourse);

module.exports = router;
