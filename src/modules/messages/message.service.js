import { Message } from "../../DB/models/message.model.js";
import { User } from "../../DB/models/user.model.js";

// Send message anonymously
export const sendMessage = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Message content cannot be empty." });
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) return res.status(404).json({ message: "Receiver user not found." });

    const message = await Message.create({ content, receiverId });
    return res.status(201).json({ message: "Message sent successfully.", data: message });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get inbox messages
export const getMyMessages = async (req, res) => {
  try {
    const messages = await Message.find({ receiverId: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({ count: messages.length, messages });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Delete message
export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findOneAndDelete({ _id: messageId, receiverId: req.user._id });
    if (!message) {
      return res.status(404).json({ message: "Message not found or you are not authorized to delete it." });
    }
    return res.status(200).json({ message: "Message deleted successfully." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
