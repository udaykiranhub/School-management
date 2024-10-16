const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // trim: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
});

// Ensure section names are unique within the same class
sectionSchema.index({ name: 1, classId: 1 }, { unique: true });

module.exports = mongoose.model("Section", sectionSchema);
