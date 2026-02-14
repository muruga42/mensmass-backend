const express = require("express");
const cors = require("cors");
const app = express();

const admin = require("firebase-admin");

// 🔥 Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_KEY)
  )
});

app.use(cors());
app.use(express.json());

// 🔹 Import routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cartRoutes = require("./routes/cartRoutes"); // ✅ Cart Added

// 🔹 Use routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes); // ✅ Cart Route Active

// 🔹 Root test
app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
