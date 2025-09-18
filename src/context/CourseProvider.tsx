import { useState, useCallback } from 'react';
import { CourseContext } from './CourseContext';
import type {
  WorkOutLesson,
  WorkOutsProgress,
  ProgressData,
  CourseProgress,
  Exercise,
  ExtendedWorkOutsProgress,
} from '../sharesTypes/sharesTypes';
import {
  fetchWorkOutsById,
  fetchProgressWorkOutById,
  patchProgressWorkOut,
  fetchCourseProgress,
  fetchListWorkOuts,
  addFavoriteCourse,
  patchAllCourseProgress,
} from '../services/api';
import { handleAxiosError } from '../utils/handleAxiosError/handleAxiosError';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';

type CourseProviderProps = {
  children: React.ReactNode;
};

const CourseProvider = ({ children }: CourseProviderProps) => {
  const [workOut, setWorkOut] = useState<WorkOutLesson | null>(null);
  const [workouts, setWorkouts] = useState<WorkOutLesson[]>([]);
  const [loadingWorkouts, setLoadingWorkouts] = useState(false);

  const [progress, setProgress] = useState<ExtendedWorkOutsProgress | null>(
    null
  );

  const [courseProgress, setCourseProgress] = useState<CourseProgress | null>(
    null
  );

  const [loadingWorkout, setLoadingWorkout] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(false);
  const [loadingCourseProgress, setLoadingCourseProgress] = useState(false);

  const { token } = useContext(AuthContext);

  const getWorkoutsList = useCallback(
    async (courseId: string): Promise<WorkOutLesson[]> => {
      if (!courseId || !token) return [];
      setLoadingWorkouts(true);
      try {
        const data = await fetchListWorkOuts(token, courseId);
        setWorkouts(data ?? []);
        return data ?? [];
      } catch (err) {
        handleAxiosError(err);
        return [];
      } finally {
        setLoadingWorkouts(false);
      }
    },
    [token]
  );

  const addCourseToFavorites = useCallback(
    async (courseId: string): Promise<void> => {
      try {
        const message = await addFavoriteCourse(token, courseId);
        toast.success(message);
      } catch (err) {
        toast.error('Курс уже был добавлен!');
      }
    },
    [token, getWorkoutsList]
  );

  // --- Загрузка тренировки ---
  const getWorkoutById = useCallback(
    async (id: string): Promise<WorkOutLesson | null> => {
      if (!id || !token) return null; // защита от отсутствия токена
      setLoadingWorkout(true);
      try {
        const data = await fetchWorkOutsById(token, id);
        setWorkOut(data ?? null);
        return data ?? null;
      } catch (err) {
        handleAxiosError(err);
        return null;
      } finally {
        setLoadingWorkout(false);
      }
    },
    [token]
  );

  const getProgress = useCallback(
    async (courseId: string, workoutId: string) => {
      if (!courseId || !workoutId || !token) return;
      setLoadingProgress(true);

      try {
        const data: WorkOutsProgress | null = await fetchProgressWorkOutById(
          token,
          {
            courseId,
            workoutId,
          }
        );

        const workout: WorkOutLesson | null = await getWorkoutById(workoutId);
        const exercises: Exercise[] = workout?.exercises ?? [];
        const progresDataWorkOut: number[] = data?.progressData ?? [];

        const normalizedProgress: number[] = exercises.map(
          (_, index) => progresDataWorkOut[index] ?? 0
        );
        const noExercises = exercises.length === 0;
        if (noExercises) {
          setProgress({
            ...(data ?? { courseId, workoutId, progressData: [] }),
            progressData: normalizedProgress,
            IsNotProgressData: true,
            IsNotProgressDataDone: false,
          });
        } else {
          setProgress({
            ...(data ?? { courseId, workoutId, progressData: [] }),
            progressData: normalizedProgress,
            IsNotProgressData: false,
          });
        }
      } catch (err: unknown) {
        handleAxiosError(err);
      } finally {
        setLoadingProgress(false);
      }
    },
    [getWorkoutById, token]
  );

  const updateProgress = useCallback(
    async (courseId: string, workoutId: string, progressData: ProgressData) => {
      if (!courseId || !workoutId || !token) return;
      setLoadingProgress(true);

      setProgress((prev) => {
        if (!prev) return prev;
        return { ...prev, progressData };
      });

      try {
        await patchProgressWorkOut(token, {
          courseId,
          workoutId,
          progressData,
        });
      } catch (err) {
        handleAxiosError(err);
      } finally {
        setLoadingProgress(false);
      }
    },
    [token]
  );

  const getCourseProgressById = useCallback(
    async (courseId: string) => {
      if (!courseId || !token) return;
      setLoadingCourseProgress(true);

      try {
        const data = await fetchCourseProgress(token, courseId);
        setCourseProgress(data ?? null);
      } catch (err) {
        handleAxiosError(err);
      } finally {
        setLoadingCourseProgress(false);
      }
    },
    [token]
  );

  const deleteAllCourseProgress = useCallback(
    async (courseId: string) => {
      setLoadingCourseProgress(true);
      try {
        const message = await patchAllCourseProgress(token, courseId);
        toast.success(message);
      } catch (err) {
        handleAxiosError(err);
      } finally {
        setLoadingCourseProgress(false);
      }
    },
    [token]
  );

  return (
    <CourseContext.Provider
      value={{
        workOut,
        workouts,
        loadingWorkouts,
        getWorkoutsList,
        progress,
        loadingWorkout,
        loadingProgress,
        getProgress,
        getWorkoutById,
        updateProgress,
        getCourseProgressById,
        courseProgress,
        loadingCourseProgress,
        setProgress,

        addCourseToFavorites,
        deleteAllCourseProgress,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export default CourseProvider;