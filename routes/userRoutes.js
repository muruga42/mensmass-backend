const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "Muthuraja" },
    { id: 2, name: "Test User" }
  ]);
});

module.exports = router;
