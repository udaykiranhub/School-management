const express = require("express");

const router = express.Router();
const { Addtown, getallTowns } = require("../controller/TownController");

router.post("/add", Addtown);
router.get("/alltowns/:academicId", getallTowns);

module.exports = router;
