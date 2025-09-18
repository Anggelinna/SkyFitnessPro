import Container from '../../ui/Container.styled';
import * as S from './WorkOut.styled';
import { useParams } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import { CourseContext } from '../../context/CourseContext';
import PopMyProgress from '../../popUps/PopMyProgress/PopMyProgress';
import { getTotalProgressNumber } from '../../utils/getTotalProgressNumber/getTotalProgressNumber.ts';
import { calculateProgress } from '../../utils/calculateProgress/calculateProgress';
import PopUpResultMessage from '../../popUps/PopUpResultMessage/PopUpResultMessage';
import { MainCourseContext } from '../../context/MainCourseContext .ts';
import Spinner from '../Spinner/Spinner.tsx';
import { toast } from 'react-toastify';

function WorkOut() {
  const courseContext = useContext(CourseContext);
  const mainContext = useContext(MainCourseContext);
  const [isOpenPopMyProgress, setIsOpenPopMyProgress] = useState(false);
  const [isOpenPopUpResultMessage, setIsPopUpResultMessage] = useState(false);

  if (!courseContext) return null;
  if (!mainContext) {
    return null;
  }

  const { course, getCourseById } = mainContext;

  const { workOut, getWorkoutById, getProgress, progress, updateProgress } =
    courseContext;

  const { workoutId, courseId } = useParams();

  useEffect(() => {
    if (courseId) getCourseById(courseId);
  }, [courseId, getCourseById]);

  useEffect(() => {
    if (workoutId) getWorkoutById(workoutId);
  }, [workoutId, getWorkoutById]);

  useEffect(() => {
    if (workoutId && courseId) {
      getProgress(courseId, workoutId);
    }
  }, [courseId, workoutId, getProgress]);

  if (!workOut || !progress) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  const progresDataWorkOut = progress.progressData;
  const workoutTasks = workOut.exercises;
  const hasNoTasks = progress.IsNotProgressData;

  const handleClickPopMyProgress = () => {
    setIsOpenPopMyProgress((prev) => !prev);
  };

  const handleClickMarkDone = async () => {
    if (!courseId || !workoutId) return;

    try {
      await updateProgress(courseId, workoutId, []);
      setIsPopUpResultMessage(true);
    } catch (error) {
      toast.error('Не удалось отметить тренировку, попробуйте снова');
    }
  };

  const handleClosePopUpResultMessage = () => {
    setIsPopUpResultMessage(false);
  };

  return (
    <Container>
      <S.Title>{course?.nameRU}</S.Title>
      <S.VideoCourse src={workOut.video} allowFullScreen />
      <S.CourseProgressTitle>{workOut.name}</S.CourseProgressTitle>
      <S.CourseProgressBox>
        {hasNoTasks ? (
          <S.WorkOutsButton onClick={handleClickMarkDone}>
            Отметить урок как пройденный
          </S.WorkOutsButton>
        ) : (
          <>
            {workoutTasks.map((workOuttask, index) => {
              const doneReps = progresDataWorkOut?.[index] ?? 0;
              const totalReps = getTotalProgressNumber(workOuttask.name);
              const progressValue = calculateProgress(doneReps, totalReps);

              return (
                <S.ProgressBlock key={workOuttask._id || index}>
                  <S.ProgressText>
                    {workOuttask.name} — {progressValue}%
                  </S.ProgressText>
                  <S.ProgressBar
                    type="range"
                    value={progressValue}
                    max={100}
                    readOnly
                  />
                </S.ProgressBlock>
              );
            })}
            <S.WorkOutsButton onClick={handleClickPopMyProgress}>
              Заполнить свой прогресс
            </S.WorkOutsButton>
          </>
        )}
      </S.CourseProgressBox>

      {!hasNoTasks && (
        <PopMyProgress
          workoutTasks={workoutTasks}
          courseId={courseId!}
          workoutId={workoutId!}
          updateProgress={updateProgress}
          isOpenPopMyProgress={isOpenPopMyProgress}
          setIsOpenPopMyProgress={setIsOpenPopMyProgress}
          currentProgress={progresDataWorkOut}
        />
      )}

      <PopUpResultMessage
        isOpenPopUp={isOpenPopUpResultMessage}
        onClose={handleClosePopUpResultMessage}
      />
    </Container>
  );
}

export default WorkOut;