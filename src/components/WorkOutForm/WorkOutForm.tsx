import type {
  WorkOutLesson,
  CourseProgress,
} from '../../sharesTypes/sharesTypes';
import { useNavigate } from 'react-router-dom';
import { parseCourseName } from '../../utils/parseCourseName/parseCourseName';
import { PopUpWrapper } from '../../ui/PopUpWrapper.styled ';
import { useState } from 'react';
import * as S from './WorkOutForm.styled';

type WorkOutFormProps = {
  workouts: WorkOutLesson[] | null;
  courseId: string | undefined;
  courseProgress: CourseProgress | null;
};

function WorkOutForm({ workouts, courseId, courseProgress }: WorkOutFormProps) {
  const navigate = useNavigate();
  const [activeWorkoutId, setActiveWorkoutId] = useState<string | null>(null);

  const handleWorkoutClick = (workout: WorkOutLesson) => {
    setActiveWorkoutId(workout._id);
  };

  const handleStart = () => {
    if (activeWorkoutId && courseId) {
      navigate(`/course/${courseId}/workouts/${activeWorkoutId}`);
    }
  };

  return (
    <PopUpWrapper>
      <S.WorkOutWrapper>
        <S.WorkOutFormTitle>Выберите тренировку</S.WorkOutFormTitle>
        <S.WorkOutList>
          {workouts?.map((workout) => {
            const parsed = parseCourseName(workout.name);
            const isActive = activeWorkoutId === workout._id;

            const isDone = courseProgress?.workoutsProgress?.some(
              (wp) => wp.workoutId === workout._id && wp.workoutCompleted
            );

            return (
              <S.WorkOutItem
                key={workout._id}
                onClick={() => handleWorkoutClick(workout)}
                $isActive={isActive}
              >
                <S.CheckMark
                  src={isDone ? '/check.png' : '/ellipse.svg'}
                  alt={isDone ? 'Done check' : 'Not done check'}
                />
                <S.WorkOutText>
                  <S.WorkOutTitle>{parsed.title}</S.WorkOutTitle>
                  <S.WorkOutSubTitle>
                    {[parsed.subtitle, parsed.day].filter(Boolean).join(' / ')}
                  </S.WorkOutSubTitle>
                </S.WorkOutText>
              </S.WorkOutItem>
            );
          })}
        </S.WorkOutList>

        <S.WorkOutButton onClick={handleStart} disabled={!activeWorkoutId}>
          Начать
        </S.WorkOutButton>
      </S.WorkOutWrapper>
    </PopUpWrapper>
  );
}

export default WorkOutForm;