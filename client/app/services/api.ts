import axios from "axios";

const api = axios.create({
  baseURL: `/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("JWT_TOKEN");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    let csrfToken = localStorage.getItem("CSRF_TOKEN");

    if (!csrfToken) {
      try {
        const response = await axios.get(`/api/csrf-token`, {
          withCredentials: true,
        });

        csrfToken = response.data.token;

        csrfToken && localStorage.setItem("CSRF_TOKEN", csrfToken);
      } catch (error) {
        console.error("Failed to fetch CSRF token", error);
      }
    }

    if (csrfToken) {
      config.headers["X-XSRF-TOKEN"] = csrfToken;
    }

    console.log("X-XSRF-TOKEN " + csrfToken);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
