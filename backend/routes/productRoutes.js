const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

// GET all products (from DB)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.send("Error fetching products");
  }
});

// POST add product (save to DB)
router.post("/add", async (req, res) => {
  try {
    const { name, quantity, price, category } = req.body;

    const newProduct = new Product({
      name,
      quantity,
      price,
      category
    });

    await newProduct.save();

    res.send("Product saved to database");
  } catch (error) {
    res.send("Error saving product");
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.send("Error updating product");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send("Product deleted");
  } catch (error) {
    res.send("Error deleting product");
  }
});

module.exports = router;