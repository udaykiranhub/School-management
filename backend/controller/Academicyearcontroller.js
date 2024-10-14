const AcademicYear = require("../models/Acyear");
const Branch = require("../models/Branches");
const mongoose = require("mongoose");

// Create Academic Year
exports.createAcademicYear = async (req, res) => {
  const branchId = req.params.branchId;
  const { year, startDate, endDate } = req.body;
  try {
    const academicYear = new AcademicYear({
      year,
      startDate,
      endDate,
      branch: new mongoose.Types.ObjectId(branchId),
    });

    await academicYear.save();

    const branch = await Branch.findById(branchId);
    branch.academicYears.push(academicYear._id);
    await branch.save();

    res.status(201).json({
      success: true,
      message: "Academic Year created successfully",
      academicYear,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//delete
exports.deleteAcademicYear = async (req, res) => {
  try {
    const { academicYearId } = req.params;

    // Delete the academic year
    await AcademicYear.findByIdAndDelete(academicYearId);

    // Optionally, you can also delete associated classes if required
    await Class.deleteMany({ academicYear: academicYearId });

    res
      .status(200)
      .json({ success: true, message: "Academic Year deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get all academic years of corresponding branch
exports.getAcademicYears = async (req, res) => {
  try {
    const { branchId } = req.params;
    const academicYears = await AcademicYear.find({ branch: branchId });
    res.status(200).json({
      success: true,
      error: false,
      message: "successfully fetched all Academic years",
      data: academicYears,
    });
  } catch (error) {
    console.error("Error fetching academic years:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch academic years" });
  }
};
