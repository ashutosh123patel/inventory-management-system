const mongoose = require('mongoose');
const Sale = require('../models/Sale');
const Product = require('../models/Product');


exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate('product', 'name price')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: sales.length,
      data: sales
    });

  } catch (error) {
    console.error("GET SALES ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



exports.createSale = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    // 1. Validate input
    if (!product || !quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid input"
      });
    }

    // 2. Find product
    const productData = await Product.findById(product);
    if (!productData) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // 3. Check stock
    if (productData.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock"
      });
    }

    // 4. Calculate price
    const priceAtSale = productData.price;
    const totalPrice = priceAtSale * quantity;

    // 5. Create sale
    const sale = await Sale.create({
      product,
      quantity,
      priceAtSale,
      totalPrice,
      user: req.user?.id || req.user?._id // 🔥 SAFE FIX
    });

    // 6. Reduce stock
    productData.quantity -= quantity;
    await productData.save();

    res.status(201).json({
      success: true,
      data: sale
    });

  } catch (error) {
    console.error("CREATE SALE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create sale"
    });
  }
};



exports.cancelSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: "Sale not found"
      });
    }

    if (sale.status === 'cancelled') {
      return res.status(400).json({
        message: "Sale already cancelled"
      });
    }

    const product = await Product.findById(sale.product);

    // Restore stock
    product.quantity += sale.quantity;
    await product.save();

    sale.status = 'cancelled';
    await sale.save();

    res.json({
      success: true,
      message: "Sale cancelled and stock restored"
    });

  } catch (error) {
    console.error("CANCEL SALE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};