const express = require("express");
const {
  addFeeType,
  getAllFeeTypes,
  updateFeeType,
  deleteFeeType,
} = require("../controller/FeeTypeController");

const router = express.Router();
router.post("/add", addFeeType);
router.get("/allfeetypes", getAllFeeTypes);
router.put("/update", updateFeeType);
router.delete("/delete", deleteFeeType);

module.exports = router;
