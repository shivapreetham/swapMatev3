// routes/notifications.js
const express = require('express');
const Notification = require('../models/Notification');
const router = express.Router();

// Fetch all notifications for a user
router.get('/:userId', async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// Mark notification as read
router.put('/:id/mark-as-read', async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
        res.json(notification);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
