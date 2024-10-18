const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sections: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to Section model
        ref: "Section", // The name of the Section model
      },
    ],
    academicYear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: true,
    },
    subjects: [
      {
        type: String, // Array of subject names as strings
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);
