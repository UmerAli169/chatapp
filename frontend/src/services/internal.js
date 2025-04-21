import axios from "axios";
import { getToken } from "../utils/auth/getToken";
const API = "http://localhost:8000/api"; // your backend base URL

// ✅ Create axios instance
const api = axios.create({
  baseURL: API,
  withCredentials: true, // send cookies (refreshToken)
});

// ✅ Interceptor for automatic token refresh
api.interceptors.response.use(
  (res) => res,
  async function (err) {
    // console.log(err, "originalRequ111est1111");
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.get(`${API}/auth/refresh`, { withCredentials: true });
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed");
        window.location.href = "/Login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(err);
  }
);

// ✅ Auth APIs

export const registerUser = (data) => api.post("/auth/register", data);

export const loginUser = (data) => api.post("/auth/login", data);

export const logoutUser = () => api.get("/auth/logout");

export const googleLogin = () => {
  window.location.href = `${API}/auth/google`;
};

export const getUserProfile = () => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }
  return api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

