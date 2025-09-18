import { useState } from 'react';
import * as S from './Header.styled.tsx';
import Container from '../../ui/Container.styled.tsx';
import PopUserSet from '../../popUps/PopUserSet/PopUserSet.tsx';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { getUsernameFromEmail } from '../../utils/getUsernameFromEmail/getUsernameFromEmail.ts';
import { Link, useNavigate } from 'react-router-dom';
import { RoutesApp } from '../../const.tsx';

function Header({ showMoto = false }) {
  const [isOpenPopUser, setIsOpenPopUser] = useState(false);
  const navigate = useNavigate();

  const { token, userName } = useContext(AuthContext);

  const parsedMail = getUsernameFromEmail(userName || '');

  function handleClickPopupUser() {
    setIsOpenPopUser((prev) => !prev);
  }

  return (
    <Container>
      <S.Header>
        <S.Block>
          <S.LogoBlock>
            <Link to={'/'}>
              <S.LogoImg src="/logo.svg" alt="Логотип " />
            </Link>
            {showMoto && (
              <S.LogoText>Онлайн-тренировки для занятий дома</S.LogoText>
            )}
          </S.LogoBlock>

          {token ? (
            <S.ProfileBlock>
              <img src="/profile.svg" alt="Иконка профиля" />
              <S.ProfileButton
                type="button"
                className="button_user"
                onClick={handleClickPopupUser}
              >
                {parsedMail}
              </S.ProfileButton>

              <PopUserSet
                setIsOpenPopUser={setIsOpenPopUser}
                isOpenPopUser={isOpenPopUser}
              />
            </S.ProfileBlock>
          ) : (
            <S.HeaderButton onClick={() => navigate(RoutesApp.SIGN_IN)}>
              Войти
            </S.HeaderButton>
          )}
        </S.Block>
      </S.Header>
    </Container>
  );
}

export default Header;