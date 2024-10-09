const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    branchAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    academicYears: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicYear",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Branch", branchSchema);
