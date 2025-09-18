import { Overlay } from '../../ui/Overlay.styled';
import * as S from './PopMyProgress.styled';
import type { ProgressData } from '../../sharesTypes/sharesTypes';
import ProgressForm from '../../components/ProgressForm/ProgressForm';
import type { Exercise } from '../../sharesTypes/sharesTypes';
type PopMyProgressProps = {
  workoutTasks: Exercise[];
  courseId: string;
  workoutId: string;
  updateProgress: (
    courseId: string,
    workoutId: string,
    progressData: ProgressData
  ) => Promise<void>;
  isOpenPopMyProgress: boolean;
  setIsOpenPopMyProgress: (open: boolean) => void;
  currentProgress: ProgressData;
};

function PopMyProgress({
  workoutTasks,
  courseId,
  workoutId,
  updateProgress,
  isOpenPopMyProgress,
  setIsOpenPopMyProgress,
  currentProgress,
}: PopMyProgressProps) {
  return (
    <S.PopUpWorkOut $isOpen={isOpenPopMyProgress}>
      <Overlay>
        <ProgressForm
          workoutTasks={workoutTasks}
          courseId={courseId}
          workoutId={workoutId}
          updateProgress={updateProgress}
          setIsOpenPopMyProgress={setIsOpenPopMyProgress}
          currentProgress={currentProgress}
        />
      </Overlay>
    </S.PopUpWorkOut>
  );
}

export default PopMyProgress;