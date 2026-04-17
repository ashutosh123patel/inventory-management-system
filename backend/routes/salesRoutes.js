const express = require("express");
const router = express.Router();

const {
  getSales,
  createSale,
  cancelSale
} = require("../controllers/salesController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// View sales → both allowed
router.get("/", authMiddleware, getSales);

router.post("/", authMiddleware, authorizeRoles("admin"), createSale);

router.put("/:id/cancel", authMiddleware, authorizeRoles("admin"), cancelSale);

module.exports = router;