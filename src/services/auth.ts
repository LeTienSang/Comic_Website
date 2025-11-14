import axios from "axios";
import api from "./api";

const API_URL = "http://localhost:8086/users"; // URL backend Django

export interface LoginResponse {
  access: string;
  refresh: string;
}

export const AuthService = {
  /**
   * Gọi API login để lấy JWT token
   */
  async login(data): Promise<LoginResponse> {
    const { email, password } = data;
    const response = await axios.post(`${API_URL}/login/`, {
      email,
      password,
    });
    return response.data;
  },
  async getCurrentUser() {
    const response = await api.get("users/me/");
    return response.data;
  },

  /**
   * Lưu token vào localStorage
   */
  saveTokens(tokens: LoginResponse) {
    localStorage.setItem("access_token", tokens.access);
    localStorage.setItem("refresh_token", tokens.refresh);
  },

  /**
   * Xoá token khi logout
   */
  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },

  /**
   * Lấy access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem("access_token");
  },
};
