const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

const db = admin.firestore();

/*
-----------------------------------------
GET - Get user cart
URL: /api/cart/:userId
-----------------------------------------
*/
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const snapshot = await db
      .collection("carts")
      .doc(userId)
      .collection("items")
      .get();

    const cartItems = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
-----------------------------------------
POST - Add product to cart
URL: /api/cart/add
-----------------------------------------
*/
router.post("/add", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "Missing userId or productId" });
    }

    await db
      .collection("carts")
      .doc(userId)
      .collection("items")
      .add({
        productId,
        quantity: quantity || 1,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

    res.json({ message: "Product added to cart successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
-----------------------------------------
DELETE - Remove item from cart
URL: /api/cart/:userId/:itemId
-----------------------------------------
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
