type FormatValidationResult = {
  hasErrors: boolean;
  errors: Record<string, string | null>;
};

export const formatValidator = (
  values: Record<string, string>
): FormatValidationResult => {
  const errors: Record<string, string | null> = {};
  let hasErrors = false;

  if ('email' in values) {
    const email = values.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Введите корректный Email';
      hasErrors = true;
    } else {
      errors.email = null;
    }
  }

  if ('password' in values) {
    const password = values.password;

    if (password.length < 6) {
      errors.password = 'Пароль должен содержать не менее 6 символов';
      hasErrors = true;
    } else if ((password.match(/[^A-Za-z0-9]/g) || []).length < 2) {
      errors.password = 'Пароль должен содержать не менее 2 спецсимволов';
      hasErrors = true;
    } else if (!/[A-Z]/.test(password)) {
      errors.password =
        'Пароль должен содержать как минимум одну заглавную букву';
      hasErrors = true;
    } else {
      errors.password = null;
    }

    if ('confirmPassword' in values) {
      if (values.confirmPassword !== password) {
        errors.confirmPassword = 'Пароли не совпадают';
        hasErrors = true;
      } else {
        errors.confirmPassword = null;
      }
    }
  }

  return { hasErrors, errors };
};