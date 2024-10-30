const Bus = require("../models/Bus");
const AcademicYear = require("../models/Acyear");

// Add a new bus
exports.addBus = async (req, res) => {
  try {
    const {
      busNo,
      vehicleNo,
      driverName,
      driverPhone,
      destination,
      viaTowns,
      academicId,
    } = req.body;

    // Check if bus number already exists for the academic year
    const existingBus = await Bus.findOne({ busNo, academicId });
    if (existingBus) {
      return res.status(400).json({
        success: false,
        message: "Bus number already exists for this academic year",
      });
    }

    const newBus = new Bus({
      busNo,
      vehicleNo,
      driverName,
      driverPhone,
      destination,
      viaTowns,
      academicId,
    });

    const savedBus = await newBus.save();

    // Add bus reference to the AcademicYear's buses array
    await AcademicYear.findByIdAndUpdate(academicId, {
      $push: { buses: savedBus._id },
    });

    return res.status(201).json({
      success: true,
      message: "Bus added successfully",
      data: savedBus,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add bus",
      error: error.message,
    });
  }
};

// Get all buses for a specific academic year
exports.getAllBuses = async (req, res) => {
  try {
    const { academicId } = req.params;

    // Find all buses related to the specific academic year
    const buses = await Bus.find({ academicId });
    return res.status(200).json({ success: true, data: buses });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch buses",
      error: error.message,
    });
  }
};
exports.searchBusesByPlace = async (req, res) => {
  try {
    const { academicId } = req.params;
    const { place } = req.body; // Expecting a single place name in the request body

    // Validate input
    if (typeof place !== 'string' || place.trim() === '') {
      return res.status(400).json({
        success: false,
        message: "place must be a non-empty string",
      });
    }

    // Find buses that have the specified place in the viaTowns array and match the academic year ID
    const buses = await Bus.find({
      academicId,
      viaTowns: { $elemMatch: { $eq: place } } // Check if the place exists in the viaTowns array
    });

    if (buses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No buses found for the given criteria",
      });
    }

    return res.status(200).json({ success: true, data: buses });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to search buses",
      error: error.message,
    });
  }
};


// Update a bus
exports.updateBus = async (req, res) => {
  try {
    const { busId } = req.params;
    const updatedData = req.body;

    // Update the bus
    const updatedBus = await Bus.findByIdAndUpdate(busId, updatedData, {
      new: true,
    });
    if (!updatedBus) {
      return res.status(404).json({ success: false, message: "Bus not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Bus updated successfully",
      data: updatedBus,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update bus",
      error: error.message,
    });
  }
};

// Delete a bus
exports.deleteBus = async (req, res) => {
  try {
    const { busId } = req.params;

    // Find and delete the bus
    const deletedBus = await Bus.findByIdAndDelete(busId);
    if (!deletedBus) {
      return res.status(404).json({ success: false, message: "Bus not found" });
    }

    // Remove the bus reference from the AcademicYear's buses array
    await AcademicYear.findByIdAndUpdate(deletedBus.academicId, {
      $pull: { buses: deletedBus._id },
    });

    return res
      .status(200)
      .json({ success: true, message: "Bus deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete bus",
      error: error.message,
    });
  }
};
