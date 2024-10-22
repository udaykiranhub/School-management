// controllers/feeTypeController.js
const FeeType = require("../models/Feetypes");

// Add a new fee type
exports.addFeeType = async (req, res) => {
  const { type, terms } = req.body;

  try {
    const newFeeType = new FeeType({ type, terms });
    await newFeeType.save();
    return res.status(201).json({ success: true, feeType: newFeeType });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to add fee type", error });
  }
};

// Get all fee types
exports.getAllFeeTypes = async (req, res) => {
  try {
    const feeTypes = await FeeType.find();
    return res.status(200).json({ success: true, feeTypes });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve fee types", error });
  }
};

// Update a fee type
exports.updateFeeType = async (req, res) => {
  const { id } = req.params;
  const { type, terms } = req.body;

  try {
    const updatedFeeType = await FeeType.findByIdAndUpdate(
      id,
      { type, terms },
      { new: true }
    );
    if (!updatedFeeType) {
      return res
        .status(404)
        .json({ success: false, message: "Fee type not found" });
    }
    return res.status(200).json({ success: true, feeType: updatedFeeType });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to update fee type", error });
  }
};

// Delete a fee type
exports.deleteFeeType = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFeeType = await FeeType.findByIdAndDelete(id);
    if (!deletedFeeType) {
      return res
        .status(404)
        .json({ success: false, message: "Fee type not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Fee type deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete fee type", error });
  }
};
