const express = require("express");
const app = express();

app.use(express.json());

// Import routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// Root test
app.get("/", (req, res) => {
  res.send("Backend is running successfully ✅");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
