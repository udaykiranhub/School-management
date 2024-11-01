const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  idNo: String,
  admissionNo: String,
  surname: String,
  name: String,
  gender: String,
  class: {
    name: {
      type: String,
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
  },

  section: {
    name: {
      type: String,
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  },
  dob: Date,
  admissionDate: Date,
  photo: String,
  aadharNo: String,
  studentAAPR: String,
  caste: String,
  subCaste: String,
  fatherName: String,
  fatherAadhar: String,
  fatherOccupation: String,
  motherName: String,
  motherAadhar: String,
  motherOccupation: String,
  whatsappNo: String,
  emergencyContact: String,
  address: {
    doorNo: String,
    street: String,
    city: String,
    pincode: String,
  },
  transport: Boolean,
  transportDetails: {
    town: String,
    bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus" },
    halt: String,
  },
  hostel: Boolean,
  hostelDetails: {
    hostelFee: String,
    terms: String,
  },
  feeDetails: [
    {
      feeType: String,
      amount: Number,
      terms_accepted: String,
      concession: Number,
    },
  ],
});

module.exports = mongoose.model("Student", studentSchema);
