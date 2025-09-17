import axios from 'axios'
import type { AuthResponse, Course } from '../types/api'


const API_BASE_URL = import.meta.env.VITE_API_URL

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Интерцептор для добавления токена
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')

  if (token)
    config.headers.Authorization = `Bearer ${token}`

  return config
})

export const coursesAPI = {
  getCourses: async (): Promise<Course[]> => {
    const response = await api.get('/fitness/courses')
    return response.data
  },
}

export const authAPI = {
  login: async (credentials: AuthResponse): Promise<{ token: string }> => {
    const response = await api.post('/fitness/auth/login', credentials)
    return response.data
  },
}