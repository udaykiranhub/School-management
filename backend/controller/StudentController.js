const Student = require('../models/student');
// const cloudinary = require('cloudinary').v2;



// Add a new student
exports.addStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ success:true, message: 'Student added successfully' });
  } catch (error) {
    res.status(500).json({  success:false ,message: 'Error adding student', error });
  }
};


