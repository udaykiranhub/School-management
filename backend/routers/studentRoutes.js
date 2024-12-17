const express = require("express");
const router = express.Router();
const StudentControllers = require("../controller/StudentController");

router.post("/add-student", StudentControllers.addStudent);
router.post("/get-student/:sectionId", StudentControllers.getStudentsBySection);
router.get("/get-student/:sid", StudentControllers.getStudentById);
module.exports = router;
