const express = require("express");
const router = express.Router();

// Admin dashboard
router.get("/", (req, res) => {
  res.render("admin"); // Admin logic can be added later
});

module.exports = router;
