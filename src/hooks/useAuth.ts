import { useState, useCallback } from 'react';
import { AuthCredentials } from '../types';
import { authAPI } from '../services/api';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: AuthCredentials): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.login(credentials);
      localStorage.setItem('authToken', response.token);
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Ошибка входа';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData: AuthCredentials): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.register(userData);
      localStorage.setItem('authToken', response.token);
      return true;
    } catch (err: any) {
      // Обработка специфичных ошибок с бэкенда
      const errorMessage = err.response?.data?.message || 'Ошибка регистрации';
      
      // Маппинг ошибок с бэкенда
      const errorMap: { [key: string]: string } = {
        'Введите корректный Email': 'Введите корректный Email',
        'Пользователь с таким email уже существует': 'Пользователь с таким email уже существует',
        'Пароль должен содержать не менее 6 символов': 'Пароль должен содержать не менее 6 символов',
        'Пароль должен содержать не менее 2 спецсимволов': 'Пароль должен содержать не менее 2 спецсимволов',
        'Пароль должен содержать как минимум одну заглавную букву': 'Пароль должен содержать как минимум одну заглавную букву'
      };
      
      setError(errorMap[errorMessage] || errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback((): void => {
    authAPI.logout();
  }, []);

  const isAuthenticated = useCallback((): boolean => {
    return localStorage.getItem('authToken') !== null;
  }, []);

  return {
    login,
    register,
    logout,
    isAuthenticated,
    loading,
    error,
    clearError: () => setError(null),
  };
};