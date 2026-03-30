const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.send("Login API working");
});

module.exports = router;