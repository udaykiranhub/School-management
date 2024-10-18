const Class = require("../models/Classes");
const AcademicYear = require("../models/Acyear");
const mongoose = require("mongoose");

// Create Class
exports.createClass = async (req, res) => {
  try {
    const { name, academicYear, subjects } = req.body;

    const newClass = new Class({
      name,
      academicYear,
      subjects,
    });
    // Save the new class
    await newClass.save();
    console.log("create class");

    // Add the class to the academic year's classes arrayS
    await AcademicYear.findByIdAndUpdate(academicYear, {
      $push: { classes: newClass._id },
    });

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: newClass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create class",
      error: error.message,
    });
  }
};

// Get All Classes
exports.getAllClasses = async (req, res) => {
  try {
    // Get the academicYear ID from the query parameters
    const { acadId } = req.params;
    console.log("academic id is", acadId);
    // Define the query object

    // If academicYear is provided, add it to the query

    // Fetch the classes, optionally filtering by academicYear
    const classes = await Class.find({ academicYear: acadId });
    // Uncomment the lines below if you need to populate related fields
    // .populate("sections") // Populate section details
    // .populate("academicYear"); // Populate academic year details

    res.status(200).json({
      success: true,
      data: classes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve classes",
      error: error.message,
    });
  }
};

// Delete Class
exports.deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the class by id
    const classData = await Class.findById(id);
    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    // Check if the sections array is empty
    if (classData.sections.length > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot delete class because it has sections. Remove all sections before deleting the class.",
      });
    }

    // Remove the class reference from the academic year
    await AcademicYear.findByIdAndUpdate(classData.academicYear, {
      $pull: { classes: classData._id },
    });

    // Proceed with class deletion
    await Class.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Class deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete class",
      error: error.message,
    });
  }
};

//getclass by id
exports.getClassDetails = async (req, res) => {
  const { classId } = req.params;
  // classId = new mongoose.Types.ObjectId(classId);
  try {
    const classData = await Class.findById(classId);
    if (!classData) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });
    }
    res.json({ success: true, data: classData });
  } catch (error) {
    console.error("Error fetching class details:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
