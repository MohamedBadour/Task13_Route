import jwt from "jsonwebtoken";
import { User } from "../DB/models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "saraha_secret_key";

export const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token required." });
    }
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};
