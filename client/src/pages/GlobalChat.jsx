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

const GlobalChat = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('YourUsername'); // Replace with actual username logic

  useEffect(() => {
    socket.emit('joinRoom', 'global');

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      console.log(message);
    });

    socket.emit('getMessages', { room: 'global' });

    socket.on('receiveMessages', (fetchedMessages) => {
      setMessages(fetchedMessages);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (messageText) => {
    if (messageText.trim()) {
      
      const message = {
        room: 'global',
        message: messageText,
        sender: username,
      };
      socket.emit('sendMessage', message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-grow flex flex-col justify-between p-4">
        <ChatWindow room="global" sendMessage={sendMessage} messages={messages} />
      </div>
    </div>
  );
};

export default GlobalChat;
