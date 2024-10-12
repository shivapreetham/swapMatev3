import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotificationItem from '../components/Notification/NotificationItem';
import { FaBell } from 'react-icons/fa';

const NotificationsList = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        
        // Get user ID from local storage
        const userId = localStorage.getItem('userId'); // Change 'userId' to your local storage key if different
        console.log(userId);
        const fetchNotifications = async () => {
            try {
                console.log("laa rhaa hu notifications ");
                const response = await axios.get(`/api/notifications/${userId}`); // Use the userId in the API call
                
                console.log(response.data);
                if (isMounted) {
                    setNotifications(response.data);
                }
            } catch (err) {
                console.error('Error fetching notifications:', err);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchNotifications();

        return () => {
            isMounted = false;
        };
    }, []);

    const markAsRead = async (id) => {
        try {
            await axios.put(`/api/notifications/${id}/mark-as-read`);
            setNotifications(notifications.map(notification =>
                notification._id === id
                    ? { ...notification, isRead: true }
                    : notification
            ));
        } catch (err) {
            console.error('Error marking notification as read:', err);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden w-full max-w-3xl h-[600px]">
                <h3 className="text-xl font-bold p-4 border-b border-gray-700 text-white flex items-center">
                    <FaBell size={24} className="mr-3" />
                    Notifications
                </h3>
                <div className="h-full overflow-y-auto">
                    {loading ? (
                        <p className="text-center text-gray-400 mt-10">Loading notifications...</p>
                    ) : notifications.length === 0 ? (
                        <p className="text-center text-gray-400 mt-10">No notifications yet</p>
                    ) : (
                        notifications.map((notification) => (
                            <NotificationItem
                                key={notification._id}
                                notification={notification}
                                onMarkAsRead={markAsRead}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationsList;
