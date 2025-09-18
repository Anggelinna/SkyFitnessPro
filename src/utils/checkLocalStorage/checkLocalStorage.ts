import { getToken } from '../../services/token';

export function checkLocalStorage(): string | null {
  try {
    const token = getToken();
    if (!token) return null;

    if (typeof token === 'string' && token.trim().length > 0) {
      return token;
    } else {
      console.warn('Некорректный токен в localStorage');
      return null;
    }
  } catch (error) {
    console.error('Ошибка при чтении localStorage token:', error);
    return null;
  }
}