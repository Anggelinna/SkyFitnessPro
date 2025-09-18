import CoursesList from '../CoursesList/CoursesList';
import Container from '../../ui/Container.styled';
import * as S from './Main.styled';
import { useEffect, useContext } from 'react';
import { MainCourseContext } from '../../context/MainCourseContext ';
import Spinner from '../Spinner/Spinner';

const Main: React.FC = () => {
  const context = useContext(MainCourseContext);
  if (!context) return null;

  const { getAllCourses, courses, loadingCourses } = context;

  useEffect(() => {
    getAllCourses();
  }, [getAllCourses]);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return loadingCourses ? (
    <Spinner />
  ) : (
    <Container>
      <S.TitleBlock>
        <S.Title>Начните заниматься спортом и улучшите качество жизни</S.Title>
        <S.TitleImg src="./titleLogo.svg" alt="Логотип к названию сайта" />
      </S.TitleBlock>
      <CoursesList courses={courses} isUserCourse={false} />
      <S.Footer>
        <S.FooterButton onClick={handleScrollTop}>Наверх ↑</S.FooterButton>
      </S.Footer>
    </Container>
  );
};

export default Main;