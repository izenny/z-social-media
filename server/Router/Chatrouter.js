const express = require("express");
const router = express.Router();
const chatController = require("../Controllers/Chatcontroller");

router.get("/getchat/:userId",chatController.getChats);
router.post("/message", chatController.incomingMessage);
router.post('/newchat',chatController.NewChat);

module.exports = router;
