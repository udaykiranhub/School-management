const express = require('express');
const router = express.Router();
const StudentControllers = require('../controller/StudentController');

router.post('/add-student', StudentControllers.addStudent);

module.exports = router;
