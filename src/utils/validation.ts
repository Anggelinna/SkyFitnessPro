export interface ValidationErrors {
  email?: string;
  password?: string;
  username?: string;
}

export const validateEmail = (email: string): string | undefined => {
  if (!email) return 'Email обязателен'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Некорректный формат email'
  return undefined
}

export const validatePassword = (password: string): string | undefined => {
  if (!password) return 'Пароль обязателен'
  if (password.length < 6) return 'Пароль должен быть не менее 6 символов'
  return undefined
}

export const validateUsername = (username: string): string | undefined => {
  if (!username) return 'Имя пользователя обязательно'
  if (username.length < 3) return 'Имя должно быть не менее 3 символов'
  return undefined
}

// Комплексная функция валидации для формы
export const validateAuthForm = (
  formData: { email: string; password: string; username?: string },
  isSignUp: boolean,
): ValidationErrors => {
  const errors: ValidationErrors = {}

  errors.email = validateEmail(formData.email)
  errors.password = validatePassword(formData.password)

  if (isSignUp) {
    errors.username = validateUsername(formData.username || '')
  }

  // Возвращаем только те поля, где есть ошибки
  return Object.fromEntries(
    Object.entries(errors).filter(([_, value]) => value !== undefined),
  ) as ValidationErrors
}