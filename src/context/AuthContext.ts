import { createContext } from 'react';

type AuthContextType = {
  token: string | null;
  userName: string | null;
  login: (token: string, userName: string) => boolean;
  logout: () => boolean;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  userName: null,
  login: () => false,
  logout: () => false,
});