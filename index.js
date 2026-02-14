const express = require("express");
const app = express();
const admin = require("firebase-admin");

/// 🔥 Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_KEY)
  )
});

app.use(express.json());

/// ✅ Import Routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

/// ✅ Use Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

/// Root Test
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
