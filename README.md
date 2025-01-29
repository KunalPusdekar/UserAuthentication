# User Authentication


![React](https://img.shields.io/badge/Frontend-React-blue)
![Express](https://img.shields.io/badge/Backend-Express-orange)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)

---

## 📝 Overview

The **User Authentication system** is a full-featured authentication service that allows users to securely sign up, sign in, reset passwords, and log out. It is built with Express.js, MongoDB, and JWT for authentication. The system includes essential features like user creation, authentication, password management, and more.

---

## ⭐ Features

- ** 🎯 User Authentication**:
  - User signup and signin with JWT-based authentication
  - Secure password storage with bcrypt
  - Role-based authentication (e.g., users must be authenticated to access certain routes)

- ** 🔒 Password Management**:
  - Password reset via email
  - Forgot password functionality

- ** 🛠️ Token-based Authentication**:
  - JWT-based token generation for secure routes
  - Token verification middleware for protected endpoints


---

## ⚙️ Technologies Used

- **Frontend**: React.js
- **Backend**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Encryption**: bcrypt for password hashing
- **Email**: Nodemailer for sending email notifications
- **Other Tools**: dotenv, cookie-parser, cors

---

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/KunalPusdekar/UserAuthentication.git
   ```

2. Install dependencies for both the client and server:

   ```bash
   # Navigate to the client folder
   cd client
   npm install

   # Navigate to the backend folder
   cd backend
   npm install
   ```

3. Start the development server:

   ```bash
   # Start the frontend
   cd ../client
   npm start

   # Start the backend
   cd ../backend
   npm start
   ```

---

## 🌱 Environment Variables

Create a `.env` file in the `server/` directory based on the `.env.example` file. Below are the required environment variables:

```env
NODE_ENV = development
PORT = 8081
MONGO_URI = mongodb://127.0.0.1:27017/lms

JWT_SECRET=<YOUR_JWT_SECRET>
JWT_EXPIRY=<JWT_EXPIRY_TIME>

EMAIL_HOST=<SMTP_HOST>
EMAIL_PORT=<SMTP_PORT>
EMAIL_USER=<SMTP_USERNAME>
EMAIL_PASS=<SMTP_PASSWORD>
EMAIL_FROM=<SMTP_FROM_EMAIL>
```

---

## 🚀 Usage

1. **Start the Application**:
   - The frontend will be available at `http://localhost:3000`
   - The backend will run at `http://localhost:8081`

2. **Navigate the Platform**:
   - Create an account and log in
   - Explore available courses and subscribe
   - Admins can manage courses and users

---


## 💫 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for any improvements or suggestions.

---

## ✉️ Contact

For any questions or feedback, please email <a href="mailto:kunalpusdekar16@gmail.com">kunalpusdekar16@gmail.com</a>.
