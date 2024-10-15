const mongoose = require("mongoose");

const academicYearSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: true,
      unique: true,
      match: /^\d{4}-\d{4}$/, // Ensure the format is like "2024-2025"
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    classes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("AcademicYear", academicYearSchema);
