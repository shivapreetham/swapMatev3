import React from 'react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const NotificationItem = ({ notification, onMarkAsRead }) => {
    const getIcon = () => {
        switch (notification.type) {
            case 'attendance':
                return <FaCheckCircle className="h-6 w-6 text-green-400" />;
            case 'global_request':
                return <FaExclamationCircle className="h-6 w-6 text-yellow-400" />;
            case 'private_request':
                return <FaExclamationCircle className="h-6 w-6 text-red-400" />;
            default:
                return <FaExclamationCircle className="h-6 w-6 text-gray-400" />;
        }
    };

    return (
        <div className={`p-4 border-b ${notification.isRead ? 'bg-gray-800 opacity-75' : 'bg-gray-700'} text-white transition-opacity duration-300`}>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    {getIcon()}
                    <div className="ml-4">
                        <h4 className="text-lg font-bold capitalize">{notification.type.replace('_', ' ')}</h4>
                        <p className="text-sm text-gray-400">{notification.message}</p>
                    </div>
                </div>
                {!notification.isRead && (
                    <button
                        onClick={() => onMarkAsRead(notification._id)}
                        className="text-blue-400 text-sm hover:underline"
                    >
                        Mark as Read
                    </button>
                )}
            </div>
        </div>
    );
};

export default NotificationItem;
