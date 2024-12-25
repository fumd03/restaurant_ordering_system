const pool = require("../db");

module.exports = {
  getAllMenuItems: async () => {
    const result = await pool.query("SELECT * FROM menu_items");
    return result.rows;
  },
};
