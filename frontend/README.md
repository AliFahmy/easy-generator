# Frontend Documentation

This document provides a comprehensive overview of the frontend application, covering its features, routes, and technical implementation.

---

## Features

### 1. **Authentication**

- **Signup**: Allows users to create an account.
- **Signin**: Enables users to log into their account.
- **JWT Token Management**:
  - Tokens are handled using HTTP-only cookies for enhanced security.
  - Auto-authentication check on page refresh by validating the token with the backend.
- **Logout**:
  - Clears the HTTP-only cookie when the user logs out or if the token becomes invalid.

---

### 2. **Routes**

- **Public Routes**:
  - `/signin`: Accessible to unauthenticated users for logging in.
  - `/signup`: Accessible to unauthenticated users for registering.
- **Private Routes**:
  - `/`: The main dashboard, accessible only to authenticated users.
- Route protection is implemented using `ProtectedRoute` and `PublicRoute` components.

---

### 3. **State Management**

- **Auth Context**:
  - Centralized state management using React Context API.
  - Tracks authentication state (`isAuthenticated`) and provides functions (`login`, `logout`).

---

### 4. **Validation**

- Frontend validation is implemented using `zod` to ensure input correctness.
- Backend validation errors are captured and displayed in the UI.

---

### 5. **Error Handling**

- **API Errors**:
  - Displays descriptive error messages (e.g., invalid credentials).
- **Validation Errors**:
  - Provides inline feedback for form fields (e.g., email format, password requirements).
- **Network Errors**:
  - Handles cases where the backend is unreachable or token validation fails.

---

## Technical Details

### 1. **Framework and Libraries**

- **React**: The core framework for building the application.
- **React Router**: Handles routing and navigation.
- **Axios**: Manages HTTP requests to the backend.
- **Material-UI**: Provides pre-styled components for a consistent and professional UI.
- **zod**: Ensures form inputs are validated against schema definitions.

---

### 2. **Authentication Flow**

- **Signup/Signin**:
  - Sends user credentials to the backend.
  - Backend responds with a secure HTTP-only cookie containing the JWT token.
- **Token Validation**:
  - On page load, the app sends a request to the backend to validate the stored token.
  - If valid, the user remains authenticated; otherwise, they are logged out.
- **Logout**:
  - The cookie is cleared from the backend, ensuring session invalidation.

---

### 3. **Components**

- **AuthProvider**:
  - Provides `isAuthenticated`, `login`, and `logout` methods across the app.
- **ProtectedRoute**:
  - Ensures only authenticated users can access private routes.
- **PublicRoute**:
  - Redirects authenticated users away from public routes like `/signin` and `/signup`.

---

### 4. **Form Validation**

- **Signin and Signup Forms**:
  - Validates inputs such as email and password using `zod`.
  - Displays user-friendly error messages for incorrect inputs.
- **Error Display**:
  - Alerts for API errors and field-specific errors are shown clearly.

---

### 5. **User Experience**

- **Responsive Design**:
  - Built using Material-UI to ensure a seamless experience across devices.
- **Error Alerts**:
  - Clear and descriptive messages to guide users.

---

### 6. **API Integration**

- **Endpoints Used**:
  - `/auth/signup`: Registers a new user.
  - `/auth/signin`: Authenticates an existing user.
  - `/auth/validate-token`: Verifies the JWT token for authenticated sessions.
  - `/auth/logout`: Clears the HTTP-only cookie to log out the user.

---

### .env Configuration

Create a `.env` file in the root of your project to manage environment variables:

```plaintext
# .env file

REACT_APP_API_BASE_URL="http://localhost:8080/"
```

---

### 7.Installation and Setup

1. Install Dependencies:

   ```bash
       yarn install
   ```

2. Run the Development Server:

   ```
   yarn start
   ```
