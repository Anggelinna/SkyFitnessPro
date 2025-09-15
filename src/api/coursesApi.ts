import { get, ref, set } from "firebase/database"
import { db } from "./firebaseConfig"

import type { CoursesType, CourseType, WorkoutsType, WorkoutType } from "../types/types"
import type { UserExercisesDataType, UserDataType, UserWorkoutDataType } from "../types/types"
import { fillUserFieldsInCourse, getProgressInsideUserData } from "../utils/progress"


export const coursesAPI = {
  // reading methods

  async getCourses(userId: string): Promise<CoursesType> {
    try {
      const path     = "courses"
      const snapshot = await get(ref(db, path))

      if (!snapshot.exists())
        return []

      const data: CoursesType = Object.values(snapshot.val())
      data.sort((lhs, rhs) => lhs.order - rhs.order)

      if (userId) {
        const workoutsData = await coursesAPI.getWorkouts()

        const path     = `/users/${userId}/courses`
        const snapshot = await get(ref(db, path))

        if (snapshot.exists()) {
          const userData: UserDataType = snapshot.val()

          data.forEach((course) => {
            fillUserFieldsInCourse(course, workoutsData, userData)
          })
        }
      }

      return data
    } catch (error) {
      console.log(error)
      return []
    }
  },

  async getCourse(courseId: string, userId: string): Promise<CourseType | null> {
    try {
      const path     = `courses/${courseId}`
      const snapshot = await get(ref(db, path))

      if (!snapshot.exists())
        return null

      const data = snapshot.val() as CourseType

      if (userId) {
        const workoutsData = await coursesAPI.getWorkouts()

        const path     = `/users/${userId}/courses`
        const snapshot = await get(ref(db, path))

        if (snapshot.exists()) {
          const userData: UserDataType = snapshot.val()

          fillUserFieldsInCourse(data, workoutsData, userData)
        }
      }

      return data
    } catch (error) {
      console.log(error)
      return null
    }
  },

  async getWorkouts(): Promise<WorkoutsType> {
    try {
      const path     = "workouts"
      const snapshot = await get(ref(db, path))

      if (!snapshot.exists())
        return []

      return Object.values(snapshot.val())
    } catch (error) {
      console.log(error)
      return []
    }
  },

  async getWorkoutsIntoCourse(courseId: string, userId: string): Promise<WorkoutsType> {
    try {
      const path     = `courses/${courseId}`
      const snapshot = await get(ref(db, path))

      if (!snapshot.exists())
        return []

      const workoutsData = await coursesAPI.getWorkouts()
      const courseData = snapshot.val() as CourseType

      const data: WorkoutsType = courseData.workouts.map((workoutId) => (
        workoutsData.reduce((acc, workout) => workout._id === workoutId ? workout : acc, {})
      ))

      if (userId) {
        const path     = `/users/${userId}/courses`
        const snapshot = await get(ref(db, path))

        if (snapshot.exists()) {
          const userData: UserDataType = snapshot.val()

          for (const workoutData of data) {
            let progress = 0
            let max      = 0

            for (const workout of workoutsData) {
              if (workout._id !== workoutData._id)
                continue

              if (workout.exercises)
                for (const exercise of workout.exercises)
                  max += exercise.quantity
              else
                max += 1

              progress += getProgressInsideUserData(userData, courseId, workoutData._id)
            }

            workoutData.progress   = progress
            workoutData.max        = Math.max(max, 1)
            workoutData.courseName = courseData.title
            workoutData.day        = courseData.workouts.indexOf(workoutData._id) + 1
          }
        }
      }

      return data
    } catch (error) {
      console.log(error)
      return []
    }
  },

  async getWorkout(courseId: string, workoutId: string, userId: string): Promise<WorkoutType | null> {
    try {
      const path     = `workouts/${workoutId}`
      const snapshot = await get(ref(db, path))

      if (!snapshot.exists())
        return null

      const workoutData = snapshot.val() as WorkoutType
      const courseData = await coursesAPI.getCourse(courseId, "")

      if (!courseData)
        return workoutData

      workoutData.courseName = courseData.title
      workoutData.day        = courseData.workouts.indexOf(workoutData._id) + 1

      if (userId) {
        const path     = `/users/${userId}/courses/${courseId}/workouts/${workoutId}`
        const snapshot = await get(ref(db, path))

        if (snapshot.exists()) {
          const userData: UserWorkoutDataType = snapshot.val()

          let progress = 0
          let max      = 0

          if (workoutData.exercises) {
            if (userData.exercises)
              for (const exercise of userData.exercises)
                workoutData.exercises[exercise.index].progress = exercise.progress || 0

            for (const exercise of workoutData.exercises) {
              max      += exercise.quantity
              progress += exercise.progress || 0
            }
          } else {
            max      = 1
            progress = userData.progress || 0
          }

          workoutData.progress   = progress
          workoutData.max        = Math.max(max, 1)
          workoutData.courseName = courseData.title
          workoutData.day        = courseData.workouts.indexOf(workoutData._id) + 1
        }
      }

      return workoutData
    } catch (error) {
      console.log(error)
      return null
    }
  },

  // writing methods

  async addUserCourse(userId: string, courseId: string) {
    const path = `users/${userId}/courses/${courseId}`

    await set(ref(db, path), { _id: courseId })
  },

  async removeUserCourse(userId: string, courseId: string) {
    const path = `users/${userId}/courses/${courseId}`

    await set(ref(db, path), { })
  },

  async repeatFromBeginUserCourse(userId: string, courseId: string) {
    const path = `users/${userId}/courses/${courseId}`

    await set(ref(db, path), { _id: courseId })
  },

  async writeProgressToUserCourse(userId: string, courseId: string, workoutId: string, progress: number) {
    const path = `users/${userId}/courses/${courseId}/workouts/${workoutId}`

    await set(ref(db, path), { _id: workoutId, progress })
  },

  async writeProgressWithExercisesToUserCourse(userId: string, courseId: string, workoutId: string, exercisesData: UserExercisesDataType) {
    const path = `users/${userId}/courses/${courseId}/workouts/${workoutId}/exercises`

    await set(ref(db, path), exercisesData)
  },
}
