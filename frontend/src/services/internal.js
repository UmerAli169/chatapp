import axios from "axios";
const API = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async function (err) {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.get(`${API}/auth/refresh`, { withCredentials: true });
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed.");
        window.location.href = "/Login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export const registerUser = (data) => api.post("/auth/register", data);

export const loginUser = (data) => api.post("/auth/login", data);

export const logoutUser = () => api.get("/auth/logout");

export const googleLogin = () => (window.location.href = `${API}/auth/google`);

export const getUserProfile = () => api.get("/auth/me");

export const fetchUsers = () => api.get("/auth");
export const getUserById = (id) => api.get(`/api/users/${id}`);
export const sendMessage = (data) => api.post("/message", data);
export const getMessages = (chatId) => api.get(`/message/${chatId}`);
export const markAsSeen = (messageId) => api.put(`/message/seen/${messageId}`);
export const pinMessage = (chatId, messageId) =>
  api.put(`/chat/pin/${chatId}`, { messageId });
export const deleteMessage = (messageId) =>
  api.delete(`/message/delete/${messageId}`);

export const editMessage = (messageId, newText) =>
  api.put(`/message/edit/${messageId}`, { content: newText });
