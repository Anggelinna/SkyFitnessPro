import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import './LoginForm.css';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, clearError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    const success = await login({ email, password });
    if (success) {
      window.location.href = '/';
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Вход</h2>
      
      {error && <div className="auth-form__error">{error}</div>}
      
      <div className="auth-form__group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      
      <div className="auth-form__group">
        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      
      <button 
        type="submit" 
        className="auth-form__submit" 
        disabled={loading}
      >
        {loading ? 'Вход...' : 'Войти'}
      </button>
      
      <div className="auth-form__switch">
        Нет аккаунта?{' '}
        <button type="button" onClick={onSwitchToRegister}>
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
};