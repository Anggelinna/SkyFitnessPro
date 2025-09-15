import { sharedStyles } from "../sharedStyles"


export type KeysType = keyof typeof sharedStyles

export type ModalKindType = "signIn" | "signUp" | "signOut" | "resetStart" | "resetEnd"

/* back-end data's type: read */

export interface CourseType {
  /* for main page */
  _id:         string
  name:        string
  title:       string
  difficulty:  number
  order:       number
  /* for course page */
  description: string
  directions:  string[]
  fitting:     string[]
  workouts:    string[]
  max:         number
  /* for user */
  progress:    number
  isAdded:     boolean
}

export type CoursesType = CourseType[]

export interface WorkoutType {
  /* for training page */
  _id:        string
  name:       string
  video:      string
  exercises?: ExercisesType
  courseName: string
  day:        number
  max:        number
  /* for user */
  progress:   number
}

export type WorkoutsType = WorkoutType[]

export interface ExerciseType {
  /* for training page */
  name:     string
  quantity: number
  /* for user */
  progress: number
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
  _id:        string
  progress?:  number
  exercises?: UserExercisesDataType
}

export interface UserExerciseDataType {
  index:    number
  progress: number
}

export type UserExercisesDataType = UserExerciseDataType[]
