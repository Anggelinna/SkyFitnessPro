import {
  AuthWrapper,
  Logo,
  FormFields,
  InputItem,
  InputWrapper,
} from '../../ui/Form.styled';
import { useNavigate } from 'react-router-dom';
import { Button, SecondaryButton } from '../../ui/Button.styled';
import { useFormValidation } from '../../hooks/useFormValidation';
import { RoutesApp } from '../../const';
import { signInUser } from '../../services/auth';
import { handleAxiosError } from '../../utils/handleAxiosError/handleAxiosError';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function SignIn() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const { formData, errors, handleChange, validateForm, validateField } =
    useFormValidation({
      email: '',
      password: '',
    });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm(['email', 'password'])) {
      return;
    }

    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await signInUser(loginData);

      if (response) {
        login(response.token, loginData.email);
        navigate(RoutesApp.MAIN);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <AuthWrapper>
      <Logo src="./logo.svg" alt="Logo" />
      <form onSubmit={onSubmit}>
        <FormFields>
          <InputWrapper>
            <InputItem
              name="email"
              type="email"
              placeholder="Эл. почта"
              onChange={handleChange}
              onBlur={() => validateField('email', ['email', 'password'])}
              value={formData.email}
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
              onChange={handleChange}
              onBlur={() => validateField('password', ['email', 'password'])}
              value={formData.password}
            />
            {errors.password && (
              <p style={{ color: 'red', marginTop: '4px' }}>
                {errors.password}
              </p>
            )}
          </InputWrapper>
        </FormFields>
        <Button type="submit">Войти</Button>
        <SecondaryButton
          type="button"
          onClick={() => navigate(RoutesApp.SIGN_UP)}
        >
          Зарегистрироваться
        </SecondaryButton>
      </form>
    </AuthWrapper>
  );
}

export default SignIn;