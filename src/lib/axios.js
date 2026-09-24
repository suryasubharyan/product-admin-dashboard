import axios from "axios";
import { getToken, clearToken } from "./auth";

const api = axios.create({
    baseURL: "https://dummyjson.com",
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isCancel(error)) {
            return Promise.reject(error);
        }

        const status = error.response?.status;

        let message = "Something went wrong. Please try again.";
        if (error.response?.data?.message) {
            message = error.response.data.message;
        } else if (error.code === "ECONNABORTED") {
            message = "Request timed out. Please try again.";
        } else if (!error.response) {
            message = "Network error. Check your internet connection.";
        }

        if (status === 401 && window.location.pathname !== "/login") {
            clearToken();
            window.location.href = "/login";
        }

        return Promise.reject({ message, status, isCanceled: false });
    }
);

export default api;