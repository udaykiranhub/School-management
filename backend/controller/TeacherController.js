const Teacher = require('../models/Teachers');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

exports.addTeacher = async (req, res) => {
    try {
        const { aadharNumber, name } = req.body;

        // Check for existing teacher
        const existingTeacher = await Teacher.findOne({ aadharNumber });
        if (existingTeacher) {
            return res.status(400).json({
                success: false,
                message: 'Teacher with this Aadhar number already exists',
            });
        }

        // Create new teacher
        const newTeacher = new Teacher(req.body);
        await newTeacher.save();

        // Create user account for teacher with correct role
        const hashedPassword = await bcrypt.hash(aadharNumber, 10);
        await mongoose.model('User').create({
            name,
            username: aadharNumber,
            password: hashedPassword,
            role: 'Teacher' // Updated to match User model enum
        });

        res.status(201).json({
            success: true,
            message: 'Teacher added successfully',
            data: newTeacher,
        });
    } catch (error) {
        console.error('Error in addTeacher:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding teacher',
            error: error.message,
        });
    }
};
exports.getTeachers = async (req, res) => {
    try {
        const { academicId } = req.params;
        const teachers = await Teacher.find({ academic_id: academicId });

        res.status(200).json({
            success: true,
            data: teachers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching teachers',
            error: error.message,
        });
    }
};

exports.getTeacherById = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const teacher = await Teacher.findById(teacherId);

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found',
            });
        }

        res.status(200).json({
            success: true,
            data: teacher,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching teacher',
            error: error.message,
        });
    }
};

exports.updateTeacher = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const teacher = await Teacher.findByIdAndUpdate(
            teacherId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Teacher updated successfully',
            data: teacher,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating teacher',
            error: error.message,
        });
    }
};

exports.deleteTeacher = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const teacher = await Teacher.findByIdAndDelete(teacherId);

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found',
            });
        }

        // Delete associated user account
        await mongoose.model('User').deleteOne({ username: teacher.aadharNumber });

        res.status(200).json({
            success: true,
            message: 'Teacher deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting teacher',
            error: error.message,
        });
    }
};