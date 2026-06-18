import axios from "axios";

const user = JSON.parse(localStorage.getItem("auth-user"));

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${user?.accessToken}`,
  },
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post(
          "/api/v1/auth/refresh-token",
          {},
          {
            headers: {
              Authorization: `Bearer ${user.refreshToken}`,
            },
          },
        );

        return api(originalRequest);
      } catch (err) {
        window.location.href = "/auth";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
