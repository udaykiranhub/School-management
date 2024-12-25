const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    examName: {
      type: String,
      required: true,
    },
    examType: {
      type: String,
      required: true,
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    academicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: true,
    },
    subjects: [
      {
        name: {
          type: String,
          required: true,
        },
        marks: {
          type: Number,
          required: true,
        },
        passMarks: {
          type: Number,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
        ampm: {
          type: String,
          enum: ["AM", "PM"],
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

examSchema.index(
  { examName: 1, classId: 1, academicYear: 1 },
  { unique: true }
);

module.exports = mongoose.model("Exam", examSchema);
