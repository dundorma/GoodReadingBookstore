const express = require("express");
const router = express.Router();
const {
  addStore,
  getAllStore,
  getStoreById,
  updateStoreById,
  deleteStoreById,
} = require("../controllers/store");

// ADD STORE
router.post("/", addStore);

// GET ALL STORE
router.get("/", getAllStore);

// GET STORE BY STORE ID
router.get("/:store_id", getStoreById);

// UPDATE STORE
router.put("/:store_id", updateStoreById);

// DELETE STORE
router.delete("/:store_id", deleteStoreById);

module.exports = router;
