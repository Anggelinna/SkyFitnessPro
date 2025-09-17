import { sharedStyles } from "../sharedStyles"

export type KeysType = keyof typeof sharedStyles
export type ModalKindType = "signIn" | "signUp" | "signOut" | "resetStart" | "resetEnd"

/* back-end data's type: read */

export interface CourseType {
  /* for main page */
  _id: string
  name: string
  title: string
  difficulty: number
  order: number
  /* for course page */
  description: string
  directions: string[]
  fitting: string[]
  workouts: string[]
  max: number
  /* for user */
  progress: number
  isAdded: boolean
  // Дополнительные поля из api.ts
  nameRU?: string
  nameEN?: string
  durationInDays?: number
  dailyDurationInMinutes?: {
    from: number
    to: number
  }
}

export type CoursesType = CourseType[]

export interface WorkoutType {
  /* for training page */
  _id: string
  name: string
  video: string
  exercises?: ExerciseType[]
  courseName: string
  day: number
  max: number
  /* for user */
  progress: number
}

export type WorkoutsType = WorkoutType[]

export interface ExerciseType {
  /* for training page */
  _id: string
  name: string
  quantity: number
  /* for user */
  progress: number
  index?: number // для UserExerciseDataType
}

export type ExercisesType = ExerciseType[]

/* back-end data's type: write */

export interface UserDataType {
  [key: string]: UserCourseDataType
}

export interface UserCourseDataType {
  _id: string
  workouts: {
    [key: string]: UserWorkoutDataType
  }
}

export interface UserWorkoutDataType {
  _id: string
  progress?: number
  exercises?: UserExerciseDataType[]
}

export interface UserExerciseDataType {
  index: number
  progress: number
}

export interface User {
  id: string
  email: string
  name: string
  selectedCourses?: string[] // из api.ts
}

export interface AuthResponse {
  user: User
  token: string
}

export type UserExercisesDataType = UserExerciseDataType[]

// Типы для прогресса
export interface ProgressData {
  courseId: string
  courseCompleted: boolean
  workoutsProgress: WorkoutProgress[]
}

export interface WorkoutProgress {
  workoutId: string
  workoutCompleted: boolean
  progressData: number[]
}

export interface MessageResponse {
  message: string
}