const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["MainAdmin", "BranchAdmin"],
      required: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: function () {
        return this.role === "BranchAdmin";
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
