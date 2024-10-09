const Branch = require("../models/Branches");

// Create Branch
exports.createBranch = async (req, res) => {
  try {
    const { name, address } = req.body;
    const branch = new Branch({ name, address, mainAdmin: req.user.id });
    await branch.save();
    res
      .status(201)
      .json({ success: true, message: "Branch created successfully", branch });
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

    // Optionally, you can also delete associated academic years and classes if required
    await AcademicYear.deleteMany({ branch: branchId });
    await Class.deleteMany({ academicYear: { $in: academicYearIds } });

    res
      .status(200)
      .json({ success: true, message: "Branch deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
