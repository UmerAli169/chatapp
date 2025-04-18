const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const chatController = require('../controlles/chat.controller');

router.post('/', auth, chatController.accessChat);
router.get('/', auth, chatController.fetchChats);
router.post('/group', auth, chatController.createGroupChat);
router.put('/rename', auth, chatController.renameGroup);
router.put('/groupadd', auth, chatController.addToGroup);
router.put('/groupremove', auth, chatController.removeFromGroup);

module.exports = router;
