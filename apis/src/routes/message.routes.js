const express = require("express");
const MessageController = require('../controlles/message.controller');
const  authMiddleware  = require("../middleware/auth.middleware");
const router = express.Router();
router.get("/:chatId", authMiddleware,MessageController.getMessage);
router.post("/", authMiddleware,MessageController.sendMessage);
router.put('/seen/:messageId', authMiddleware, MessageController.markAsSeen);

router.put('/edit/:messageId', authMiddleware, MessageController.editMessage);
router.delete('/delete/:messageId', authMiddleware, MessageController.deleteMessage);



module.exports = router;
