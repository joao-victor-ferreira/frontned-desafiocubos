import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});

// Adiciona token JWT automaticamente
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Tratamento global de erros
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) throw new Error(error.response.data.error || "Erro na API");
    else if (error.request) throw new Error("Sem resposta do servidor");
    else throw new Error(error.message);
  }
);
