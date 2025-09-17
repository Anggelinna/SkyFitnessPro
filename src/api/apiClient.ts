import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { API_BASE_URL } from './config'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      console.error('Backend server is not running or unavailable')
      // Можно показать пользователю сообщение
      alert('Сервер недоступен. Убедитесь, что бэкенд запущен на localhost:3000')
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/signin'
    }

    return Promise.reject(error)
  },
)

export const api = {
  get: <T = unknown>(url: string, params?: Record<string, unknown>) => apiClient.get<T>(url, { params }),
  post: <T = unknown>(url: string, data?: unknown) => apiClient.post<T>(url, data),
  put: <T = unknown>(url: string, data?: unknown) => apiClient.put<T>(url, data),
  patch: <T = unknown>(url: string, data?: unknown) => apiClient.patch<T>(url, data),
  delete: <T = unknown>(url: string) => apiClient.delete<T>(url),
}