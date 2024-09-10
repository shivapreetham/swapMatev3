import express from "express";
import { getMessage, sendMessage } from "../controllers/messageController";

const router = express.Router();
router.post("/send/:id", sendMessage);
router.get("/get/:id", getMessage);

export default router;
