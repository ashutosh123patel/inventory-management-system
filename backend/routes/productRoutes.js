const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Product = require("../models/Product");

// GET all products (protected)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send("Error fetching products");
  }
});

// POST add product (protected)
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { name, quantity, price, category } = req.body;

    const newProduct = new Product({
      name,
      quantity,
      price,
      category
    });

    await newProduct.save();

    res.status(201).send("Product saved to database");
  } catch (error) {
    res.status(500).send("Error saving product");
  }
});

// UPDATE product (protected)
router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).send("Error updating product");
  }
});

// DELETE product (protected)
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send("Product deleted");
  } catch (error) {
    res.status(500).send("Error deleting product");
  }
});

module.exports = router;