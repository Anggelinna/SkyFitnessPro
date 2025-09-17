//import { apiClient } from '../api/apiClient'
import { setAuthToken, removeAuthToken } from "./authUtils"
import { User } from "../types/types"

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  username: string
}

export interface AuthResponse {
  user: User
  accessToken: string
}

export const authApi = {
  // Mock логин для демонстрации (без бэкенда)
  async login(credentials: LoginData): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email && credentials.password) {
          const user: User = {
            id: "user-" + Date.now(),
            email: credentials.email,
            username: credentials.email.split("@")[0],
            createdAt: new Date(),
          }

          const token = "mock-jwt-token-" + Date.now()
          setAuthToken(token)

          resolve({
            user,
            accessToken: token,
          })
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 1000)
    })
  },

  // Mock регистрация для демонстрации
  async register(credentials: RegisterData): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email && credentials.password && credentials.username) {
          const user: User = {
            id: "user-" + Date.now(),
            email: credentials.email,
            username: credentials.username,
            createdAt: new Date(),
          }

          const token = "mock-jwt-token-" + Date.now()
          setAuthToken(token)

          resolve({
            user,
            accessToken: token,
          })
        } else {
          reject(new Error("Registration failed"))
        }
      }, 1000)
    })
  },

  // Mock получение текущего пользователя
  async getCurrentUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const token = localStorage.getItem("authToken")
        if (token) {
          resolve({
            id: "user-123",
            email: "user@example.com",
            username: "John Doe",
            createdAt: new Date(),
          })
        } else {
          reject(new Error("Not authenticated"))
        }
      }, 500)
    })
  },

  // Выход
  async logout(): Promise<void> {
    removeAuthToken()
  },
}
