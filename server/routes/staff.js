const express = require("express");
const router = express.Router();
const {
  addStaff,
  getAllStaff,
  getStaffById,
  updateStaffById,
  deleteStaffById,
} = require("../controllers/staff");

// ADD STAFF
router.post("/", addStaff);

// GET ALL STAFF
router.get("/", getAllStaff);

// GET STAFF BY STAFF ID
router.get("/:staff_id", getStaffById);

// UPDATE STAFF
router.put("/:staff_id", updateStaffById);

// DELETE STAFF
router.delete("/:staff_id", deleteStaffById);

module.exports = router;
