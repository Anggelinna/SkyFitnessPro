import {
  AuthWrapper,
  Logo,
  FormFields,
  InputItem,
  InputWrapper,
} from '../../ui/Form.styled';
import { RoutesApp } from '../../const';
import { Button, SecondaryButton } from '../../ui/Button.styled';
import { useNavigate } from 'react-router-dom';
import { useFormValidation } from '../../hooks/useFormValidation';
import { signUpUser } from '../../services/auth';
import { handleAxiosError } from '../../utils/handleAxiosError/handleAxiosError';
import { useState } from 'react';

function SignUp() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { formData, errors, handleChange, validateForm, validateField } =
    useFormValidation({
      email: '',
      password: '',
      confirmPassword: '',
    });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm(['email', 'password', 'confirmPassword'])) {
      return;
    }

    const dataToSend = {
      email: formData.email.trim(),
      password: formData.password,
    };

    try {
      setIsSubmitting(true);
      await signUpUser(dataToSend);
      navigate(RoutesApp.SIGN_IN);
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthWrapper>
      <Logo src="./logo.svg" alt="Logo" />
      <form onSubmit={onSubmit} noValidate>
        <FormFields>
          <InputWrapper>
            <InputItem
              name="email"
              type="email"
              placeholder="Эл. почта"
              autoComplete="email"
              onChange={handleChange}
              onBlur={() =>
                validateField('email', ['email', 'password', 'confirmPassword'])
              }
              value={formData.email}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && (
              <p style={{ color: 'red', marginTop: '4px' }}>{errors.email}</p>
            )}
          </InputWrapper>

          <InputWrapper>
            <InputItem
              name="password"
              type="password"
              placeholder="Пароль"
              autoComplete="new-password"
              onChange={handleChange}
              onBlur={() =>
                validateField('password', [
                  'email',
                  'password',
                  'confirmPassword',
                ])
              }
              value={formData.password}
              aria-invalid={Boolean(errors.password)}
            />
            {errors.password && (
              <p style={{ color: 'red', marginTop: '4px' }}>
                {errors.password}
              </p>
            )}
          </InputWrapper>

          <InputWrapper>
            <InputItem
              name="confirmPassword"
              type="password"
              placeholder="Повторите пароль"
              autoComplete="new-password"
              onChange={handleChange}
              onBlur={() =>
                validateField('confirmPassword', [
                  'email',
                  'password',
                  'confirmPassword',
                ])
              }
              value={formData.confirmPassword}
              aria-invalid={Boolean(errors.confirmPassword)}
            />
            {errors.confirmPassword && (
              <p style={{ color: 'red', marginTop: '4px' }}>
                {errors.confirmPassword}
              </p>
            )}
          </InputWrapper>
        </FormFields>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Регистрируем...' : 'Зарегистрироваться'}
        </Button>
        <SecondaryButton
          type="button"
          onClick={() => navigate(RoutesApp.SIGN_IN)}
        >
          Войти
        </SecondaryButton>
      </form>
    </AuthWrapper>
  );
}

export default SignUp;