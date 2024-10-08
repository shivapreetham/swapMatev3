const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

const authRoutes = require('./routes/authRoutes.js');
const attendanceRoutes = require('./routes/attendanceRoutes.js');
const proxyRoutes = require('./routes/proxyRoutes.js');
const profileRoutes = require('./routes/profileRoute.js');
const userRoutes = require('./routes/userRoute.js');
const messageRoutes = require('./routes/messageRoutes.js');
const { server: chatServer } = require('./sockets/chatSocket.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/';

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/profile', profileRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/proxy', proxyRoutes);
app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);

app.get('/', (req, res) => {
  console.log(`${req.method} ${req.url}`);
  res.status(200).send('Welcome To SwapMate');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

mongoose.connect(URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is Running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
