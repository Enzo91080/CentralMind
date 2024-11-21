import axios from "axios";
import authApi from "../../Auth/services/auth.api";

class ApiService {
  constructor(basePath) {
    this.basePath = basePath;
    this.apiClient = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    this.apiClient.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && localStorage.getItem("refreshToken")) {
          try {
            const refreshToken = localStorage.getItem("refreshToken");
            const response = await authApi.refreshToken({ refreshToken });
            localStorage.setItem("token", response.accessToken);
            error.config.headers.Authorization = `Bearer ${response.accessToken}`;
            return this.apiClient.request(error.config);
          } catch (err) {
            console.error("Échec du refreshToken :", err.message);
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login"; // Redirige vers la page de connexion
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Méthodes génériques
  find(url, params = {}) {
    return this.apiClient.get(`${this.basePath}${url}`, { params }).then((res) => res.data);
  }

  get(url, params = {}) {
    return this.apiClient.get(`${this.basePath}${url}`, { params }).then((res) => res.data);
  }

  post(url, data = {}) {
    return this.apiClient.post(`${this.basePath}${url}`, data).then((res) => res.data);
  }

  put(url, data = {}) {
    return this.apiClient.put(`${this.basePath}${url}`, data).then((res) => res.data);
  }

  delete(url) {
    return this.apiClient.delete(`${this.basePath}${url}`).then((res) => res.data);
  }
}

export default ApiService;
