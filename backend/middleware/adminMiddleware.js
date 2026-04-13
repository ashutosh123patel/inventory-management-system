// Admin middleware to restrict access to admin users only
const isAdmin = (req, res, next) => {
  // Check if user exists (should be set by auth middleware)
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  // Check if user role is admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }

  // User is admin, proceed to next middleware/route handler
  next();
};

module.exports = isAdmin;
