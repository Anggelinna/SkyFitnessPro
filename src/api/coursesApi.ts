import { API_BASE_URL } from "./config"
import { withFallback } from "../utils/network"
import type {
  CoursesType,
  CourseType,
  WorkoutsType,
  WorkoutType,
  ExerciseType,
  UserExercisesDataType,
  UserDataType,
  UserWorkoutDataType,
  ProgressData,
  WorkoutProgress,
} from "../types/types"

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken')
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  }
}

// Mock данные для fallback
const mockCourses: CoursesType = [
  {
    _id: '1',
    name: 'yoga',
    title: 'Йога для начинающих',
    difficulty: 'easy',
    progress: 0,
    max: 10,
    isAdded: false,
    workouts: ['w1', 'w2'],
    fitting: ['Подходит для расслабления', 'Улучшает гибкость'],
    directions: ['Гибкость', 'Релаксация'],
  },
  {
    _id: '2',
    name: 'stretching',
    title: 'Стретчинг',
    difficulty: 'medium',
    progress: 0,
    max: 10,
    isAdded: false,
    workouts: ['w3', 'w4'],
    fitting: ['Улучшает растяжку', 'Снимает напряжение'],
    directions: ['Гибкость', 'Растяжка'],
  },
  {
    _id: '3',
    name: 'fitness', // изменено с strength на fitness
    title: 'Фитнес',
    difficulty: 'hard',
    progress: 0,
    max: 10,
    isAdded: false,
    workouts: ['w5', 'w6'],
    fitting: ['Укрепляет мышцы', 'Повышает выносливость'],
    directions: ['Сила', 'Выносливость'],
  },
  {
    _id: '4',
    name: 'step-aerobics', // новый курс
    title: 'Степ-аэробика',
    difficulty: 'medium',
    progress: 0,
    max: 10,
    isAdded: false,
    workouts: ['w7', 'w8'],
    fitting: ['Улучшает координацию', 'Сжигает калории'],
    directions: ['Кардио', 'Координация'],
  },
  {
    _id: '5',
    name: 'body-flex', // новый курс
    title: 'Бодифлекс',
    difficulty: 'easy',
    progress: 0,
    max: 10,
    isAdded: false,
    workouts: ['w9', 'w10'],
    fitting: ['Улучшает дыхание', 'Тонизирует мышцы'],
    directions: ['Дыхание', 'Тонус'],
  },
]

const mockWorkouts: WorkoutsType = [
  {
    _id: 'w1',
    name: 'Утренняя йога',
    courseId: '1',
    courseName: 'Йога для начинающих',
    day: 1,
    progress: 0,
    max: 5,
    video: 'https://www.youtube.com/embed/example1',
    exercises: [
      { name: 'Поза горы', quantity: 10, progress: 0 },
      { name: 'Поза дерева', quantity: 8, progress: 0 },
    ],
  },
  {
    _id: 'w2',
    name: 'Вечерняя йога',
    courseId: '1',
    courseName: 'Йога для начинающих',
    day: 2,
    progress: 0,
    max: 5,
    video: 'https://www.youtube.com/embed/example2',
    exercises: [
      { name: 'Поза ребенка', quantity: 5, progress: 0 },
      { name: 'Поза кобры', quantity: 7, progress: 0 },
    ],
  },
]

