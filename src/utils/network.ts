import { API_BASE_URL } from "../api/config"

export const isBackendAvailable = async (): Promise<boolean> => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    return response.ok
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.log('Таймаут проверки бэкенда')
    } else {
      console.log('Бэкенд недоступен, используем mock данные')
    }
    return false
  }
}

export const checkBackendConnection = async (): Promise<{
  available: boolean
  status?: number
  message?: string
}> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId)

    return {
      available: response.ok,
      status: response.status,
      message: response.statusText,
    }
  } catch (error) {
    let errorMessage = 'Unknown error'

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        errorMessage = 'Connection timeout'
      } else {
        errorMessage = error.message
      }
    }

    console.log('Бэкенд недоступен:', errorMessage)
    return {
      available: false,
      message: errorMessage,
    }
  }
}

export const withFallback = async <T>(
  realApiCall: () => Promise<T>,
  mockData: T | (() => T),
  useMock: boolean = false,
): Promise<T> => {
  if (useMock) {
    console.log('Используются mock данные (принудительно)');
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

// Новая функция для проверки с повторными попытками
export const checkBackendWithRetry = async (
  maxRetries: number = 3,
  delay: number = 1000,
): Promise<boolean> => {
  for (let i = 0; i < maxRetries; i++) {
    const isAvailable = await isBackendAvailable()
    if (isAvailable) {
      return true
    }

    if (i < maxRetries - 1) {
      console.log(`Попытка ${i + 1} не удалась, повтор через ${delay}ms...`)
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  return false
}