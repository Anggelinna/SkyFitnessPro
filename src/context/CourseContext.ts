import type {
  WorkOutLesson,
  CourseProgress,
  ExtendedWorkOutsProgress,
} from '../sharesTypes/sharesTypes';
import { createContext } from 'react';

export type CourseContextValue = {
  workOut: WorkOutLesson | null;
  workouts: WorkOutLesson[] | null;

  progress: ExtendedWorkOutsProgress | null;
  setProgress: React.Dispatch<
    React.SetStateAction<ExtendedWorkOutsProgress | null>
  >;
  courseProgress: CourseProgress | null;
  loadingWorkout: boolean;
  loadingProgress: boolean;
  loadingCourseProgress: boolean;
  loadingWorkouts: boolean;

  // --- методы ---
  getProgress: (courseId: string, workoutId: string) => Promise<void>;
  getCourseProgressById: (courseId: string) => Promise<void>;
  getWorkoutById: (id: string) => Promise<WorkOutLesson | null>;
  getWorkoutsList: (courseId: string) => Promise<WorkOutLesson[] | null>;
  updateProgress: (
    courseId: string,
    workoutId: string,
    progressData: number[]
  ) => Promise<void>;

  addCourseToFavorites(courseId: string): Promise<void>;
  deleteAllCourseProgress: (courseId: string) => Promise<void>;
};
export const CourseContext = createContext<CourseContextValue | undefined>(
  undefined
);