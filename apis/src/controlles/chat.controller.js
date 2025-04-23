const Chat = require("../models/chat.model");
const User = require("../models/user.model");

// ✅ Access one-to-one chat
exports.accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) return res.status(400).json({ message: "UserId required" });

  try {
    let chat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [req.user.id, userId] },
    })
      .populate("users", "-password")
      .populate("latestMessage");

    if (chat) return res.status(200).json(chat);

    // create chat if it doesn't exist
    const newChat = await Chat.create({
      chatName: "sender",
      isGroupChat: false,
      users: [req.user.id, userId],
    });

    const fullChat = await Chat.findById(newChat._id).populate(
      "users",
      "-password"
    );
    return res.status(200).json(fullChat);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error accessing chat", error: err.message });
  }
};
exports.pinMessage = async (req, res) => {
  const {  messageId } = req.body;
const chatId= req.params.chatId
console.log(chatId,'umer',messageId)

  try {
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { $addToSet: { PinnedMessages: messageId } },
      { new: true }
    ).populate("PinnedMessages");
    res.status(200).json(chat);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to pin message", error: err.message });
  }
};
// ✅ Fetch all chats for current user
exports.fetchChats = async (req, res) => {
  try {
    const chats = await Chat.find({ users: req.user.id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .populate("PinnedMessages")
      .sort({ updatedAt: -1 });
    return res.status(200).json(chats);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch chats", error: err.message });
  }
};

// ✅ Create group chat
exports.createGroupChat = async (req, res) => {
  const { users, name } = req.body;

  if (!users || !name)
    return res.status(400).json({ message: "Name and users required" });
  const allUsers = [users, req.user.id];
  try {
    const groupChat = await Chat.create({
      chatName: name,
      users: allUsers,
      isGroupChat: true,
      groupAdmin: req.user.id,
    });

    const fullGroup = await Chat.findById(groupChat._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(201).json(fullGroup);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Group creation failed", error: err.message });
  }
};

// ✅ Rename group
exports.renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(200).json(updatedChat);
  } catch (err) {
    res.status(500).json({ message: "Rename failed", error: err.message });
  }
};

// ✅ Add to group
exports.addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { $addToSet: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ message: "Add user failed", error: err.message });
  }
};

// ✅ Remove from group
exports.removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ message: "Remove user failed", error: err.message });
  }
};
