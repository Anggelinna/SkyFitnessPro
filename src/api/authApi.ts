import { apiClient } from './apiClient'

export interface LoginData {
  email: string,
  password: string,
}

export interface AuthResponse {
  token: string,
}

export interface UserResponse {
  email: string,
  selectedCourses: string[],
}

export const authApi = {
  async login(credentials: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      '/fitness/auth/login',
      credentials,
    )
    return response.data
  },

  async register(credentials: LoginData): Promise<void> {
    await apiClient.post(
      '/fitness/auth/register',
      credentials,
    )
  },

  async getCurrentUser(): Promise<UserResponse> {
    const response = await apiClient.get<UserResponse>('/fitness/users/me')
    return response.data
  },

  async logout(): Promise<void> {
    // На бэкенде обычно инвалидируют токен
    localStorage.removeItem('authToken')
    localStorage.removeItem('userEmail')
  },
}