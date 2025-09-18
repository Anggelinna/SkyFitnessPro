import Container from '../../ui/Container.styled';
import * as S from './Spinner.styled';

function Spinner() {
  return (
    <Container>
      <S.SpinnerContainer>
        <S.Spinner />
        <S.LoadingText>Данные загружаются...</S.LoadingText>
      </S.SpinnerContainer>
    </Container>
  );
}

export default Spinner;