// controllers/attendanceController.js
const Attendance = require('../models/Attendance');

// Controller to add attendance
const addAttendance = async (req, res) => {
  const { academicId, branchId, classId, sectionId, date, absentees } = req.body;

  try {
    const attendance = new Attendance({
      academicId,
      branchId,
      classId,
      sectionId,
      date,
      absentees
    });

    const savedAttendance = await attendance.save();
    res.status(201).json({
      success: true,
      data: savedAttendance,
      message: 'Attendance saved successfully!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error saving attendance data',
      error: error.message
    });
  }
};

// 1. Get Absentees by branchId, academicId, classId, sectionId, date
const getAbsentees = async (req, res) => {
  const { branchId, academicId, classId, sectionId, date } = req.query;

  try {
    const filter = {};
    if (branchId) filter.branchId = branchId;
    if (academicId) filter.academicId = academicId;
    if (classId) filter.classId = classId;
    if (sectionId) filter.sectionId = sectionId;
    if (date) filter.date = date;

    const attendanceData = await Attendance.find(filter).populate('absentees', 'name rollNo');

    if (attendanceData.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No attendance records found for the given filters'
      });
    }

    const absentees = attendanceData.map((attendance) => ({
      date: attendance.date,
      absentees: attendance.absentees
    }));

    res.status(200).json({
      success: true,
      data: absentees
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching absentee data',
      error: error.message
    });
  }
};

// 2. Get number of absents for each student in a given month
const getMonthlyAbsents = async (req, res) => {
  const { branchId, academicId, classId, sectionId, month } = req.params;

  try {
    // Convert month to zero-indexed (e.g., Jan = 0, Feb = 1, etc.)
    const monthIndex = month - 1;

    // Query for attendance within the given month
    const filter = {
      branchId,
      academicId,
      classId,
      sectionId,
      date: {
        $gte: new Date(new Date().getFullYear(), monthIndex, 1), // Start of month
        $lt: new Date(new Date().getFullYear(), monthIndex + 1, 0) // End of month
      }
    };

    const attendanceData = await Attendance.find(filter).populate('absentees', 'name rollNo');

    // Map to count absences for each student
    const absenteeCount = {};

    attendanceData.forEach((attendance) => {
      attendance.absentees.forEach((student) => {
        if (absenteeCount[student._id]) {
          absenteeCount[student._id] += 1;
        } else {
          absenteeCount[student._id] = 1;
        }
      });
    });

    const result = Object.keys(absenteeCount).map(studentId => ({
      studentId,
      absentCount: absenteeCount[studentId]
    }));

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching monthly absentee data',
      error: error.message
    });
  }
};

module.exports = {
  getAbsentees,
  getMonthlyAbsents,
  addAttendance
};
