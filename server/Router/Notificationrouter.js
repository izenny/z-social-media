const express = require("express");
const router = express.Router();
const notificationsController = require("../Controllers/Notificationcontroller");

// POST /notifications
// Create a new notification
router.post("/", notificationsController.createNotification);

// GET /notifications
// Get all notifications
router.get("/:id", notificationsController.getNotificationByUserId);

// DELETE /notifications/:id
// Delete a notification by ID
router.delete("/:id", notificationsController.deleteNotification);

module.exports = router;
