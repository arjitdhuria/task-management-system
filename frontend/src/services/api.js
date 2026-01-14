import axios from "axios";

const API = axios.create({
  baseURL: "https://task-management-backend-vo99.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token ONLY for protected routes
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  // Do NOT attach token for auth routes
  if (
    token &&
    !req.url.includes("/auth/login") &&
    !req.url.includes("/auth/register")
  ) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;



