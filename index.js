require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const admin = require("firebase-admin");

const app = express();

/* ===============================
   🔥 Firebase Init (ENV based)
================================ */
admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_KEY)
  ),
});

/* ===============================
   ⚙️ Middlewares
================================ */
app.use(cors());
app.use(express.json());

/* ===============================
   💳 Razorpay Init
================================ */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ===============================
   🚀 Health Check
================================ */
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

/* ===============================
   🛒 Create Order Route
================================ */
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ error: "Order creation failed" });
  }
});

/* ===============================
   🌍 Server Start
================================ */
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});