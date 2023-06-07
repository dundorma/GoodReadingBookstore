const pool = require("../db");

const addStore = async (req, res) => {
  try {
    const { store_id, address_id } = req.body;

    const existingStore = await pool.query(
      "SELECT * FROM store WHERE store_id = $1",
      [store_id]
    );

    if (existingStore.rows.length > 0) {
      return res.status(409).json({ error: "store_id already exists" });
    }

    const newStore = await pool.query(
      "INSERT INTO store (store_id, address_id) VALUES ($1, $2) RETURNING *",
      [store_id, address_id]
    );

    res.json(newStore.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
};

const getAllStore = async (req, res) => {
  try {
    const allStore = await pool.query(
      "SELECT store.store_id, store.address_id, address.street_number, address.street_name, address.city, address.country FROM store JOIN address ON store.address_id = address.address_id"
    );
    res.json(allStore.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
};

const getStoreById = async (req, res) => {
  try {
    const { store_id } = req.params;
    const store = await pool.query(
      "SELECT store.store_id, store.address_id, address.street_number, address.street_name, address.city, address.country FROM store JOIN address ON store.address_id = address.address_id WHERE store_id = $1",
      [store_id]
    );
    res.json(store.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
};

const updateStoreById = async (req, res) => {
  try {
    const { store_id } = req.params;
    const { address_id } = req.body;

    const existingStore = await pool.query(
      "SELECT * FROM store WHERE store_id = $1",
      [store_id]
    );

    if (existingStore.rows.length <= 0) {
      return res.status(409).json({ error: "Store doesn't exist" });
    }

    const updateStore = await pool.query(
      "UPDATE store SET address_id = $1 WHERE store_id = $2",
      [address_id, store_id]
    );

    res.json("store was updated!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
};

const deleteStoreById = async (req, res) => {
  try {
    const { store_id } = req.params;
    const deleteStore = await pool.query(
      "DELETE FROM store WHERE store_id = $1",
      [store_id]
    );

    res.json("store was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
};

module.exports = {
  addStore,
  getAllStore,
  getStoreById,
  updateStoreById,
  deleteStoreById,
};
