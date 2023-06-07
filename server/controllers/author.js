const pool = require("../db");

const addAuthor = async (req, res) => {
  try {
    const { author_id, author_name } = req.body;

    const existingAuthor = await pool.query(
      "SELECT * FROM author WHERE author_id = $1",
      [author_id]
    );

    if (existingAuthor.rows.length > 0) {
      return res.status(409).json({ error: "author_id already exists" });
    }

    const newAuthor = await pool.query(
      "INSERT INTO author (author_id, author_name) VALUES ($1, $2) RETURNING *",
      [author_id, author_name]
    );

    res.json(newAuthor.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
};

const getAllAuthors = async (req, res) => {
  try {
    const allAuthors = await pool.query("SELECT * FROM author");
    res.json(allAuthors.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const { author_id } = req.params;
    const author = await pool.query(
      "SELECT * FROM author WHERE author_id = $1",
      [author_id]
    );
    res.json(author.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
};

const updateAuthorById = async (req, res) => {
  try {
    const {author_id} = req.params;
    const {author_name} = req.body;

    const existingAuthor = await pool.query(
      "SELECT * FROM author WHERE author_id = $1",
      [author_id]
    );

    if (existingAuthor.rows.length <= 0) {
      return res.status(409).json({ error: "Author doesn't exist" });
    }

    const updateAuthor = await pool.query(
      "UPDATE author SET author_name = $1 WHERE author_id = $2",
      [author_name, author_id],
    );

    res.json("author was updated!")
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
}

const deleteAuthorById = async (req, res) => {
  try {
    const {author_id} = req.params;
    const deletAuthor = await pool.query("DELETE FROM author WHERE author_id = $1", [author_id]);

    res.json("author was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
}
module.exports = {
  addAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthorById,
  deleteAuthorById
};
