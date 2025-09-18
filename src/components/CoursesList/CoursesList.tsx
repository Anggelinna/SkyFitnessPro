import Container from '../../ui/Container.styled';
import * as S from './CoursesList.styled';
import Card from '../Card/Card';
import { useEffect, useContext } from 'react';
import { MainCourseContext } from '../../context/MainCourseContext ';
import { useNavigate } from 'react-router-dom';
import type { Course, CourseProgress } from '../../sharesTypes/sharesTypes';
import { getCourseCardData } from '../../utils/getCourseCardData';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

type CoursesListProps = {
  courses: Course[];
  isUserCourse: boolean;
  coursesWithProgress?: CourseProgress[];
};

const CoursesList: React.FC<CoursesListProps> = ({
  courses,
  isUserCourse,
  coursesWithProgress,
}) => {
  const navigate = useNavigate();
  const context = useContext(MainCourseContext);
  const { token } = useContext(AuthContext);
  if (!courses) {
    return null;
  }

  if (!context) {
    return null;
  }

  const { usersData, getAllUsersData } = context;

  const isAuthenticated = Boolean(usersData?.user);

  useEffect(() => {
    if (isAuthenticated) {
      getAllUsersData();
    }
  }, [getAllUsersData, isAuthenticated]);

  const usersCourses = usersData?.user?.selectedCourses ?? [];

  const handleAddToFavorites = (courseId: string) => {
    if (token) {
      if (usersCourses.includes(courseId)) {
        toast.info('Этот курс уже есть в избранном');
      } else {
        navigate(`/course/${courseId}`);
      }
    } else {
      navigate(`/course/${courseId}`);
    }
  };

  return (
    <Container>
      <S.Courses>
        {courses.map((course) => {
          const { percent, buttonText } = getCourseCardData(
            course._id,
            isUserCourse ? coursesWithProgress : undefined,
            course
          );

          return (
            <Card
              key={course._id}
              course={course}
              isUserCourse={isUserCourse}
              onIconClick={handleAddToFavorites}
              percent={percent}
              buttonText={buttonText}
            />
          );
        })}
      </S.Courses>
    </Container>
  );
};

export default CoursesList;