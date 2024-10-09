const mongoose = require("mongoose");

const academicYearSchema = new mongoose.Schema(
  {
    startYear: {
      type: Number,
      required: true,
    },
    endYear: {
      type: Number,
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
