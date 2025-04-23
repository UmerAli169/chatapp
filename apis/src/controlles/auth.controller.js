const User = require("../models/user.model");
const jwtUtil = require("../utils/jwt");
const redis = require("../config/redis");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: "Email already used" });

  const user = await User.create({ username, email, password });

  const accessToken = jwtUtil.generateToken({ id: user._id });
  const refreshToken = jwtUtil.generateRefreshToken({ id: user._id });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,

    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.status(201).json({ user: { id: user._id, email, username } });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const accessToken = jwtUtil.generateToken({ id: user._id });
  const refreshToken = jwtUtil.generateRefreshToken({ id: user._id });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,

    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.status(200).json({
    user: { id: user._id, email, username: user.username },
  });
};

exports.logout = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (token)
    await redis.set(`bl_${token}`, "blacklisted", "EX", 7 * 24 * 60 * 60);
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
};
