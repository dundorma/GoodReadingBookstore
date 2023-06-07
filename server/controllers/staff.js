const pool = require("../db");

const addStaff = async (req, res) => {
  try {
    const { staff_id, name, email, address_id, store_id } = req.body;

    const existingStaff = await pool.query(
      "SELECT * FROM staff WHERE staff_id = $1",
      [staff_id]
    );

    if (existingStaff.rows.length > 0) {
      return res.status(409).json({ error: "staff_id already exists" });
    }

    const newStaff = await pool.query(
      "INSERT INTO staff (staff_id, name, email, address_id, store_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [staff_id, name, email, address_id, store_id]
    );

    res.json(newStaff.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
};

const getAllStaff = async (req, res) => {
  try {
    const allStaff = await pool.query("SELECT * FROM staff");
    res.json(allStaff.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
};

const getStaffById = async (req, res) => {
  try {
    const { staff_id } = req.params;
    const staff = await pool.query("SELECT * FROM staff WHERE staff_id = $1", [
      staff_id,
    ]);
    res.json(staff.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
};

const updateStaffById = async (req, res) => {
  try {
    const { staff_id } = req.params;
    const { name, email, address_id, store_id } = req.body;

    const existingStaff = await pool.query(
      "SELECT * FROM staff WHERE staff_id = $1",
      [staff_id]
    );

    if (existingStaff.rows.length <= 0) {
      return res.status(409).json({ error: "Store doesn't exist" });
    }

    const updateStaff = await pool.query(
      "UPDATE staff SET name = $1, email = $2, address_id = $3, store_id = $4 WHERE staff_id = $5",
      [name, email, address_id, store_id, staff_id]
    );

    res.json("staff was updated!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
};

const deleteStaffById = async (req, res) => {
  try {
    const { staff_id } = req.params;
    const deleteStaff = await pool.query(
      "DELETE FROM staff WHERE staff_id = $1",
      [staff_id]
    );

    res.json("staff was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "SERVER ERROR" });
  }
};

module.exports = {
  addStaff,
  getAllStaff,
  getStaffById,
  updateStaffById,
  deleteStaffById,
};