export const coursesAPI = {
  // reading methods

  async getCourses(userId: string): Promise<CoursesType> {
    return withFallback(
      async () => {
        const response = await fetch(`${API_BASE_URL}/api/courses?userId=${userId}`, {
          method: 'GET',
          headers: getAuthHeaders(),
        })

        const contentType = response.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text()
          console.error('Сервер вернул не JSON:', text.substring(0, 200))
          throw new Error('Сервер вернул неверный формат данных')
        }

        if (!response.ok) {
          throw new Error('Ошибка получения курсов')
        }

        const data = await response.json()
        return data.courses || []
      },
      mockCourses,
    )
  },

  async getCourse(courseId: string, userId: string): Promise<CourseType | null> {
    return withFallback(
      async () => {
        const response = await fetch(`${API_BASE_URL}/api/courses/${courseId}?userId=${userId}`, {
          method: 'GET',
          headers: getAuthHeaders(),
        })

        if (!response.ok) {
          throw new Error('Ошибка получения курса')
        }

        const data = await response.json()
        return data.course || null
      },
      mockCourses.find(course => course._id === courseId) || null,
    )
  },

  async getWorkouts(): Promise<WorkoutsType> {
    return withFallback(
      async () => {
        const response = await fetch(`${API_BASE_URL}/api/workouts`, {
          method: 'GET',
          headers: getAuthHeaders(),
        })

        if (!response.ok) {
          throw new Error('Ошибка получения тренировок')
        }

        const data = await response.json()
        return data.workouts || []
      },
      mockWorkouts,
    )
  },

  async getWorkoutsIntoCourse(courseId: string, userId: string): Promise<WorkoutsType> {
    return withFallback(
      async () => {
        const response = await fetch(`${API_BASE_URL}/api/courses/${courseId}/workouts?userId=${userId}`, {
          method: 'GET',
          headers: getAuthHeaders(),
        })

        if (!response.ok) {
          throw new Error('Ошибка получения тренировок курса')
        }

        const data = await response.json()
        return data.workouts || []
      },
      mockWorkouts.filter(workout => workout.courseId === courseId),
    )
  },

  async getWorkout(courseId: string, workoutId: string, userId: string): Promise<WorkoutType | null> {
    return withFallback(
      async () => {
        const response = await fetch(
          `${API_BASE_URL}/api/courses/${courseId}/workouts/${workoutId}?userId=${userId}`,
          {
            method: 'GET',
            headers: getAuthHeaders(),
          },
        )

        if (!response.ok) {
          throw new Error('Ошибка получения тренировки')
        }

        const data = await response.json()
        return data.workout || null
      },
      mockWorkouts.find(workout => workout._id === workoutId && workout.courseId === courseId) || null,
    )
  },

  // writing methods

  async addUserCourse(userId: string, courseId: string): Promise<{ message: string }> {
    return withFallback(
      async () => {
        const response = await fetch(`${API_BASE_URL}/api/user/courses`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ userId, courseId }),
        })

        if (!response.ok) {
          throw new Error('Ошибка добавления курса')
        }

        return await response.json()
      },
      { message: 'success' },
    )
  },

  async removeUserCourse(userId: string, courseId: string): Promise<{ message: string }> {
    return withFallback(
      async () => {
        const response = await fetch(`${API_BASE_URL}/api/user/courses/${courseId}`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
          body: JSON.stringify({ userId }),
        })

        if (!response.ok) {
          throw new Error('Ошибка удаления курса')
        }

        return await response.json()
      },
      { message: 'success' },
    )
  },

  async repeatFromBeginUserCourse(userId: string, courseId: string): Promise<{ message: string }> {
    return withFallback(
      async () => {
        const response = await fetch(`${API_BASE_URL}/api/user/courses/${courseId}/reset`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ userId }),
        })

        if (!response.ok) {
          throw new Error('Ошибка сброса прогресса курса')
        }

        return await response.json()
      },
      { message: 'success' },
    )
  },

  async writeProgressToUserCourse(
    userId: string,
    courseId: string,
    workoutId: string,
    progress: number,
  ): Promise<{ message: string }> {
    return withFallback(
      async () => {
        const response = await fetch(`${API_BASE_URL}/api/user/progress`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ userId, courseId, workoutId, progress }),
        })

        if (!response.ok) {
          throw new Error('Ошибка сохранения прогресса')
        }

        return await response.json()
      },
      { message: 'success' },
    )
  },

  async writeProgressWithExercisesToUserCourse(
    userId: string,
    courseId: string,
    workoutId: string,
    exercisesData: UserExercisesDataType,
  ): Promise<{ message: string }> {
    return withFallback(
      async () => {
        const response = await fetch(`${API_BASE_URL}/api/user/progress/exercises`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ userId, courseId, workoutId, exercisesData }),
        })

        if (!response.ok) {
          throw new Error('Ошибка сохранения прогресса упражнений')
        }

        return await response.json()
      },
      { message: 'success' },
    )
  },

  // Дополнительные методы
  async getUserCourses(userId: string): Promise<CoursesType> {
    return withFallback(
      async () => {
        const response = await fetch(`${API_BASE_URL}/api/user/courses?userId=${userId}`, {
          method: 'GET',
          headers: getAuthHeaders(),
        })

        if (!response.ok) {
          throw new Error('Ошибка получения курсов пользователя')
        }

        const data = await response.json()
        return data.courses || []
      },
      mockCourses,
    )
  },

  async getUserProgress(userId: string, courseId: string): Promise<ProgressData | null> {
    return withFallback(
      async () => {
        const response = await fetch(`${API_BASE_URL}/api/user/progress?userId=${userId}&courseId=${courseId}`, {
          method: 'GET',
          headers: getAuthHeaders(),
        })

        if (!response.ok) {
          throw new Error('Ошибка получения прогресса')
        }

        return await response.json()
      },
      { progress: 0, max: 10 },
    )
  },

  async updateUserSelectedCourses(userId: string, selectedCourses: string[]): Promise<{ message: string }> {
    return withFallback(
      async () => {
        const response = await fetch(`${API_BASE_URL}/api/user/selected-courses`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify({ userId, selectedCourses }),
        })

        if (!response.ok) {
          throw new Error('Ошибка обновления выбранных курсов')
        }

        return await response.json()
      },
      { message: 'success' },
    )
  },
}