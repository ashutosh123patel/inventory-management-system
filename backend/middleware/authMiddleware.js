// Authentication middleware to verify user is logged in
const authMiddleware = (req, res, next) => {
  try {
    // In a real application, this would verify JWT token
    // For now, we'll assume user info comes from the request
    // This is a placeholder - implement with your actual auth logic
    
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'Not authenticated. Please login.' });
    }

    // User is authenticated, proceed
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};

module.exports = authMiddleware;
