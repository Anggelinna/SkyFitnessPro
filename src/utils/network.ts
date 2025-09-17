// utils/network.ts
import { API_BASE_URL } from "../api/config"

export const isBackendAvailable = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.ok
  } catch (error) {
    console.log('Бэкенд недоступен, используем mock данные')
    return false
  }
}

export const checkBackendConnection = async (): Promise<{
  available: boolean
  status?: number
  message?: string
}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return {
      available: response.ok,
      status: response.status,
      message: response.statusText
    }
  } catch (error) {
    console.log('Бэкенд недоступен:', error)
    return {
      available: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Утилита для автоматического переключения между mock и реальными данными
export const withFallback = async <T>(
  realApiCall: () => Promise<T>,
  mockData: T | (() => T),
  useMock: boolean = false,
): Promise<T> => {
  if (useMock) {
    console.log('Используются mock данные')
    return typeof mockData === 'function' ? (mockData as () => T)() : mockData
  }

  try {
    const isAvailable = await isBackendAvailable()
    if (!isAvailable) {
      console.log('Бэкенд недоступен, используем mock данные')
      return typeof mockData === 'function' ? (mockData as () => T)() : mockData
    }

    return await realApiCall()
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error)
    console.log('Используем mock данные как fallback')
    return typeof mockData === 'function' ? (mockData as () => T)() : mockData
  }
}