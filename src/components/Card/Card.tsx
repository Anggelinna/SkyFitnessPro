import * as S from './Card.styled';
import type { Course } from '../../sharesTypes/sharesTypes';
import { getCourseImage } from '../../utils/getCourseImage/getCourseImage';
import Progress from '../Progress/Progress';
import { useNavigate } from 'react-router-dom';

type CardProps = {
  course: Course;
  isUserCourse: boolean;
  onIconClick?: (courseId: string) => void;
  percent?: number;
  buttonText?: string;
};

const Card: React.FC<CardProps> = ({
  course,
  isUserCourse,
  onIconClick,
  percent = 0,
  buttonText,
}) => {
  const navigate = useNavigate();
  const {
    _id,
    nameEN,
    nameRU,
    durationInDays,
    dailyDurationInMinutes,
    difficulty,
  } = course;
  const srcPath = getCourseImage(nameEN);

  return (
    <S.CourseCard>
      <S.ImageWrapper>
        <S.CardImg $src={`/${srcPath}.png`} />
        <S.Icon
          src={isUserCourse ? '/removeIcon.svg' : '/addIcon.svg'}
          alt={isUserCourse ? 'Remove from favorites' : 'Add to favorites'}
          onClick={() => onIconClick?.(_id)}
        />
      </S.ImageWrapper>

      <S.CourseDiscription>
        <S.Title>{nameRU}</S.Title>
        <S.Duration>
          <S.Badge>
            <img src="/time.svg" alt="time icon" />
            {durationInDays} дней
          </S.Badge>
          <S.Badge>
            <img src="/calendar.svg" alt="calendar icon" />
            {`${dailyDurationInMinutes.from}-${dailyDurationInMinutes.to}`}{' '}
            мин/день
          </S.Badge>
        </S.Duration>
        <S.Difficulty>
          <S.Badge>
            <img src="/difficulty.svg" alt="difficulty icon" />
            Сложность {/*{difficulty}*/}
          </S.Badge>
        </S.Difficulty>
        {isUserCourse && (
          <>
            <Progress percent={percent} />

            <S.CourseButton onClick={() => navigate(`/course/${_id}/workouts`)}>
              {buttonText}
            </S.CourseButton>
          </>
        )}
      </S.CourseDiscription>
    </S.CourseCard>
  );
};

export default Card;