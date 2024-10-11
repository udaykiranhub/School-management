const User = require("../models/users");
const Branch = require("../models/Branches");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Main Admin
exports.registerMainAdmin = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      username,
      password: hashedPassword,
      role: "MainAdmin",
    });
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "Main Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "user not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, error: true, message: "password mismatch" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({
      data: user,
      success: true,
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Branch Admin
exports.deleteBranchAdmin = async (req, res) => {
  const adminId = req.params.adminId;

  try {
    // Find and delete the admin by ID
    const admin = await User.findById(adminId);
    if (!admin || admin.role !== "BranchAdmin") {
      return res
        .status(404)
        .json({
          success: false,
          message: "Admin not found or is not a branch admin",
        });
    }

    // Remove the branchAdmin reference from the branch
    if (admin.branch) {
      await Branch.findByIdAndUpdate(admin.branch, {
        $unset: { branchAdmin: "" },
      });
    }

    // Delete the admin
    await User.findByIdAndDelete(adminId);

    res
      .status(200)
      .json({ success: true, message: "Branch admin deleted successfully" });
  } catch (error) {
    console.error("Error deleting branch admin:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error while deleting branch admin",
      });
  }
};

// Update Main Admin
exports.updateMainAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, username, password } = req.body;

    const updatedData = { name, username };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Main Admin not found" });
    }

    res.json({
      success: true,
      message: "Main Admin updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Branch Admin
exports.updateBranchAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, username, password, branchId } = req.body;

    const updatedData = { name, username, branch: branchId };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Branch Admin not found" });
    }

    res.json({
      success: true,
      message: "Branch Admin updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.assignBranchAdmin = async (req, res) => {
  const { name, username, password, branchId } = req.body;

  try {
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new branch admin
    const branchAdmin = await User.create({
      name,
      username,
      password: hashedPassword,
      role: "BranchAdmin",
      branch: branchId,
    });

    // Update branch with admin reference
    await Branch.findByIdAndUpdate(branchId, { branchAdmin: branchAdmin._id });

    res.status(201).json({
      success: true,
      message: "Branch admin assigned successfully",
      data: branchAdmin,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all branch admins
exports.getAllBranchAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "BranchAdmin" }).populate("branch");
    res.status(200).json({ success: true, admins });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
3;
