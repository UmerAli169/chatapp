const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");
const router = express.Router();
router.post("/", authMiddleware);
router.get("/:chatId", authMiddleware);
module.exports = router;
