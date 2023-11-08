const express = require("express");
const { authenticate } = require("../middleware/auth");
const { Chat } = require("../model/models");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.json({ message: "User is not provided in body" });
    return;
  }

  const chat = await Chat.find({
    IsGroup: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users","-password -__v")
    .populate("LatestMessage");

  if (chat.length > 0) {
    res.json(chat[0]);
  } else {
    const chatData = {
      chatName: "sender",
      IsGroup: false,
      users: [req.user._id, userId],
    };

    const newChat = new Chat(chatData);
    await newChat.save();
    res.json(newChat);
  }
});

module.exports = router;
