const AcademicYear = require("../models/Acyear");
const Branch = require("../models/Branches");

// Create Academic Year
exports.createAcademicYear = async (req, res) => {
  try {
    const { startYear, endYear, branchId } = req.body;
    const academicYear = new AcademicYear({
      startYear,
      endYear,
      branch: branchId,
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
