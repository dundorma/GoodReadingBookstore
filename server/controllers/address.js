const pool = require("../db");

const addAddress = async (req, res) => {
  try {
    const { address_id, street_number, street_name, city, country } = req.body;

    const existingAddress = await pool.query(
      "SELECT * FROM address WHERE address_id = $1",
      [address_id]
    );

    if (existingAddress.rows.length > 0) {
      return res.status(409).json({ error: "address_id already exists" });
    }

    const newAddress = await pool.query(
      "INSERT INTO address (address_id, street_number, street_name, city, country) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [address_id, street_number, street_name, city, country]
    );

    res.json(newAddress.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
};

const getAllAddress = async (req, res) => {
  try {
    const allAddress = await pool.query("SELECT * FROM Address");
    res.json(allAddress.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
};

const getAddressById = async (req, res) => {
  try {
    const { address_id } = req.params;
    const address = await pool.query(
      "SELECT * FROM address WHERE address_id = $1",
      [address_id]
    );
    res.json(address.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
};

const updateAddressById = async (req, res) => {
  try {
    const { address_id } = req.params;
    const { street_number, street_name, city, country } = req.body;

    const existingAddress = await pool.query(
      "SELECT * FROM address WHERE address_id = $1",
      [address_id]
    );

    if (existingAddress.rows.length <= 0) {
      return res.status(409).json({ error: "Address doesn't exist" });
    }

    const updateAddress = await pool.query(
      "UPDATE address SET street_number = $1, street_name = $2, city = $3, country = $4 WHERE address_id = $5",
      [street_number, street_name, city, country, address_id]
    );

    res.json("address was updated!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
};

const deleteAddressById = async (req, res) => {
  try {
    const { address_id } = req.params;
    const deletAuthor = await pool.query(
      "DELETE FROM address WHERE address_id = $1",
      [address_id]
    );

    res.json("address was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
};
module.exports = {
  addAddress,
  getAllAddress,
  getAddressById,
  updateAddressById,
  deleteAddressById,
};
