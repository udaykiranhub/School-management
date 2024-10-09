const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sections: [
      {
        name: {
          type: String,
          required: true,
        },
      },
    ],
    academicYear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);
