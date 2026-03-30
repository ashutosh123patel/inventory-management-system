const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Get all products");
});

router.get("/add", (req, res) => {
  res.send("Product added");
});

module.exports = router;