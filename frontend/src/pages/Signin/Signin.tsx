import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { FC, FormEvent, useState } from "react";
import { signinSchema } from "./Signin.schema";
import axiosInstance from "../../utils/axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Signin: FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [apiError, setApiError] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrors({});
    setApiError("");
    try {
      signinSchema.parse(formData);
      await axiosInstance.post("/auth/signin", formData);
      login();
      navigate("/");
    } catch (error: any) {
      console.log(error);
      if (error.name === "AxiosError") {
        setApiError(error.response?.data.message || "Server Error");
      } else if (error.errors?.length) {
        const formattedErrors: { [key: string]: string } = {};
        error.errors.forEach((error: any) => {
          formattedErrors[error.path] = error.message;
        });
        setErrors(formattedErrors);
      }
    }
  };
  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 4,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src="/images/eg.png" alt="Logo" style={{ height: "100px" }} />
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Signin
        </Typography>
      </CardContent>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 2,
        }}
      >
        <TextField
          name="email"
          label="Email"
          type="email"
          autoComplete="username"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
        />
        {errors.email && <Alert severity="error">{errors.email}</Alert>}
        <TextField
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          required
          fullWidth
        />
        {errors.password && <Alert severity="error">{errors.password}</Alert>}

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Signin
        </Button>
        {apiError && <Alert severity="error">{apiError}</Alert>}
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Typography variant="body2">
            Don't have an account?
            <Button
              variant="text"
              color="primary"
              onClick={() => navigate("/signup")}
            >
              Signup
            </Button>
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
