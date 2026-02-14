const express = require("express");
const app = express();

// IMPORTANT: Render needs this
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// VERY IMPORTANT: listen on 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`);
});