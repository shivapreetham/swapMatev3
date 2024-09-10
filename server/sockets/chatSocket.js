const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
});

const users = {}; // Object to store connected users and their socket IDs

const chatSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('registerUser', (userId) => {
      users[userId] = socket.id;
    });

    socket.on('joinRoom', (room) => {
      try {
        socket.join(room);
        console.log(`User joined room: ${room}`);
      } catch (error) {
        console.error(`Failed to join room: ${room}`, error);
      }
    });

    socket.on('sendMessage', (data) => {
      try {
        io.to(data.room).emit('receiveMessage', data);
      } catch (error) {
        console.error('Error sending message', error);
      }
    });

    socket.on('disconnect', () => {
      for (let userId in users) {
        if (users[userId] === socket.id) {
          delete users[userId];
          break;
        }
      }
      console.log('Client disconnected');
    });
  });
};

const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

chatSocket(io);

module.exports = { server, io, getReceiverSocketId };
