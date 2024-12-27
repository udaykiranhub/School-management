const express = require("express");
const {
  addMarks,
  getAllMarks,
  getMarksByStudent,
  updateMarks,
  deleteMarks
} = require("../controller/MarksController");
const protect = require("../middleware/Authtoken");

const router = express.Router();

router.post("/", protect.authMiddleware, addMarks); // Add marks
router.get("/", protect.authMiddleware, getAllMarks); // Get all marks
router.get("/:studentId", protect.authMiddleware, getMarksByStudent); // Get marks by student
router.put("/:id", protect.authMiddleware, updateMarks); // Update marks
router.delete("/:id", protect.authMiddleware, deleteMarks); // Delete marks

module.exports = router;
