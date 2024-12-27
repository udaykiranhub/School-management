// const Marks = require("../models/Marks");
// const Student = require("../models/student");
// const Exam = require("../models/Exam");
// const Class = require("../models/Classes");
// const Section = require("../models/sections");

// // Add new marks
// exports.addMarks = async (req, res) => {
//   try {
//     const { studentId, examId, academicId, classId, sectionId, subjectMarks } = req.body;

//     // Check if student, exam, class, and section exist
//     const student = await Student.findById(studentId);
//     const exam = await Exam.findById(examId);
//     const classData = await Class.findById(classId);
//     const section = await Section.findById(sectionId);

//     if (!student || !exam || !classData || !section) {
//       return res.status(404).json({ message: "Invalid data provided." });
//     }

//     // Check if a record with the same studentId and examId already exists
//     const existingMarks = await Marks.findOne({ studentId, examId });
//     if (existingMarks) {
//       return res.status(400).json({ message: "Marks already exist for this student In exam." });
//     }

//     // Create a new Marks entry
//     const newMarks = new Marks({
//       studentId,
//       examId,
//       academicId,
//       classId,
//       sectionId,
//       subjectMarks,
//     });

//     await newMarks.save();
//     res.status(201).json({ message: "Marks added successfully", data: newMarks });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to add marks", error: error.message });
//   }
// };


// // Get all marks
// exports.getAllMarks = async (req, res) => {
//   try {
//     const marks = await Marks.find()
//       .populate("studentId", "name") // Populate student details
//       .populate("examId", "examName") // Populate exam details
//       .populate("classId", "name") // Populate class details
//       .populate("sectionId", "name") // Populate section details
//       .populate("subjectMarks.subjectId", "name"); // Populate subject details

//     res.status(200).json({ message: "Marks retrieved successfully", data: marks });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to retrieve marks", error: error.message });
//   }
// };

// // Get marks by student ID
// exports.getMarksByStudent = async (req, res) => {
//   try {
//     const { studentId } = req.params;

//     const marks = await Marks.find({ studentId })
//       .populate("examId", "examName")
//       .populate("classId", "name")
//       .populate("sectionId", "name")
//       .populate("subjectMarks.subjectId", "name");

//     if (!marks.length) {
//       return res.status(404).json({ message: "No marks found for this student" });
//     }

//     res.status(200).json({ message: "Marks retrieved successfully", data: marks });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to retrieve marks", error: error.message });
//   }
// };

// // Update marks by ID
// exports.updateMarks = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;

//     const updatedMarks = await Marks.findByIdAndUpdate(id, updates, { new: true });

//     if (!updatedMarks) {
//       return res.status(404).json({ message: "Marks not found" });
//     }

//     res.status(200).json({ message: "Marks updated successfully", data: updatedMarks });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update marks", error: error.message });
//   }
// };

// // Delete marks by ID
// exports.deleteMarks = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedMarks = await Marks.findByIdAndDelete(id);

//     if (!deletedMarks) {
//       return res.status(404).json({ message: "Marks not found" });
//     }

//     res.status(200).json({ message: "Marks deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete marks", error: error.message });
//   }
// };


const Marks = require("../models/Marks");
const Student = require("../models/student");
const Exam = require("../models/Exam");
const Class = require("../models/Classes");
const Section = require("../models/sections");

// Add new marks
exports.addMarks = async (req, res) => {
  try {
    const { branchId } = req.params; // Get branchId from params
    const { studentId, examId, academicId, classId, sectionId, subjectMarks } = req.body;

    // Check if student, exam, class, and section exist
    const student = await Student.findById(studentId);
    const exam = await Exam.findById(examId);
    const classData = await Class.findById(classId);
    const section = await Section.findById(sectionId);

    if (!student || !exam || !classData || !section) {
      return res.status(404).json({ message: "Invalid data provided." });
    }

    // Check if a record with the same studentId, examId, and branchId already exists
    const existingMarks = await Marks.findOne({ studentId, examId, branchId });
    if (existingMarks) {
      return res.status(400).json({ message: "Marks already exist for this student in the exam." });
    }

    // Create a new Marks entry
    const newMarks = new Marks({
      branchId,
      studentId,
      examId,
      academicId,
      classId,
      sectionId,
      subjectMarks,
    });

    await newMarks.save();
    res.status(201).json({ message: "Marks added successfully", data: newMarks });
  } catch (error) {
    res.status(500).json({ message: "Failed to add marks", error: error.message });
  }
};

// Get all marks
exports.getAllMarks = async (req, res) => {
  try {
    const { branchId } = req.params; // Get branchId from params

    const marks = await Marks.find({ branchId }) // Filter by branchId
      .populate("studentId", "name") // Populate student details
      .populate("examId", "examName") // Populate exam details
      .populate("classId", "name") // Populate class details
      .populate("sectionId", "name") // Populate section details
      .populate("subjectMarks.subjectId", "name"); // Populate subject details

    res.status(200).json({ message: "Marks retrieved successfully", data: marks });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve marks", error: error.message });
  }
};

// Get marks by student ID
exports.getMarksByStudent = async (req, res) => {
  try {
    const { branchId, studentId } = req.params; // Get branchId and studentId from params

    const marks = await Marks.find({ branchId, studentId }) // Filter by branchId and studentId
      .populate("examId", "examName")
      .populate("classId", "name")
      .populate("sectionId", "name")
      .populate("subjectMarks.subjectId", "name");

    if (!marks.length) {
      return res.status(404).json({ message: "No marks found for this student" });
    }

    res.status(200).json({ message: "Marks retrieved successfully", data: marks });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve marks", error: error.message });
  }
};

// Update marks by ID
exports.updateMarks = async (req, res) => {
  try {
    const { branchId, id } = req.params; // Get branchId and marks ID from params
    const updates = req.body;

    // Ensure the record belongs to the specified branchId
    const updatedMarks = await Marks.findOneAndUpdate(
      { _id: id, branchId },
      updates,
      { new: true }
    );

    if (!updatedMarks) {
      return res.status(404).json({ message: "Marks not found" });
    }

    res.status(200).json({ message: "Marks updated successfully", data: updatedMarks });
  } catch (error) {
    res.status(500).json({ message: "Failed to update marks", error: error.message });
  }
};

// Delete marks by ID
exports.deleteMarks = async (req, res) => {
  try {
    const { branchId, id } = req.params; // Get branchId and marks ID from params

    // Ensure the record belongs to the specified branchId
    const deletedMarks = await Marks.findOneAndDelete({ _id: id, branchId });

    if (!deletedMarks) {
      return res.status(404).json({ message: "Marks not found" });
    }

    res.status(200).json({ message: "Marks deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete marks", error: error.message });
  }
};
