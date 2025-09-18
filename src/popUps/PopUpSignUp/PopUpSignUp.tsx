import { Overlay } from '../../ui/Overlay.styled';
import { AuthWrapper, Logo, FormFields, InputItem } from '../../ui/Form.styled';

import { Button, SecondaryButton } from '../../ui/Button.styled';

function PopUpSignUp() {
  return (
    <Overlay>
      <AuthWrapper>
        <Logo src="./logo.svg" alt="Logo" />
        <form>
          <FormFields>
            <InputItem name="email" type="email" placeholder="Эл. почта" />
            <InputItem name="password" type="password" placeholder="Пароль" />
            <InputItem
              name="repeatPassword"
              type="password"
              placeholder="Повторите пароль"
            />
          </FormFields>
          <Button type="submit">Зарегистрироваться</Button>
          <SecondaryButton type="button">Войти</SecondaryButton>
        </form>
      </AuthWrapper>
    </Overlay>
  );
}

export default PopUpSignUp;