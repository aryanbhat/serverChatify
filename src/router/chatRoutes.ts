import express from 'express'
import { authenticate } from '../middleware/auth';
import { Chat } from '../model/models';
import { MyRequest } from '../utils/typedef';

const router = express.Router();

router.post("/", authenticate, async (req:MyRequest, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.json({ message: "User is not provided in body" });
    return;
  }

  const chat = await Chat.find({
    IsGroup: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user } } },
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
      users: [req.user, userId],
    };

    const newChat = await new Chat(chatData);
    await newChat.save();
    const existing = await Chat.findById(newChat._id).populate("users","-password -__v").populate("LatestMessage")
    res.json(existing);
  }
});

export default router;
