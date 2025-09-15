export const getAuthToken = (): string => {
  const token = localStorage.getItem('authToken')
  if (!token) throw new Error('No authentication token found')
  return token
}

export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token)
}

export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken')
}