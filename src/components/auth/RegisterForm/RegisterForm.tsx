import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import './RegisterForm.css';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const { register, loading, error: apiError, clearError } = useAuth();

  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email обязателен';
    if (!emailRegex.test(email)) return 'Введите корректный Email';
    return null;
  };

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    
    if (password.length < 6) {
      errors.push('Пароль должен содержать не менее 6 символов');
    }
    
    const specialChars = (password.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length;
    if (specialChars < 2) {
      errors.push('Пароль должен содержать не менее 2 спецсимволов');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Пароль должен содержать как минимум одну заглавную букву');
    }
    
    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Очищаем ошибки при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    if (name === 'email') {
      const emailError = validateEmail(value);
      if (emailError) {
        setErrors(prev => ({ ...prev, email: emailError }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    // Валидация
    const newErrors: {[key: string]: string} = {};
    
    // Валидация email
    const emailError = validateEmail(formData.email);
    if (emailError) {
      newErrors.email = emailError;
    }
    
    // Валидация пароля
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors[0];
    }
    
    // Подтверждение пароля
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Отправка на сервер
    const success = await register({ 
      email: formData.email, 
      password: formData.password 
    });
    
    if (success) {
      window.location.href = '/';
    }
  };

  const passwordErrors = validatePassword(formData.password);

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Регистрация</h2>
      
      {apiError && <div className="auth-form__error">{apiError}</div>}
      
      <div className="auth-form__group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          disabled={loading}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <div className="auth-form__field-error">{errors.email}</div>}
      </div>
      
      <div className="auth-form__group">
        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          disabled={loading}
          className={errors.password ? 'error' : ''}
        />
        
        {formData.password && (
          <div className="password-requirements">
            <div className={formData.password.length >= 6 ? 'valid' : 'invalid'}>
              • Не менее 6 символов
            </div>
            <div className={(formData.password.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length >= 2 ? 'valid' : 'invalid'}>
              • Не менее 2 спецсимволов
            </div>
            <div className={/[A-Z]/.test(formData.password) ? 'valid' : 'invalid'}>
              • Хотя бы одна заглавная буква
            </div>
          </div>
        )}
        
        {errors.password && <div className="auth-form__field-error">{errors.password}</div>}
      </div>
      
      <div className="auth-form__group">
        <label htmlFor="confirmPassword">Подтвердите пароль</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
          disabled={loading}
          className={errors.confirmPassword ? 'error' : ''}
        />
        
        {errors.confirmPassword && (
          <div className="auth-form__field-error">{errors.confirmPassword}</div>
        )}
      </div>
      
      <button 
        type="submit" 
        className="auth-form__submit" 
        disabled={loading || 
          !!errors.email || 
          !!errors.password || 
          !!errors.confirmPassword ||
          passwordErrors.length > 0 ||
          formData.password !== formData.confirmPassword
        }
      >
        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
      
      <div className="auth-form__switch">
        Уже есть аккаунт?{' '}
        <button type="button" onClick={onSwitchToLogin}>
          Войти
        </button>
      </div>
    </form>
  );
};