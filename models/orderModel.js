const pool = require("../db");

module.exports = {
  placeOrder: async (customerName, customerAddress, cartItems) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const orderResult = await client.query(
        "INSERT INTO orders (customer_name, customer_address) VALUES ($1, $2) RETURNING id",
        [customerName, customerAddress]
      );
      const orderId = orderResult.rows[0].id;

      for (const item of cartItems) {
        await client.query(
          "INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES ($1, $2, $3)",
          [orderId, item.menuItemId, item.quantity]
        );
      }

      await client.query("COMMIT");
      return orderId;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },
};
