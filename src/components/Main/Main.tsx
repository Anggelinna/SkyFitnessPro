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

  const mainPageOrder = ['Йога', 'Стретчинг', 'Фитнес', 'Степ-аэробика', 'Бодифлекс',];
  
  const sortedCourses = [...courses].sort((a, b) => {
    const indexA = mainPageOrder.indexOf(a.nameRU);
    const indexB = mainPageOrder.indexOf(b.nameRU);
    return indexA - indexB;
  });

  return loadingCourses ? (
    <Spinner />
  ) : (
    <Container>
      <S.TitleBlock>
        <S.Title>Начните заниматься спортом и улучшите качество жизни</S.Title>
        <S.TitleImg src="./titleLogo.svg" alt="Логотип к названию сайта" />
      </S.TitleBlock>
      <CoursesList 
       courses={sortedCourses} // Передаем отсортированные курсы
       isUserCourse={false} 
       //reverseOrder={false}
      />
      <S.Footer>
        <S.FooterButton onClick={handleScrollTop}>Наверх ↑</S.FooterButton>
      </S.Footer>
    </Container>
  );
};


export default Main;