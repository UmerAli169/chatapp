const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.generateToken = (payload, expiresIn = "15d") =>
  jwt.sign(payload, 'process.env.JWT_SECRET', { expiresIn });

exports.generateRefreshToken = (payload, expiresIn = "7d") =>
  jwt.sign(payload, 'process.env.JWT_REFRESH_SECRET', { expiresIn });

exports.verifyToken = (token) => jwt.verify(token, 'process.env.JWT_SECRET');

exports.verifyRefreshToken = (token) =>
  jwt.verify(token, 'process.env.JWT_REFRESH_SECRET');
