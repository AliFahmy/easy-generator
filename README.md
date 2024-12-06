# Full Stack Application: React.js Frontend and NestJS Backend

This repository contains a full-stack web application built with **React.js** for the frontend and **NestJS** for the backend. The application includes authentication and other essential features.

---

## 📁 Project Structure

```plaintext
/
├── frontend/   # React.js application
├── backend/    # NestJS application
├── README.md   # Project documentation
└── .gitignore  # Git ignore

```

### Frontend

- **Framework:** React.js with TypeScript
- **Features:**
  - User interface and client-side logic
  - API integration with the backend
  - Authentication using JWT

### Backend

- **Framework:** NestJS
- **Features:**
  - RESTful APIs
  - Authentication and authorization with JWT and refresh tokens
  - MongoDB integration

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

### Clone the Repository

```bash
git clone https://github.com/AliFahmy/easy-generator
cd easy-generator
```

---

### Setup Instructions

#### Backend

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file based on the provided `.env.example`.
   - Add the necessary configurations (e.g., database connection, JWT secret).
4. Start the backend server:
   ```bash
   npm run start:dev
   ```

#### Frontend

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the `frontend` folder based on the provided `.env.example`.
   - Add the API base URL to communicate with the backend.
4. Start the frontend development server:
   ```bash
   npm start
   ```

---

## 🛠️ Development

- **Frontend Server:** [http://localhost:3000](http://localhost:3000)
- **Backend Server:** [http://localhost:8080](http://localhost:8080) (or the port specified in `.env`)

---

## 📚 Documentation

- **Frontend:**

  - The `frontend/` folder contains all React components, pages, and styles.
  - API calls are handled using `axios` with endpoints defined in the backend.

- **Backend:**
  - The `backend/` folder includes modules, controllers, and services for API endpoints.
  - Authentication logic is implemented using Passport and JWT.

---

## 🌟 Features

- Secure user authentication (JWT with refresh tokens)
- RESTful API architecture
- Modular and scalable folder structure
- Modern UI with React and TypeScript

---
