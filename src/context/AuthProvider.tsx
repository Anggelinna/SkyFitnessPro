import { useState } from 'react';
import { saveToken, dropToken } from '../services/token';
import { AuthContext } from './AuthContext';
import { checkLocalStorage } from '../utils/checkLocalStorage/checkLocalStorage';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => checkLocalStorage());
  const [userName, setUserName] = useState<string | null>(() =>
    localStorage.getItem('userEmail')
  );

  const updateUserInfo = (token: string | null, userName: string | null) => {
    setToken(token);
    setUserName(userName);

    if (token && userName) {
      saveToken(token);
      localStorage.setItem('userEmail', userName);
    } else {
      dropToken();
      localStorage.removeItem('userEmail');
    }
  };

  const login = (newToken: string, userName: string) => {
    updateUserInfo(newToken, userName);
    return true;
  };

  const logout = () => {
    updateUserInfo(null, null);
    return true;
  };

  return (
    <AuthContext.Provider value={{ token, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;