import type {
  Course,
  WorkOutLesson,
  WorkOutsProgress,
  UserData,
  ProgressData,
  CourseProgress,
} from '../sharesTypes/sharesTypes';
import api from './axios';
import type { Token } from './token';
import { API_ENDPOINTS } from './eindpoints';

export async function fetchAllCourses(): Promise<Course[]> {
  const response = await api.get(API_ENDPOINTS.GET_ALL_COURSES);
  return response.data;
}

export async function fetchAllUsersData(token: Token): Promise<UserData> {
  const response = await api.get(API_ENDPOINTS.GET_ALL_USERS_DATA, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function fetchListWorkOuts(
  token: Token,
  id: string | number
): Promise<WorkOutLesson[]> {
  const response = await api.get(API_ENDPOINTS.GET_LIST_WORKOUTS(id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function fetchWorkOutsById(
  token: Token,
  id: string | number
): Promise<WorkOutLesson> {
  const response = await api.get(API_ENDPOINTS.GET_WORKOUT_BY_ID(id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function fetchCoursesById(

  id: string | number
): Promise<Course> {
  const response = await api.get(API_ENDPOINTS.GET_COURSE_BY_ID(id), {
 
  });
  return response.data;
}

export async function fetchProgressWorkOutById(
  token: Token,
  params: {
    courseId: string;
    workoutId: string;
  }
): Promise<WorkOutsProgress> {
  const { courseId, workoutId } = params;

  const response = await api.get(API_ENDPOINTS.GET_PROGRESS_WORKOUT_BY_ID(), {
    params: { courseId, workoutId },
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}

export async function addFavoriteCourse(
  token: Token,
  courseId: string
): Promise<string> {
  const response = await api.post<{ message: string }>(
    API_ENDPOINTS.ADD_TO_FAVORITES(),
    { courseId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': '',
      },
    }
  );

  return response.data.message;
}

export async function removeFavoriteCourse(
  token: Token,
  id: string | number
): Promise<string> {
  const response = await api.delete<{ message: string }>(
    API_ENDPOINTS.REMOVE_FROM_FAVORITES(id),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.message;
}


export async function patchAllCourseProgress(
  token: Token,
  id: string 
): Promise<string> {
  const response = await api.patch<{ message: string }>(
    API_ENDPOINTS.REMOVE_PROGRESS_COURSE(id),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.message;
}

export async function patchProgressWorkOut(
  token: Token,
  params: {
    courseId: string;
    workoutId: string;
    progressData: ProgressData;
  }
): Promise<WorkOutsProgress> {
  const { courseId, workoutId, progressData } = params;
  const body = JSON.stringify({ progressData });
  const response = await api.patch(
    `/courses/${courseId}/workouts/${workoutId}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': '',
      },
    }
  );

  return response.data;
}

export async function fetchCourseProgress(
  token: Token,
  courseId: string
): Promise<CourseProgress> {
  const response = await api.get(API_ENDPOINTS.GET_COURSE_PROGRESS(), {
    params: { courseId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}