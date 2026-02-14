const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

const db = admin.firestore();

/*
GET - Get user cart
*/
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const snapshot = await db
      .collection("carts")
      .doc(userId)
      .collection("items")
      .get();

    const cartItems = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
POST - Add item to cart
*/
router.post("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, name, price, quantity } = req.body;

    const cartItem = {
      productId,
      name,
      price,
      quantity,
      addedAt: new Date()
    };

    await db
      .collection("carts")
      .doc(userId)
      .collection("items")
      .add(cartItem);

    res.json({ message: "Item added to cart successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
DELETE - Remove item from cart
*/
router.delete("/:userId/:itemId", async (req, res) => {
  try {
    const { userId, itemId } = req.params;

    await db
      .collection("carts")
      .doc(userId)
      .collection("items")
      .doc(itemId)
      .delete();

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
