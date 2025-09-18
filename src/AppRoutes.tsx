import { Routes, Route } from 'react-router-dom';
import { RoutesApp } from './const';
import MainPage from './pages/MainPage/MainPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import MainLayout from './pages/MainLayout/MainLayout';
import CoursePage from './pages/CoursePage/CoursePage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ProfilPage from './pages/PrivateLayout/PrivateLayout';
import WorkOutFormPage from './pages/WorkOutsFormPage';
import WorkOutCoursePage from './pages/WorkOutCoursePage/WorkOutCoursePage';
import PrivateRoute from './PrivateRoute';
import PrivateLayout from './pages/PrivateLayout/PrivateLayout';
import MainCourseProvider from './context/MainCourseProvider';

function AppRoutes() {
  return (
    <Routes>
      {/* Публичные страницы */}
      <Route
        element={
          <MainCourseProvider>
            <MainLayout />
          </MainCourseProvider>
        }
      >
        <Route path={RoutesApp.MAIN} element={<MainPage />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
      </Route>

      {/* Приватные страницы */}
      <Route element={<PrivateRoute />}>
        <Route
          element={
            <MainCourseProvider>
              <PrivateLayout />
            </MainCourseProvider>
          }
        >
          <Route path={RoutesApp.PROFILE} element={<ProfilPage />} />
          <Route
            path="/course/:courseId/workouts/:workoutId"
            element={<WorkOutCoursePage />}
          />
          <Route
            path="/course/:courseId/workouts"
            element={<WorkOutFormPage />}
          />
        </Route>
      </Route>

      {/* Авторизация */}
      <Route path={RoutesApp.SIGN_IN} element={<SignInPage />} />
      <Route path={RoutesApp.SIGN_UP} element={<SignUpPage />} />

      {/* 404 */}
      <Route path={RoutesApp.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;