const express = require("express");
const router = express.Router();

const usercontroller = require("../controller/Usercontroller");
// Assign admin to branch
router.post("/assign-admin", usercontroller.assignBranchAdmin);

// Get all branch admins
router.get("/alladmins", usercontroller.getAllBranchAdmins);

router.delete("/del-admin/:adminId", usercontroller.deleteBranchAdmin);

module.exports = router;
