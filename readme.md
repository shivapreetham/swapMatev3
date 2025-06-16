Attendance and Proxy Management System

A web-based attendance tracking and proxy-seeking system built with the MERN stack (MongoDB, Express.js, React, Node.js). This platform allows students to log their attendance, request or offer proxies, and manage a token-based transaction system.

🚀 Features
1. User Authentication
User registration with username, password, college email, and personal email.

Secure login with encrypted password storage (bcrypt).

2. Attendance Tracker
Log daily attendance across multiple classes.

View your attendance history and public performance stats.

Leaderboard to encourage daily check-ins and consistent participation.

3. Token System
Tokens act as a currency for proxy transactions.

Daily login rewards with tokens to boost engagement.

Token-based leaderboard to showcase top users.

A non-monetary loan system using tokens.

4. Proxy Request System
Public Proxy Requests: Post requests visible to all users and offer tokens as incentives.

Private Proxy Requests: Encrypted one-on-one chats for discreet proxy arrangements.

5. Exchange Proxy System
Peer-to-peer proxy swaps for single-day classes — no tokens required.

🛠️ Getting Started
✅ Prerequisites
Node.js & npm

MongoDB (local or cloud)

Basic MERN stack environment

📦 Installation
Clone the repository

bash
Copy
Edit
git clone https://github.com/your-username/attendance-proxy-system.git
cd attendance-proxy-system
Install dependencies

bash
Copy
Edit
# For the server
npm install

# For the client
cd client
npm install
Set up environment variables

Create a .env file in the root directory:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Run the development server

bash
Copy
Edit
npm run dev
🤝 Contributing
We welcome contributions!
Fork the repo, create a feature branch, make your changes, and submit a pull request.

📄 License
This project is licensed under the MIT License.

📬 Contact
For questions, feedback, or collaboration, reach out at:
📧 2005shivapreetham@gmail.com
