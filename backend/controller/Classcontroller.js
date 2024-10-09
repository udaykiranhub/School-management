const Class = require("../models/Classes");
const AcademicYear = require("../models/Acyear");

// Add Class to Academic Year
exports.addClass = async (req, res) => {
  try {
    const { name, section, academicYearId } = req.body;
    const newClass = new Class({ name, section, academicYear: academicYearId });
    await newClass.save();

    const academicYear = await AcademicYear.findById(academicYearId);
    academicYear.classes.push(newClass._id);
    await academicYear.save();

    res
      .status(201)
      .json({ success: true, message: "Class added successfully", newClass });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const { classId } = req.params;

    // Delete the class
    await Class.findByIdAndDelete(classId);

    res
      .status(200)
      .json({ success: true, message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add Section to Class
exports.addSection = async (req, res) => {
  try {
    const { classId } = req.params;
    const { sectionName } = req.body;

    const classObj = await Class.findById(classId);

    classObj.sections.push({ name: sectionName });
    await classObj.save();

    res
      .status(200)
      .json({ success: true, message: "Section added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Section from Class
exports.deleteSection = async (req, res) => {
  try {
    const { classId, sectionName } = req.params;

    const classObj = await Class.findById(classId);

    classObj.sections = classObj.sections.filter(
      (section) => section.name !== sectionName
    );
    await classObj.save();

    res
      .status(200)
      .json({ success: true, message: "Section deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
