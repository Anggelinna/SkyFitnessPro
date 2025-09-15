import React, { useState, useEffect } from 'react';
import { LoginForm } from '../LoginForm/LoginForm';
import { RegisterForm } from '..//RegisterForm/RegisterForm';
import { useAuth } from '../../../hooks/useAuth';
import './AuthPage.css';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated()) {
      window.location.href = '/';
    }
  }, [isAuthenticated]);

  return (
    <div className="auth-page">
      <div className="auth-container">
        {isLogin ? (
          <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};