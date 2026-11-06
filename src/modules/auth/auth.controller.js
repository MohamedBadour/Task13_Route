import { Router } from "express";
import * as AS from "./auth.service.js";
import { loginLimiter } from "../../middleware/rateLimiter.js";

const router = Router();
router.post("/signup", AS.signup);
router.post("/signin", loginLimiter, AS.signin);

export default router;
