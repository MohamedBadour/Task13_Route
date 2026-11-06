import { Router } from "express";
import * as US from "./user.service.js";

const router = Router();
router.get("/:id", US.getUserShareProfile);

export default router;
