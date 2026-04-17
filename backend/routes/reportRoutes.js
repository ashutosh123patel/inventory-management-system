const express = require('express');
const router = express.Router();

const {
  getSalesReport,
  getInventoryReport
} = require('../controllers/reportController');

const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/adminMiddleware');

// Admin-only reports
router.get('/sales', authMiddleware, authorizeRoles("admin"), getSalesReport);
router.get('/inventory', authMiddleware, authorizeRoles("admin"), getInventoryReport);

module.exports = router;