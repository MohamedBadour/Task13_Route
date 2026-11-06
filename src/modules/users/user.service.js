import { User } from "../../DB/models/user.model.js";

export const getUserShareProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("name email createdAt");
    if (!user) return res.status(404).json({ message: "User not found." });
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
