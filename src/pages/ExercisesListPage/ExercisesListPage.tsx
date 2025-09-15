import { sharedStyles } from "../../sharedStyles"
import { twMerge } from "tailwind-merge"

import Button from "../../components/Button/Button"

import React from "react"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import { WorkoutsType } from "../../types/types"


export default function ExercisesListPage() {
  const { id } = useParams()
  const workoutsData = useLoaderData() as WorkoutsType
  const navigate = useNavigate()

  if (!workoutsData)
    return "There is an error!"

  function handleClose(e: React.MouseEvent<HTMLDivElement>) {
    if ((e.target as HTMLDivElement).dataset.id === "modal-outside")
      navigate(-1)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    for (const workout of workoutsData)
      if (workout.progress !== workout.max)
        return navigate(`/workout/${id}/${workout._id}/`, { replace: true })
  }

  function getButtonText() {
    for (const workout of workoutsData)
      if (workout.progress)
        return "Продолжить"

    return "Начать"
  }

  return (
    <div className={sharedStyles.modalWrapper} data-id="modal-outside" onClick={handleClose}>
      <form className={twMerge(sharedStyles.modalForm, sharedStyles.modalFormCompact)} onSubmit={handleSubmit}>
        <p className={sharedStyles.modalFormCaption}>Выберите тренировку</p>

        <div className={twMerge(sharedStyles.modalScrollingList, workoutsData.length > 5 && sharedStyles.modalScrollingListGapped)}>
          <ul className={sharedStyles.modalList}>
            {
              workoutsData.map((workout) => {
                const handleClick = () => navigate(`/workout/${id}/${workout._id}/`, { replace: true })
                return (
                  <li key={workout._id} className={sharedStyles.modalListItem} onClick={handleClick}>
                    {
                      workout.progress === workout.max
                        ? (
                          <img className={sharedStyles.modalListMark} src="/img/mark.svg" alt="mark" />
                        )
                        : (
                          <div className={sharedStyles.modalListEmptyMark} />
                        )
                    }
                    <div className={sharedStyles.modalListItemContent}>
                      <p className={sharedStyles.modalListItemExercise}>{workout.name}</p>
                      <p className={sharedStyles.modalListItemCourse}>{workout.courseName} на каждый день / {workout.day} день</p>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>

        <Button primary={true} type="submit" additionalClasses={sharedStyles.buttonWide}>
          {getButtonText()}
        </Button>
      </form>
    </div>
  )
}
