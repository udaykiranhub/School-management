const Branch = require("../models/Branches");

// Create Branch
exports.createBranch = async (req, res) => {
  try {
    const { name, street, colony, villageTown, phone } = req.body;

    // Check for duplicate branch name
    const existingBranch = await Branch.findOne({ name });
    if (existingBranch) {
      return res.status(400).json({
        success: false,
        message: "Branch name already exists. Please choose a different name.",
      });
    }

    // Create a new branch with detailed address fields
    const branch = new Branch({ name, street, colony, villageTown, phone });
    await branch.save();

    res.status(201).json({
      success: true,
      message: "Branch created successfully",
      branch,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Branch
exports.deleteBranch = async (req, res) => {
  try {
    const { branchId } = req.params;

    // Delete the branch
    await Branch.findByIdAndDelete(branchId);

    // Optionally, delete associated academic years and classes if required
    await AcademicYear.deleteMany({ branch: branchId });
    await Class.deleteMany({ academicYear: { $in: academicYearIds } });

    res.status(200).json({
      success: true,
      message: "Branch deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Branches
exports.getBranches = async (req, res) => {
  try {
    const branches = await Branch.find(); // Fetch all branches from the database
    res.status(200).json({ success: true, branches });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
