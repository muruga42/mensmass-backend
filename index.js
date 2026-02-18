require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");

const app = express();

/* =========================
   Middlewares
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   Razorpay Initialization
========================= */

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error("❌ Razorpay keys are missing in environment variables");
  process.exit(1);
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* =========================
   Health Check Route
========================= */
app.get("/", (req, res) => {
  res.send("✅ Backend running successfully");
});

/* =========================
   Create Order Route
========================= */
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }

    const options = {
      amount: amount * 100, // Convert ₹ to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.error("❌ Razorpay Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Order creation failed",
      error: error.message,
    });
  }
});

/* =========================
   Start Server
========================= */
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});