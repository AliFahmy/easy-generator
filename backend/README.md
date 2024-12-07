## Description

Easy Generator Backend application built with NestJS, providing RESTful APIs for user authentication, secure token-based authentication with JWT, and efficient data handling.

---

### Features

- **Authentication**: Secure authentication using JWT and Passport strategies.
- **User Management**: Features for signing up and managing user information.
- **Swagger Documentation**: Comprehensive API documentation for easy integration.
- **Modular Architecture**: Clean and scalable design with modules for `App`, `Auth`, and `User`.

---

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or higher)
- npm
- MongoDB instance

---

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AliFahmy/easy-generator
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env file in the backend project root and add the following variables:
   ```bash
   MONGODB_URI=<your-mongodb-connection-string>
   PORT=<application-port>
   JWT_SECRET=<your-jwt-secret>
   ```
4. Start the development server:

   ```bash
   npm run start:dev
   ```

---

### API Documentation

This project uses **Swagger** to provide interactive API documentation.

- Swagger UI is available at: http://localhost:PORT/api
- Replace <PORT> with the port specified in your .env file.

---

### Modules

    The application is structured into the following modules:

    - App Module: The root module bootstrapping the application.
    - Auth Module: Handles authentication using JWT and Passport strategies.
    - User Module: Manages user data and provides user-related services.

---

### Authentication Strategy

This project uses JWT for secure authentication. The JWT token includes user-specific payloads and is signed using the JWT_SECRET defined in the .env file.

Authentication flow:

- Users sign up or sign in to get a token.
