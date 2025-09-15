import { createContext, ReactNode, useContext, useState } from "react"
import { User } from "firebase/auth"


/* interfaces */

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

function read() {
  let data: User | string | null = localStorage.getItem("userInfo")

  if (data)
    data = JSON.parse(data)

  if (!data || typeof data !== "object")
    return {}

  const userInfo: UserType = {
    uid:    data.uid,
    email:  data.email,
    tokens: {
      access:  data.stsTokenManager.accessToken,
      refresh: data.stsTokenManager.refreshToken,
    },
  }

  return userInfo
}

/* provider */

export function UserProvider({ children }: Props) {
  const [data, setData] = useState<UserType | {}>(read())

  function isAuthenticated() {
    return Boolean(data && data.email)
  }

  function save(userInfo: User) {
    localStorage.setItem("userInfo", JSON.stringify(userInfo))

    setData(userInfo)
  }

  function clear() {
    localStorage.removeItem("userInfo")

    setData("")
  }

  return (
    <UserContext.Provider value={{ ...data, isAuthenticated, save, clear }}>{children}</UserContext.Provider>
  )
}

/* hooks */

export function useUserContext() {
  const context = useContext(UserContext)

  if (!context)
    throw new Error("useCurrentTrack must be used within UserProvider")

  return context
}