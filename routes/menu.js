const express = require("express");
const router = express.Router();
const menuModel = require("../models/menuModel");

// Show menu items
router.get("/", async (req, res) => {
  const menuItems = await menuModel.getAllMenuItems();
  res.render("index", { menuItems });
});

module.exports = router;
