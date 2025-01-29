<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>User Authentication</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f7fa;
    }

    header {
      background-color: #24292f;
      color: white;
      padding: 10px 20px;
    }

    header h1 {
      margin: 0;
    }

    main {
      padding: 20px;
    }

    h2 {
      color: #333;
    }

    .badge {
      padding: 5px 10px;
      margin: 0 5px;
      border-radius: 5px;
      font-size: 14px;
    }

    .badge-license {
      background-color: #4CAF50;
      color: white;
    }

    .badge-backend {
      background-color: #FF5722;
      color: white;
    }

    .badge-database {
      background-color: #4CAF50;
      color: white;
    }

    .badge {
      background-color: #4CAF50;
      color: white;
    }

    .content {
      background-color: white;
      margin: 20px 0;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    ul {
      list-style-type: disc;
      margin-left: 20px;
    }

    table {
      width: 100%;
      margin: 20px 0;
      border-collapse: collapse;
    }

    table th, table td {
      padding: 10px;
      border: 1px solid #ddd;
    }

    table th {
      background-color: #f2f2f2;
    }

    footer {
      text-align: center;
      background-color: #24292f;
      color: white;
      padding: 10px 0;
      position: fixed;
      width: 100%;
      bottom: 0;
    }
  </style>
</head>

<body>

  <header>
    <h1>User Authentication System</h1>
    <div>
      <span class="badge badge-license">ISC License</span>
      <span class="badge badge-backend">Backend - Express</span>
      <span class="badge badge-database">Database - MongoDB</span>
    </div>
  </header>

  <main>
    <div class="content">
      <h2>Overview</h2>
      <p>The <strong>User Authentication</strong> system is a full-featured authentication service that allows users to securely sign up, sign in, reset passwords, and log out. It is built with Express.js, MongoDB, and JWT for authentication. The system includes essential features like user creation, authentication, password management, and more.</p>
    </div>

    <div class="content">
      <h2>Features</h2>
      <ul>
        <li><strong>User Authentication & Authorization:</strong> User signup, signin with JWT-based authentication, secure password storage with bcrypt, role-based authentication.</li>
        <li><strong>Password Management:</strong> Password reset via email, forgot password functionality.</li>
        <li><strong>Token-based Authentication:</strong> JWT-based token generation for secure routes, token verification middleware for protected endpoints.</li>
      </ul>
    </div>

    <div class="content">
      <h2>Technologies Used</h2>
      <ul>
        <li><strong>Backend:</strong> Express.js</li>
        <li><strong>Database:</strong> MongoDB</li>
        <li><strong>Authentication:</strong> JWT (JSON Web Tokens)</li>
        <li><strong>Encryption:</strong> bcrypt for password hashing</li>
        <li><strong>Email:</strong> Nodemailer for sending email notifications</li>
        <li><strong>Other Tools:</strong> dotenv, cookie-parser, cors</li>
      </ul>
    </div>

    <div class="content">
      <h2>Installation</h2>
      <ol>
        <li>Clone the repository:
          <pre><code>git clone https://github.com/KunalPusdekar/User-Authentication.git</code></pre>
        </li>
        <li>Install dependencies:
          <pre><code># Navigate to the project directory
cd backend
npm install</code></pre>
        </li>
        <li>Set up environment variables (described below).</li>
        <li>Start the server:
          <pre><code>npm start</code></pre>
        </li>
      </ol>
    </div>

    <div class="content">
      <h2>Environment Variables</h2>
      <pre><code>NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/authDB

JWT_SECRET=<YOUR_JWT_SECRET>
JWT_EXPIRY=<JWT_EXPIRY_TIME>

EMAIL_HOST=<SMTP_HOST>
EMAIL_PORT=<SMTP_PORT>
EMAIL_USER=<SMTP_USERNAME>
EMAIL_PASS=<SMTP_PASSWORD>
EMAIL_FROM=<SMTP_FROM_EMAIL>
</code></pre>
      <p>Make sure to replace placeholders (<code>&lt;YOUR_JWT_SECRET&gt;</code>, etc.) with your actual credentials.</p>
    </div>

    <div class="content">
      <h2>API Endpoints</h2>
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>POST</td>
            <td>/signup</td>
            <td>Create a new user account</td>
          </tr>
          <tr>
            <td>POST</td>
            <td>/signin</td>
            <td>Log in a user and receive a JWT token</td>
          </tr>
          <tr>
            <td>GET</td>
            <td>/user</td>
            <td>Get the current user profile (Protected route)</td>
          </tr>
          <tr>
            <td>GET</td>
            <td>/logout</td>
            <td>Log out the current user (Protected route)</td>
          </tr>
          <tr>
            <td>POST</td>
            <td>/forgotpassword</td>
            <td>Request a password reset link</td>
          </tr>
          <tr>
            <td>POST</td>
            <td>/resetpassword/:token</td>
            <td>Reset the password using a token from email</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="content">
      <h2>Contributing</h2>
      <p>Contributions are welcome! Please feel free to submit a Pull Request or open an issue for any improvements or suggestions.</p>
    </div>

    <div class="content">
      <h2>Contact</h2>
      <p>For any questions or feedback, please email <a href="mailto:kunalpusdekar16@gmail.com">kunalpusdekar16@gmail.com</a>.</p>
    </div>
  </main>

  <footer>
    <p>&copy; 2025 User Authentication Project | Developed by Kunal Pusdekar</p>
  </footer>

</body>

</html>
