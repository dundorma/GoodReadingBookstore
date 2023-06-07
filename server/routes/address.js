const express = require("express");
const router = express.Router();
const {
  addAddress,
  getAllAddress,
  getAddressById,
  updateAddressById,
  deleteAddressById,
} = require("../controllers/address");

// ADD AUTHOR
router.post("/", addAddress);

// Get All Authors
router.get("/", getAllAddress);

// Get Specific Author by author_id
router.get("/:address_id", getAddressById);

// Update Author
router.put("/:address_id", updateAddressById);

// Delete Author
router.delete("/:address_id", deleteAddressById);
module.exports = router;
