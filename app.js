require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/orders");
const adminRoutes = require("./routes/admin");

const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/", menuRoutes); // Home and menu
app.use("/orders", orderRoutes); // Orders
app.use("/admin", adminRoutes); // Admin

// Server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
