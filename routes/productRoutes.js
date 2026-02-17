const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

const db = admin.firestore();

/*
GET - Get all products
*/
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("products").get();

    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
POST - Add new product
*/
router.post("/", async (req, res) => {
  try {
    const { name, price, description, image, stock } = req.body;

    const newProduct = {
      name,
      price,
      description,
      image,
      stock,
      createdAt: new Date()
    };

    const docRef = await db.collection("products").add(newProduct);

    res.status(201).json({
      id: docRef.id,
      ...newProduct
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
