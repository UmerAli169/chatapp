const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const jwtUtil = require("../utils/jwt");

const { register, login, logout } = require("../controlles/auth.controller");
const validate = require("../middleware/validate.middleware");
const { registerSchema, loginSchema } = require("../validators/auth.validator");
const auth = require("../middleware/auth.middleware");

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch user" });
  }
});

router.get("/logout", logout);

router.get("/refresh", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, "process.env.JWT_REFRESH_SECRET");
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    // Generate new access token
    const newAccessToken = jwtUtil.generateToken({ id: user._id });

    // Optionally, regenerate refresh token here if desired (you could invalidate the old one)
    const newRefreshToken = jwtUtil.generateRefreshToken({ id: user._id });

    // Set new refresh token in cookies
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    // Send new access token in response
    res.status(200).json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    console.error(error);
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
});

module.exports = router;
