import { sharedStyles } from "../../sharedStyles"
import { twMerge } from "tailwind-merge"
import Button from "../../components/Button/Button"
import React, { useEffect, useState } from "react"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import { useUserContext } from "../../context/UserContext/UserContext"
import { CourseType, ExercisesType, WorkoutType } from "../../types/types"
import { coursesAPI } from "../../api/coursesApi"

export default function WriteProgressPage() {
  const { courseId, workoutId } = useParams()
  const workoutData = useLoaderData() as WorkoutType
  const [exercises, setExercises] = useState<ExercisesType>([])
  const userContext = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (workoutData && workoutData.exercises)
      setExercises(workoutData.exercises)
  }, [workoutData])

  if (!workoutData || !courseId || !workoutId)
    return "There is an error!"

  function handleClose(e: React.MouseEvent<HTMLDivElement>) {
    if ((e.target as HTMLDivElement).dataset.id === "modal-outside")
      navigate(-1)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      await coursesAPI.writeProgressWithExercisesToUserCourse(
        userContext.uid,
        courseId,
        workoutId,
        exercises.map((exercise, index) => ({
          index: index,
          progress: exercise.progress || 0,
        })),
      )

      navigate(`/workout/${courseId}/${workoutId}/`, { replace: true })
    } catch (error) {
      console.error('Ошибка при сохранении прогресса:', error)
      // Можно добавить уведомление пользователю об ошибке
    }
  }

  return (
    <div className={sharedStyles.modalWrapper} data-id="modal-outside" onClick={handleClose}>
      <form className={twMerge(sharedStyles.modalForm, sharedStyles.modalFormCompact)} onSubmit={handleSubmit}>
        <p className={sharedStyles.modalFormCaption}>Мой прогресс</p>

        <div className={twMerge(sharedStyles.writeProgressScrollingList, (workoutData.exercises?.length || 0) > 3 && sharedStyles.writeProgressScrollingListGapped)}>
          <ul className={sharedStyles.writeProgressList}>
            {
              exercises.map((exercise, index) => {
                function changeValue(e: React.ChangeEvent<HTMLInputElement>) {
                  setExercises((prev) => {
                    const exercisesData = [...prev]
                    exercisesData[index].progress = Math.min(Number(e.target.value), exercise.quantity)

                    return exercisesData
                  })
                }

                return (
                  <div key={index} className={sharedStyles.writeProgressItem}>
                    <p className={sharedStyles.text_18_20}>{exercise.name}</p>
                    <input
                      className={sharedStyles.writeProgressInput}
                      type="number"
                      min={0}
                      max={exercise.quantity}
                      value={exercise.progress || 0}
                      onChange={changeValue}
                    />
                  </div>
                )
              })
            }
          </ul>
        </div>

        <Button primary={true} type="submit" additionalClasses={sharedStyles.buttonWide}>
          Сохранить
        </Button>
      </form>
    </div>
  )
}