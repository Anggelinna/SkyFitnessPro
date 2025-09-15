import { sharedStyles } from "../../sharedStyles"

import React from "react"

import { coursesAPI } from "../../api/coursesApi"


interface Props {
  courseId: string
  userId:   string
  action:   "add" | "remove"
}

function CardAction({ courseId, userId, action }: Props) {
  const picture = action === "add" ? "plus" : "minus"

  function handleAction() {
    if (action === "add")
      coursesAPI.addUserCourse(userId, courseId)
    else
      coursesAPI.removeUserCourse(userId, courseId)

    window.location.reload()
  }

  return (
    <div className={sharedStyles.cardAction} onClick={handleAction}>
      <img className={sharedStyles.cardAddBtn} src={`/img/${picture}.svg`} alt={action} />

      <div className={sharedStyles.cardActionTooltip}>
        {action === "add" ? "Добавить" : "Удалить"} курс
      </div>
    </div>
  )
}

export default React.memo(CardAction)
