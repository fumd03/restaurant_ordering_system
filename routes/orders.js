const express = require("express");
const router = express.Router();
const orderModel = require("../models/orderModel");

// Place an order
router.post("/place", async (req, res) => {
  const { customerName, customerAddress, cartItems } = req.body;

  // Check if customerName and customerAddress are provided
  if (
    !customerName ||
    customerName.trim() === "" ||
    !customerAddress ||
    customerAddress.trim() === ""
  ) {
    return res.send("Customer name and address are required.");
  }

  // Filter out items with zero quantity
  const filteredCartItems = Object.values(cartItems)
    .filter((item) => item.quantity > 0) // Only include items with quantity > 0
    .map((item) => ({
      menuItemId: item.menuItemId,
      quantity: item.quantity,
    }));

  if (filteredCartItems.length === 0) {
    // If no items were selected, send an error or redirect the user
    return res.send("You need to select at least one item to place an order.");
  }

  // Place the order in the database
  try {
    const orderId = await orderModel.placeOrder(
      customerName,
      customerAddress,
      filteredCartItems
    );
    res.redirect(`/orders/confirmation/${orderId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while placing the order.");
  }
});

// Order confirmation
router.get("/confirmation/:id", (req, res) => {
  res.render("confirmation", { orderId: req.params.id });
});

module.exports = router;
