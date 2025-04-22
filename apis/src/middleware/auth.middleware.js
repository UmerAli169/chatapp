const jwt = require("jsonwebtoken");
const redis = require("../config/redis");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: "No token found" });

  const isBlacklisted = await redis.get(`bl_${token}`);
  if (isBlacklisted) return res.status(401).json({ message: "Token blacklisted" });

  try {
    const decoded = jwt.verify(token, "process.env.JWT_SECRET"); 
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
