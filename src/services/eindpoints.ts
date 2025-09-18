export const API_ENDPOINTS = {
  GET_ALL_COURSES: '/courses',
  GET_ALL_USERS_DATA: '/users/me',
  SIGN_IN: '/auth/login',
  SIGN_UP: '/auth/register',
  GET_TOKEN: '/user/token/',
  REMOVE_FROM_FAVORITES: (id: string | number) => `/users/me/courses/${id}`,
   REMOVE_PROGRESS_COURSE: (
    courseId: string | number,
  ) => `/courses/${courseId}/reset`,
  ADD_TO_FAVORITES: () => '/users/me/courses/',
  GET_COURSE_BY_ID: (courseId: string | number) => `/courses/${courseId}/`,
  GET_LIST_WORKOUTS: (id: string | number) => `/courses/${id}/workouts/`,
  GET_WORKOUT_BY_ID: (id: string | number) => `/workouts/${id}/`,
  PATCH_PROGRESS_WORKOUT_BY_ID: (
    courseId: string | number,
    workoutId: string | number
  ) => `/courses/${courseId}/workouts/${workoutId}`,
  GET_PROGRESS_WORKOUT_BY_ID: () => `/users/me/progress`, // с query courseId + workoutId
  GET_COURSE_PROGRESS: () => '/users/me/progress', // с query только courseId
};