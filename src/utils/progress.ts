import { CourseType, UserDataType, WorkoutsType } from "../types/types"


export function getRate(progress: number, max: number) {
  if (!max && progress)
    return 100
  else if (!max || !progress)
    return 0
  else
    return Math.ceil(100 * progress / max)
}


export function getActionTextFromProgress(needToAdd: boolean, progress: number, max: number): string {
  if (needToAdd)
    return "Добавить курс"
  if (progress >= max)
    return "Начать заново"
  else if (progress > 0)
    return "Продолжить"
  else
    return "Начать тренировки"
}


export function fillUserFieldsInCourse(course: CourseType, workoutsData: WorkoutsType, userData: UserDataType) {
  const isAdded = typeof userData[course._id] === "object"

  let result = 0

  for (const workoutId of course.workouts) {
    let progress = 0
    let max      = 0

    for (const workout of workoutsData) {
      if (workout._id !== workoutId)
        continue

      if (workout.exercises)
        for (const exercise of workout.exercises)
          max += exercise.quantity
      else
        max += 1

      if (isAdded)
        progress += getProgressInsideUserData(userData, course._id, workoutId)
    }

    if (progress >= max)
      ++result
  }

  course.isAdded  = isAdded
  course.progress = result
  course.max      = Math.max(course.workouts.length, 1)
}

export function getProgressInsideUserData(userData: UserDataType, courseId: string, workoutId: string): number {
  let progress = 0

  const dataCourse = userData[courseId]

  if (!dataCourse || !dataCourse.workouts)
    return progress

  const dataWorkout = dataCourse.workouts[workoutId]

  if (!dataWorkout)
    return progress

  if (dataWorkout.progress)
    return dataWorkout.progress
  else if (!dataWorkout.exercises)
    return progress

  for (const exercise of dataWorkout.exercises)
    progress += exercise.progress

  return progress
}