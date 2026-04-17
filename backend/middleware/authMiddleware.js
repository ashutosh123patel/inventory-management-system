const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token, authorization denied"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    req.user = {
      id: user._id,
      ...user._doc
    };

    next();

  } catch (error) {
    let message = "Token is not valid";

    if (error.name === "TokenExpiredError") {
      message = "Token expired";
    }

    res.status(401).json({
      success: false,
      message
    });
  }
};

module.exports = authMiddleware;