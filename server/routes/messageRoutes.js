const express = require("express");
const { getMessage, sendMessage } = require("../controllers/messageController.js");

const router = express.Router();
router.post("/send/:id", sendMessage);
router.get("/get/:id", getMessage);

module.exports= router;
