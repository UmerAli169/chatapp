const express = require("express");
const MessageController = require('../controlles/message.controller');
const  authMiddleware  = require("../middleware/auth.middleware");
const router = express.Router();
router.post("/", authMiddleware,MessageController.sendMessage);
router.get("/:chatId", authMiddleware,MessageController.getMessage);
router.put('/seen/:messageId', authMiddleware, MessageController.markAsSeen);

router.put('/edit/:messageId', authMiddleware, MessageController.editMessage);


module.exports = router;
 