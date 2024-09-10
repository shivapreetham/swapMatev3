import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ChatWindow from '../components/Chat/ChatWindow';
import Sidebar from '../components/Chat/Sidebar';

const socket = io('http://localhost:5000', {
  withCredentials: true,
  extraHeaders: {
    "Content-Type": "application/json"
  }
});

const PrivateChat = ({ roomId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('joinRoom', roomId);

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const sendMessage = (message) => {
    socket.emit('sendMessage', { room: roomId, message });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow flex flex-col justify-between bg-gray-800 p-4">
        <ChatWindow room={roomId} sendMessage={sendMessage} messages={messages} />
      </div>
    </div>
  );
};

export default PrivateChat;
