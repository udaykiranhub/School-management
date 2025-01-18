const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const database = require("./config/database");
require("dotenv").config();
const app = express();
const router = require("./routers/route");
const branchRoutes = require("./routers/BranchRoutes");
const protect = require("./middleware/Authtoken");
const userRoutes = require("./routers/UserRoutes");
const acdemicRoutes = require("./routers/AcademicRoutes");
const classRoutes = require("./routers/ClassRoutes");
const sectionRoutes = require("./routers/SectionRoutes");
const feeRoutes = require("./routers/FeeTypeRouters");
const townroutes = require("./routers/TownRoutes");
const busroutes = require("./routers/BusRoutes");
const studentRoutes = require("./routers/studentRoutes");
const examRoutes = require("./routers/ExamRoutes");
const marksRoutes = require("./routers/MarksRoutes");
const syllabusRoutes = require("./routers/SyllabusRoutes.js")
const teacherRoutes = require("./routers/TeacherRoutes");
const teacherAssignRoutes = require("./routers/TeacherAssignRoutes.js");
const workingdays = require("./routers/WorkingDaysRoutes.js")
const attendanceRoutes = require("./routers/AttendanceRoutes.js")
const homeworkroutes = require("./routers/HomeWorkRoutes.js")

//app.use(cors());
const corsOptions = {
  origin: ["http://localhost:5173"], 
  methods: ['GET', 'POST', 'DELETE', 'PUT'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

app.use("/api", router);
app.use("/api/branch", protect.authMiddleware, branchRoutes);
app.use("/api/branch", protect.authMiddleware, userRoutes);
app.use("/api/academic", protect.authMiddleware, acdemicRoutes);
app.use("/api/classes", protect.authMiddleware, classRoutes);
app.use("/api/sections", protect.authMiddleware, sectionRoutes);
app.use("/api/Fee-types", protect.authMiddleware, feeRoutes);
app.use("/api/towns", protect.authMiddleware, townroutes);
app.use("/api/buses", protect.authMiddleware, busroutes);
app.use("/api/students", protect.authMiddleware, studentRoutes);
app.use("/api/exams", protect.authMiddleware, examRoutes);
app.use("/api/marks", protect.authMiddleware, marksRoutes);
app.use("/api/syllabus", protect.authMiddleware, syllabusRoutes)
app.use("/api/teachers", protect.authMiddleware, teacherRoutes);
app.use("/api/teachersassingn", protect.authMiddleware, teacherAssignRoutes);
app.use("/api/workingdays",protect.authMiddleware,workingdays);
app.use("/api/attendance",protect.authMiddleware,attendanceRoutes);
app.use("/api/homework",protect.authMiddleware,homeworkroutes);



database().then(
  app.listen(process.env.PORT, () => {
    console.log("server is running");
  })
);

// Add this line with your other route imports
const enquiryRoutes = require("./routers/enquiryRoutes");

// Add this line with your other app.use statements
app.use("/api/enquiry", protect.authMiddleware, enquiryRoutes);
