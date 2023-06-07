const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// ROUTES INCLUDE
const authorRoutes = require("./routes/author");
const bookRoutes = require("./routes/books");
const storeRoutes = require("./routes/store");
const staffRoutes = require("./routes/staff");
const addressRoutes = require("./routes/address");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);
app.use("/stores", storeRoutes);
app.use("/staffs", staffRoutes);
app.use("/addresses", addressRoutes);

app.listen(8080, () => {
  console.log("server has started on port 8080");
});
