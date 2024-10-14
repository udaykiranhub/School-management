const AcademicYear = require("../models/Acyear");
const Branch = require("../models/Branches");
const mongoose = require("mongoose");
const Class = require("../models/Classes");

// Create Academic Year
exports.createAcademicYear = async (req, res) => {
  const branchId = req.params.branchId;
  const { year, startDate, endDate } = req.body;

  try {
    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res.status(404).json({ success: false, message: "Branch not found" });
    }

    const academicYear = new AcademicYear({
      year,
      startDate,
      endDate,
      branch: new mongoose.Types.ObjectId(branchId),
    });

    await academicYear.save();

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

// Edit Academic Year
exports.editAcademicYear = async (req, res) => {
  const { branchId, academicYearId } = req.params;
  const { year, startDate, endDate } = req.body;

  try {
    const academicYear = await AcademicYear.findById(academicYearId);
    if (!academicYear) {
      return res.status(404).json({
        success: false,
        message: "Academic Year not found",
      });
    }

    academicYear.year = year || academicYear.year;
    academicYear.startDate = startDate || academicYear.startDate;
    academicYear.endDate = endDate || academicYear.endDate;
    await academicYear.save();

    const branch = await Branch.findById(branchId);
    if (branch && !branch.academicYears.includes(academicYearId)) {
      branch.academicYears.push(academicYearId);
      await branch.save();
    }

    res.status(200).json({
      success: true,
      message: "Academic Year updated successfully",
      academicYear,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Academic Year
exports.deleteAcademicYear = async (req, res) => {
  try {
    const { branchId, academicYearId } = req.params;

    const academicYear = await AcademicYear.findById(academicYearId);
    if (!academicYear) {
      return res.status(404).json({
        success: false,
        message: "Academic Year not found",
      });
    }

    await AcademicYear.findByIdAndDelete(academicYearId);

    // Remove academic year from branch's academicYears array
    const branch = await Branch.findById(branchId);
    if (branch) {
      branch.academicYears = branch.academicYears.filter(
        (year) => year.toString() !== academicYearId
      );
      await branch.save();
    }

    // Optionally, delete associated classes
    await Class.deleteMany({ academicYear: academicYearId });

    res.status(200).json({
      success: true,
      message: "Academic Year and associated classes deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Academic Years for a Branch
exports.getAcademicYears = async (req, res) => {
  try {
    const { branchId } = req.params;

    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res.status(404).json({
        success: false,
        message: "Branch not found",
      });
    }

    const academicYears = await AcademicYear.find({ branch: branchId });
    res.status(200).json({
      success: true,
      message: "Successfully fetched all Academic Years",
      data: academicYears,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch academic years",
    });
  }
};
