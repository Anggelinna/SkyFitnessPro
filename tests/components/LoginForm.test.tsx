// tests/components/LoginForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from '../../src/components/auth/LoginForm/LoginForm';

describe('LoginForm', () => {
  it('renders login form correctly', () => {
    render(<LoginForm onSwitchToRegister={() => {}} />);
    
    expect(screen.getByText('Вход')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Пароль')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Войти' })).toBeInTheDocument();
  });

  it('switches to register form', () => {
    const switchMock = jest.fn();
    render(<LoginForm onSwitchToRegister={switchMock} />);
    
    fireEvent.click(screen.getByText('Зарегистрироваться'));
    expect(switchMock).toHaveBeenCalled();
  });
});