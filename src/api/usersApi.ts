import { API_BASE_URL } from './config';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const usersApi = {
  async create(email: string, password: string, name: string): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Ошибка регистрации')
      }

      const data: AuthResponse = await response.json()
      return data.user
    } catch (error) {
      console.error('Ошибка регистрации:', error)
      throw error
    }
  },

  async auth(email: string, password: string): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Ошибка авторизации')
      }

      const data: AuthResponse = await response.json()

      if (data.token) {
        localStorage.setItem('authToken', data.token)
      }

      return data.user
    } catch (error) {
      console.error('Ошибка авторизации:', error)
      throw error
    }
  },

  async logout(): Promise<void> {
    localStorage.removeItem('authToken')
  },

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem('authToken')
    if (!token) return null

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Не удалось получить данные пользователя')
      }

      const data = await response.json()
      return data.user
    } catch (error) {
      console.error('Ошибка получения пользователя:', error)
      return null
    }
  },
}