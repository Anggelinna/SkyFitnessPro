import { useNavigate } from 'react-router-dom';
import * as S from './PopUserSet.styled.ts';
import { RoutesApp } from '../../const';
import { getUsernameFromEmail } from '../../utils/getUsernameFromEmail/getUsernameFromEmail.ts';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

type PopUserSetProps = {
  setIsOpenPopUser: (open: boolean) => void;
  isOpenPopUser: boolean;
};

function PopUserSet({ setIsOpenPopUser, isOpenPopUser }: PopUserSetProps) {
  const { logout, userName } = useContext(AuthContext);
  const parsedMail = getUsernameFromEmail(userName || '');
  const navigate = useNavigate();

  function handleLogout(e: { preventDefault: () => void }) {
    e.preventDefault();
    logout();
    navigate(RoutesApp.SIGN_IN);
  }

  return (
    <S.PopUserSet $isOpen={isOpenPopUser}>
      <div>
        <S.UserName>{parsedMail}</S.UserName>
        <S.UserMail>{userName}</S.UserMail>
        <S.PopUserButton
          type="button"
          onClick={() => {
            navigate(RoutesApp.PROFILE);
            setIsOpenPopUser(false);
          }}
        >
          Мой профиль
        </S.PopUserButton>
        <S.PopUserSecondaryButton type="button" onClick={handleLogout}>
          Выйти
        </S.PopUserSecondaryButton>
      </div>
    </S.PopUserSet>
  );
}

export default PopUserSet;