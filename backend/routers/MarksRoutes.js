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

router.post("/:branchId", protect.authMiddleware, addMarks); // Add marks
router.get("/:branchId", protect.authMiddleware, getAllMarks); // Get all marks
router.get("/:studentId/:branchId", protect.authMiddleware, getMarksByStudent); // Get marks by student
router.put("/:id/:branchId", protect.authMiddleware, updateMarks); // Update marks
router.delete("/:id/:branchId", protect.authMiddleware, deleteMarks); // Delete marks

module.exports = router;
