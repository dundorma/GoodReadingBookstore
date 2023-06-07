const express = require("express");
const router = express.Router();
const {
  addBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
} = require("../controllers/books");
// ADD BOOK
router.post("/", addBook);

// GET ALL BOOK
router.get("/", getAllBooks);

// GET BOOK BY BOOK ID
router.get("/:book_id", getBookById);

// UPDATE BOOK
router.put("/:book_id", updateBookById);

// DELETE BOOK
router.delete("/:book_id", deleteBookById);

module.exports = router;
