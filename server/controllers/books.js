const pool = require("../db");

const addBook = async (req, res) => {
  try {
    const { book_id, title, isbn, publication_date, publisher_id } = req.body;

    const existingBook = await pool.query(
      "SELECT * FROM book WHERE book_id = $1",
      [book_id]
    );

    if (existingBook.rows.length > 0) {
      return res.status(409).json({ error: "book_id already exists" });
    }

    const newBook = await pool.query(
      "INSERT INTO book (book_id, title, isbn, num_pages, publication_date, publisher_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [book_id, title, isbn, num_pages, publication_date, publisher_id]
    );

    res.json(newBook.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await pool.query(
      "SELECT book.book_id, book.title, book.isbn, book.num_pages, book.publication_date, publisher.publisher_name, book.publisher_id FROM book JOIN publisher ON book.publisher_id = publisher.publisher_id"
    );
    res.json(allBooks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
};

const getBookById = async (req, res) => {
  try {
    const { book_id } = req.params;
    const book = await pool.query(
      "SELECT book.book_id, book.title, book.isbn, book.num_pages, book.publication_date, publisher.publisher_name FROM public.book JOIN public.publisher ON book.publisher_id = publisher.publisher_id WHERE book.book_id = book_id",
      [book_id]
    );
    res.json(book.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
};

const updateBookById = async (req, res) => {
  try {
    const { book_id } = req.params;
    const { title, isbn, num_pages, publication_date, publisher_id } = req.body;

    const existingBook = await pool.query(
      "SELECT * FROM book WHERE book_id = $1",
      [book_id]
    );

    if (existingBook.rows.length <= 0) {
      return res.status(409).json({ error: "Book doesn't exist" });
    }

    const updateBook = await pool.query(
      "UPDATE book SET title = $1, isbn = $2, num_pages = $3, publication_date = $4, publisher_id = $5 WHERE book_id = $6",
      [title, isbn, num_pages, publication_date, publisher_id, book_id]
    );

    res.json("book was updated!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
};

const deleteBookById = async (req, res) => {
  try {
    const { book_id } = req.params;
    const deletBook = await pool.query("DELETE FROM book WHERE book_id = $1", [
      book_id,
    ]);

    res.json("book was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
};
module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};
