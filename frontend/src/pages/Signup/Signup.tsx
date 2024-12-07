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
import { signupSchema } from "./Signup.schema";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Signup: FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [apiError, setApiError] = useState<string>("");
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrors({});
    setApiError("");
    try {
      signupSchema.parse(formData);
      await axiosInstance.post("/auth/signup", formData);
      login();
      navigate("/");
    } catch (error: any) {
      if (error.name === "AxiosError") {
        setApiError(error.response.data.message);
      } else if (error.errors.length) {
        const formattedErrors: { [key: string]: string } = {};
        error.errors.forEach((error: any) => {
          formattedErrors[error.path] = error.message;
        });
        setErrors(formattedErrors);
      }
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
          Signup
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
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
        />
        {errors.name && <Alert severity="error">{errors.name}</Alert>}
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
          Signup
        </Button>
        {apiError && <Alert severity="error">{apiError}</Alert>}
      </Box>
      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <Typography variant="body2">
          Already registered?
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate("/signin")}
          >
            Signin
          </Button>
        </Typography>
      </Box>
    </Card>
  );
};
