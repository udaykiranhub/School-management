const express = require("express");
const {
  createClass,
  getAllClasses,
  editClass,
  deleteClass,
} = require("../controller/Classcontroller");

const router = express.Router();

router.post("/create-class", createClass);         // Create a class
router.get("/get-classes", getAllClasses);        // Get all classes
// router.put("/classes/:id", editClass);        // Edit a class
router.delete("/delete-class/:id", deleteClass);   // Delete a class

module.exports = router;
