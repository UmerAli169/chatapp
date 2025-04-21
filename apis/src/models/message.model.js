const mongoose = require("mongoose");
const messasgeSchemas = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    file: {
      url: String,
      type: String,
    },
    seenBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    replaiedTo: {
      type: mongoose.Schema.Types.ObjectId,
      red: "Message",
    },
    edited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messasgeSchemas);
