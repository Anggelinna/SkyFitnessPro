import { createContext, ReactNode, useContext, useState } from "react"
import { User } from "firebase/auth"

interface UserType {
  uid:    string
  email:  string | null
  tokens: {
    access:  string
    refresh: string
  }
}

export interface UserContextValue extends UserType {
  isAuthenticated: () => boolean
  save:            (userInfo: User) => void
  clear:           () => void
}

interface Props {
  children: ReactNode
}

/* context */
const UserContext = createContext<UserContextValue | undefined>(undefined)

/* static methods */
function read(): UserType | {} {
  try {
    const dataStr = localStorage.getItem("userInfo")
    if (!dataStr) return {}

    const data = JSON.parse(dataStr)

    // Безопасная проверка наличия необходимых свойств
    if (!data || typeof data !== "object") return {}

    // Проверяем наличие stsTokenManager и его свойств
    const hasValidTokens = data.stsTokenManager && 
                          typeof data.stsTokenManager === 'object' &&
                          data.stsTokenManager.accessToken &&
                          data.stsTokenManager.refreshToken

    if (!hasValidTokens) return {}

    const userInfo: UserType = {
      uid:    data.uid || '',
      email:  data.email || null,
      tokens: {
        access:  data.stsTokenManager.accessToken,
        refresh: data.stsTokenManager.refreshToken,
      },
    }

    return userInfo
  } catch (error) {
    console.error("Error reading user info from localStorage:", error)
    return {}
  }
}

/* provider */
export function UserProvider({ children }: Props) {
  const [data, setData] = useState<UserType | {}>(read())

  function isAuthenticated() {
    return Boolean(data && 'email' in data && data.email)
  }

  function save(userInfo: User) {
    localStorage.setItem("userInfo", JSON.stringify(userInfo))
    setData(userInfo)
  }

  function clear() {
    localStorage.removeItem("userInfo")
    setData({})
  }

  // Создаем безопасное значение для контекста
  const contextValue: UserContextValue = {
    uid: 'uid' in data ? data.uid : '',
    email: 'email' in data ? data.email : null,
    tokens: {
      access: 'tokens' in data ? data.tokens.access : '',
      refresh: 'tokens' in data ? data.tokens.refresh : ''
    },
    isAuthenticated,
    save,
    clear
  }

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}

/* hooks */

export function useUserContext() {
  const context = useContext(UserContext)

  if (!context)
    throw new Error("useUserContext must be used within UserProvider")

  return context
}