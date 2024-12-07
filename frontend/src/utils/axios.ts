import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response, // Pass through if the response is successful
  (error) => {
    if (error.response?.status === 401) {
      const navigate = useNavigate();
      navigate("/signin");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
