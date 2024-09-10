import React from "react";

function Message({ message }) {
  // Retrieve userId from local storage directly
  const userId = localStorage.getItem("userId");
  
  // Check if the message was sent by the logged-in user
  const itsMe = message.senderId === userId;

  // Set classes based on the message sender
  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500" : "";

  // Format the message's creation time
  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div>
      <div className="p-4">
        <div className={`chat ${chatName}`}>
          <div className={`chat-bubble text-white ${chatColor}`}>
            {message.message}
          </div>
          <div className="chat-footer">{formattedTime}</div>
        </div>
      </div>
    </div>
  );
}

export default Message;
