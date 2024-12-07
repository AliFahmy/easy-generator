import { FC } from "react";
import { AuthProvider } from "./context/AuthContext";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Signin } from "./pages/Signin/Signin";
import { Signup } from "./pages/Signup/Signup";
import { Welcome } from "./pages/Welcome/Welcome";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicRoute } from "./routes/PublicRoute";

const App: FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <Signin />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Welcome />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
