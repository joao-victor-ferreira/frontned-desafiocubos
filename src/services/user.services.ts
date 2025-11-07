import { apiClient } from "../api/apiClient";

interface LoginResponse {
  user: {
    id: number;
    nome: string;
    email: string;
  };
  token: string;
}

export const userService = {
  async login(email: string, senha: string): Promise<LoginResponse> {
    return apiClient.post("/api/users/login", { email, senha });
  },

  async register(nome: string, email: string, senha: string): Promise<LoginResponse> {
    return apiClient.post("/api/users/register", { nome, email, senha });
  },
};
