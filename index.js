const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();

// 🔥 Firebase Initialize
admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_KEY)
  ),
});

const db = admin.firestore();

app.use(cors());
app.use(express.json());

// ✅ Import Routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cartRoutes = require("./routes/cartRoutes");
const productRoutes = require("./routes/productRoutes"); // ✅ Added

// ✅ Use Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes); // ✅ Added

// Root Test
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
