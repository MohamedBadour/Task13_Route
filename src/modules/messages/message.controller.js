import { Router } from "express";
import * as MS from "./message.service.js";
import { auth } from "../../middleware/auth.js";

const router = Router();
// Send anonymous message to user
router.post("/:receiverId", MS.sendMessage);
// Get inbox (protected)
router.get("/", auth, MS.getMyMessages);
// Delete message (protected)
router.delete("/:messageId", auth, MS.deleteMessage);

export default router;
