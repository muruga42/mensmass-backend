const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");

const db = admin.firestore();
const JWT_SECRET = "your_secret_key";

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    await db.collection("users").add({
      email: email,
      password: password,
      createdAt: new Date(),
    });

    return res.status(201).json({
      message: "User registered successfully",
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const snapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (snapshot.empty) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const userDoc = snapshot.docs[0];
    const user = userDoc.data();

    if (password !== user.password) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: userDoc.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token: token,
      user: {
        id: userDoc.id,
        email: user.email,
      },
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
