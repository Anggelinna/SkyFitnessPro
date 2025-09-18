const AUTH_TOKEN_KEY_NAME = 'sky-fitness-token';

export type Token = string | null;

export const getToken = (): Token | null => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};