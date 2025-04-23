const messageModel = require("../models/message.model");
const Chat = require("../models/chat.model");

exports.sendMessage = async (req, res) => {
  try {
    const { content, chatId, file, repliedTo } = req.body;
    const newMessage = await messageModel.create({
      sender: req.user.id,
      content: content,
      chat: chatId,
      file: file,
      repliedTo: repliedTo,
    });

    await Chat.findByIdAndUpdate(chatId, { latestMessage: newMessage._id });
    const fullchat = await messageModel
      .findById(newMessage.id)
      .populate("sender", "username email")
      .populate("chat")
      .populate({
        path: "repliedTo",
        populate: { path: "sender", select: "username email" },
      });

    return res.status(201).json(fullchat);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to send message", error: err.message });
  }
};
exports.getMessage = async (req, res) => {
  try {
    const messgae = await messageModel
      .find({ chat: req.params.chatId })
      .populate("sender", "username email")
      .populate("repliedTo");
    return res.status(200).json(messgae);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to send message", error: err.message });
  }
};

exports.editMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const editMessage = await messageModel
      .findByIdAndUpdate(
        req.params.messageId,
        { content, edited: true },
        { new: true }
      )
      .populate("sender", "email username");
    return res.status(200).json(editMessage);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to send message", error: err.message });
  }
};

exports.markAsSeen = async (req, res) => {
  try {
    const lastSeeen = await messageModel
      .findByIdAndUpdate(
        req.params.messageId,
        {
          $addToSet: { seenBy: req.user.id },
        },
        { new: true }
      )
      .populate("sender", "username email");
    return res.status(200).json(lastSeeen);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to send message", error: err.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.messageId;
    const foundMessage = await messageModel.findById(messageId);

    if (!foundMessage) {
      return res.status(404).json({ message: "No message found" });
    }

    await messageModel.deleteOne({ _id: messageId });

    return res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to delete message",
      error: err.message,
    });
  }
};
