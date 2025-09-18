import React, { useState, useCallback, useContext } from 'react';
import { MainCourseContext } from './MainCourseContext ';
import type { Course, UserData } from '../sharesTypes/sharesTypes';
import {
  fetchCoursesById,
  fetchAllCourses,
  fetchAllUsersData,
} from '../services/api';
import { handleAxiosError } from '../utils/handleAxiosError/handleAxiosError';
import { AuthContext } from './AuthContext';

type MainCourseProviderProps = {
  children: React.ReactNode;
};

const MainCourseProvider: React.FC<MainCourseProviderProps> = ({
  children,
}) => {
  // --- Данные ---
  const [course, setCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [usersData, setUsersData] = useState<UserData | null>(null);

  // --- Loading states ---
  const [loadingCourse, setLoadingCourse] = useState<boolean>(false);
  const [loadingCourses, setLoadingCourses] = useState<boolean>(false);
  const [loadingUsersCourses, setLoadingUsersCourses] =
    useState<boolean>(false);

  const { token } = useContext(AuthContext);

  // --- Загрузка всех курсов ---
  const getAllCourses = useCallback(async (): Promise<Course[] | null> => {
    setLoadingCourses(true);
    try {
      const data = await fetchAllCourses();
      if (data) {
        setCourses(data);
        return data;
      }
      return null;
    } catch (error) {
      handleAxiosError(error);
      return null;
    } finally {
      setLoadingCourses(false);
    }
  }, []);

  // --- Загрузка данных пользователя (курсы пользователя) ---
  const getAllUsersData = useCallback(async (): Promise<UserData | null> => {
    setLoadingUsersCourses(true);
    try {
      const data = await fetchAllUsersData(token);
      if (data) {
        setUsersData(data);
        return data;
      }
      return null;
    } catch (error) {
      handleAxiosError(error);
      return null;
    } finally {
      setLoadingUsersCourses(false);
    }
  }, [token]);

  // --- Загрузка конкретного курса по id ---
  const getCourseById = useCallback(
    async (id: string): Promise<Course | null> => {
      if (!id ) return null;

      setLoadingCourse(true);
      try {
        const data = await fetchCoursesById( id);
        if (data) {
          setCourse(data);
          return data;
        }
        return null;
      } catch (err) {
        handleAxiosError(err);
        return null;
      } finally {
        setLoadingCourse(false);
      }
    },
    []
  );

  return (
    <MainCourseContext.Provider
      value={{
        // данные
        course,
        courses,
        usersData,

        // состояния загрузки
        loadingCourse,
        loadingCourses,
        loadingUsersCourses,

        // методы
        getCourseById,
        getAllCourses,
        getAllUsersData,
      }}
    >
      {children}
    </MainCourseContext.Provider>
  );
};

export default MainCourseProvider;