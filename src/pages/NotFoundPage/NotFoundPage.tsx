import { useNavigate } from 'react-router-dom';
import * as S from './NotFoundPage.styled';
import { Button } from '../../ui/Button.styled';
import { RoutesApp } from '../../const';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <S.Wrapper>
      <S.Block>
        <S.Title>404</S.Title>
        <S.SubTitle>Упс! Такой страницы не существует.</S.SubTitle>
        <Button onClick={() => navigate(RoutesApp.MAIN)}>
          Вернуться на главную
        </Button>
      </S.Block>
    </S.Wrapper>
  );
}

export default NotFoundPage;
