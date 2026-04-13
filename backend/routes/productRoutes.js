const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/adminMiddleware');

// Get all products (accessible to all authenticated users)
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      message: 'Products fetched successfully',
      products
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// Get product by ID (accessible to all authenticated users)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({
      message: 'Product fetched successfully',
      product
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

// Add product (admin only)
router.post('/add', authMiddleware, isAdmin, async (req, res) => {
  try {
    const { name, quantity, price, category } = req.body;

    // Validate input
    if (!name || !quantity || !price || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newProduct = new Product({
      name,
      quantity,
      price,
      category
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: 'Product added successfully',
      product: savedProduct
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
});

// Update product (admin only)
router.put('/update/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    const { name, quantity, price, category } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, quantity, price, category },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

// Delete product (admin only)
router.delete('/delete/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product deleted successfully',
      product: deletedProduct
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

module.exports = router;
