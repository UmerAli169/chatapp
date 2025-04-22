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
        return api(originalRequest)
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

export const googleLogin = () => {
  window.location.href = `${API}/auth/google`;
};

export const getUserProfile = async () => {
  try {
    const res = await api.get("/auth/me");
    return res; 
  } catch (err) {
    throw err;
  }
};



export const fetchGroups = async () => {
  const response = await api.get(`${API}/groups`);
  return response.data;
};

export const fetchGroupMessages = async (groupId) => {
  const response = await api.get(`${API}/groups/${groupId}/messages`);
  return response.data;
};

export const sendGroupMessage = async (groupId, message) => {
  const response = await api.post(`${API}/groups/${groupId}/messages`, { text: message });
  return response.data;
};