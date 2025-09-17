import { createContext, ReactNode, useContext, useState } from "react"

/* interfaces */
interface UserType {
  uid:   string
  email: string | null
  token: string
}

export interface UserContextValue extends UserType {
  isAuthenticated: () => boolean
  save: (token: string, uid: string, email: string) => void
  clear: () => void
}

interface Props {
  children: ReactNode
}

/* context */
const UserContext = createContext<UserContextValue | undefined>(undefined)

/* static methods */
function read(): UserType | null {
  try {
    const token = localStorage.getItem('authToken')
    const uid   = localStorage.getItem('userId')
    const email = localStorage.getItem('userEmail')

    if (!token || !email) return null

    return {
      uid:   uid,
      email: email,
      token: token,
    }
  } catch (error) {
    console.error("Error reading user info from storage:", error)
    return null
  }
}

/* provider */
export function UserProvider({ children }: Props) {
  const [data, setData] = useState<UserType | null>(read())

  function isAuthenticated(): boolean {
    return Boolean(data && data.token)
  }

  function save(token: string, uid: string, email: string): void {
    localStorage.setItem('authToken', token)
    localStorage.setItem('userId',    uid)
    localStorage.setItem('userEmail', email)

    const userData: UserType = {
      uid:   uid,
      email: email,
      token: token,
    }

    setData(userData)
  }

  function clear(): void {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('userEmail')
    setData(null)
  }

  // Создаем безопасное значение для контекста
  const contextValue: UserContextValue = {
    uid: data?.uid || "",
    email: data?.email || null,
    token: data?.token || "",
    isAuthenticated,
    save,
    clear,
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}

/* hooks */
// eslint-disable-next-line react-refresh/only-export-components
export function useUserContext(): UserContextValue {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error("useUserContext must be used within UserProvider")
  }

  return context
}