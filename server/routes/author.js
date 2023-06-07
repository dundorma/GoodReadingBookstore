const express = require("express");
const router = express.Router();
const {addAuthor, getAllAuthors, getAuthorById, updateAuthorById, deleteAuthorById} = require("../controllers/author");

// ADD AUTHOR
router.post("/", addAuthor);

// Get All Authors
router.get("/", getAllAuthors);

// Get Specific Author by author_id
router.get("/:author_id", getAuthorById);

// Update Author
router.put("/:author_id", updateAuthorById);

// Delete Author
router.delete("/:author_id", deleteAuthorById)
module.exports = router;
