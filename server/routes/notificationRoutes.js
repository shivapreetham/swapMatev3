// routes/notifications.js
const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notificationController');

// Fetch all notifications for a user
router.get('/:userId', NotificationController.getUserNotifications);

// Mark notification as read
router.put('/:userId/mark-as-read', NotificationController.markAsRead);

module.exports = router;
