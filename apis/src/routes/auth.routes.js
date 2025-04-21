const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

const { register, login, logout } = require("../controlles/auth.controller");
const validate = require("../middleware/validate.middleware");
const { registerSchema, loginSchema } = require("../validators/auth.validator");
const auth = require('../middleware/auth.middleware');

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", auth, ( async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch user" });
    }
  }));

router.post("/logout", logout);

module.exports = router;
