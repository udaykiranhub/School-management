const express = require("express");
const router = express.Router();
const Academicyearcontroller = require("../controller/Academicyearcontroller");

router.post("/add/:branchId", Academicyearcontroller.createAcademicYear);
router.get("/view/:branchId", Academicyearcontroller.getAcademicYears);

module.exports = router;
