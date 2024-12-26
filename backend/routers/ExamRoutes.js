const express = require("express");
const {
  addExam,
  updateExam,
  deleteExam,
  getAllExams,
} = require("../controller/ExamController");

const router = express.Router();

router.post("/add-exam", addExam);
router.get("/all-exam/:classId/:sectionId", getAllExams);
router.delete("/del-exam/:examId", deleteExam);
router.put("/upd-exam/:examId", updateExam);
module.exports = router;
