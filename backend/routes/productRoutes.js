const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Anyone logged in can view
router.get("/", authMiddleware, getProducts);

router.post("/", authMiddleware, authorizeRoles("admin"), createProduct);
router.put("/:id", authMiddleware, authorizeRoles("admin"), updateProduct);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteProduct);

module.exports = router;