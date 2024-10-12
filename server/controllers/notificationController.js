// controllers/NotificationController.js
const Notification = require('../models/Notification');

exports.sendNotification = async (userId, type, message) => {
  const notification = new Notification({ userId, type, message });
  await notification.save();
};

exports.getUserNotifications = async (req, res) => {  // Updated function name to match the route
  try {
    const userId = req.params.id;
    console.log(userId);
    console.log("bantu bantu notification req banthu");  // Get user ID from request parameters
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications' });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id: notificationId } = req.params;  // Renamed notificationId to id for consistency with the route
    const notification = await Notification.findByIdAndUpdate(notificationId, { isRead: true });
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Error marking notification as read' });
  }
};
