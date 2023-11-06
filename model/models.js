const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String },
    password: String,
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: String,
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageSchema);

const ChatSchema = new mongoose.Schema(
  {
    ChatName: String,
    IsGroup: Boolean,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    LatestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    GroupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = { Chat, Message, User };
