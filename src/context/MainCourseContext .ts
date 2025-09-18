import type { Course, UserData } from '../sharesTypes/sharesTypes';
import { createContext } from 'react';

export type MainCourseContextValue = {
  // --- Данные ---
  course: Course | null;
  courses: Course[];
  usersData: UserData | null;

  // --- Состояния загрузки ---
  loadingCourses: boolean;
  loadingUsersCourses: boolean;
  loadingCourse: boolean;

  // --- Методы для работы с API ---
  getCourseById: (id: string) => Promise<Course | null>;
  getAllCourses: () => Promise<Course[] | null>;
  getAllUsersData: () => Promise<UserData | null>;
};

export const MainCourseContext = createContext<
  MainCourseContextValue | undefined
>(undefined);