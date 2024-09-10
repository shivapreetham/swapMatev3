# Attendance and Proxy Management System

This is an attendance tracking and proxy-seeking web application built using the MERN stack (MongoDB, Express, React, Node). The application allows students to log their attendance, request proxies, and manage tokens for transactions within the system.

## Features

1. **User Authentication**
   - User registration with username, password, college email, and personal email.
   - Secure login with encrypted passwords.

2. **Attendance Tracker**
   - Log daily attendance for different classes.
   - View public attendance records and performance.
   - Leaderboard to encourage competition and reward daily logins with tokens.

3. **Token System**
   - Tokens as the currency for proxy transactions.
   - Daily login rewards with tokens.
   - Token leaderboard to display the number of tokens each user has.
   - Loan system for tokens instead of monetary transactions.

4. **Proxy Request System**
   - **Public Proxy Requests**: Post and accept proxy requests with tokens as rewards.
   - **Private Proxy Requests**: Encrypted one-on-one chat for personal proxy requests.

5. **Exchange Proxy System**
   - Swap classes with peers for a single day without token transactions.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Express
- React

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/attendance-proxy-system.git
    ```

2. Install dependencies for both the server and client:
    ```bash
    cd attendance-proxy-system
    npm install
    cd client
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory and add the following:
        ```env
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        ```

4. Run the application:
    ```bash
    npm run dev
    ```

## Project Timeline

### Day One
- Research and outline all features (2-3 hours).
- Set up the development environment (2-3 hours).

### Day Two
- Build the login system, including user registration and authentication (4-5 hours).
- Begin designing the MongoDB schema (1-2 hours).

### Day Three
- Complete the MongoDB schema for users and attendance records (2-3 hours).
- Develop the attendance tracker feature (3-4 hours).

### Day Four
- Implement the token system and daily login rewards (3-4 hours).
- Start building the proxy request system, focusing on public requests (2-3 hours).

### Day Five
- Complete the private request feature with encrypted messaging (3-4 hours).
- Test all features thoroughly and gather feedback (2-3 hours).

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.

## Contact

If you have any questions or suggestions, feel free to reach out at your-email@example.com.
