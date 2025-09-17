import { useState, useEffect } from 'react'
import { checkBackendConnection } from '../utils/network'

export const useBackendStatus = () => {
  const [isBackendAvailable, setIsBackendAvailable] = useState<boolean>(true)
  const [isChecking, setIsChecking] = useState<boolean>(true)

  useEffect(() => {
    const checkBackend = async () => {
      setIsChecking(true)
      const status = await checkBackendConnection()
      setIsBackendAvailable(status.available)
      setIsChecking(false)
    }

    checkBackend()

    // Проверяем каждые 30 секунд
    const interval = setInterval(checkBackend, 30000)
    return () => clearInterval(interval)
  }, [])

  return { isBackendAvailable, isChecking }
}