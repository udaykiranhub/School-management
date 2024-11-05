const Student = require('../models/student');
// const cloudinary = require('cloudinary').v2;
const mongoose= require("mongoose")
const bcrypt = require("bcryptjs");


// Add a new student
exports.addStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();

    // Retrieve ID and phone number
    const studentId = req.body.idNo;
    const aadharNumber = req.body.aadharNo;
    const hashedpsd = await bcrypt.hash(aadharNumber, 10);
    const name=req.body.name;

    // Create new user object
    const newUser = {
      name,
      username: studentId,
      password : hashedpsd,
      role:'Student'
      // Add other user information (username, password, role)
    };

    // Save the new user
    await mongoose.model('User').create(newUser);

    res.status(201).json({ success: true, message: 'Student and User added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding student or user', error });
  }
};

