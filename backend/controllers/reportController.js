const Sale = require('../models/Sale');
const Product = require('../models/Product');


exports.getSalesReport = async (req, res) => {
  try {
    const report = await Sale.aggregate([
      { $match: { status: "completed" } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
          totalOrders: { $sum: 1 }
        }
      }
    ]);

    const sales = await Sale.find({ status: "completed" })
      .populate('product', 'name price')
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      summary: report[0] || { totalRevenue: 0, totalOrders: 0 },
      recentSales: sales
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.getInventoryReport = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .populate('category', 'name');

    const totalProducts = products.length;

    const totalStockValue = products.reduce(
      (sum, p) => sum + (p.price * p.quantity), 0
    );

    const lowStockItems = products.filter(
      p => p.quantity <= p.lowStockThreshold
    );

    res.json({
      success: true,
      summary: {
        totalProducts,
        totalStockValue,
        lowStockCount: lowStockItems.length
      },
      lowStockItems,
      products
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};