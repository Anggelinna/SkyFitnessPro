import { sharedStyles } from "../../sharedStyles"
import React from "react"
import { coursesAPI } from "../../api/coursesApi"

interface Props {
  courseId: string
  userId: string
  action: "add" | "remove"
  onActionComplete?: () => void
}

function CardAction({ courseId, userId, action, onActionComplete }: Props) {
  const picture = action === "add" ? "plus" : "minus"

  async function handleAction(e: React.MouseEvent) {
    e.preventDefault(); // Предотвращаем поведение по умолчанию
    e.stopPropagation(); // Останавливаем всплытие события

    try {
      if (action === "add") {
        await coursesAPI.addUserCourse(userId, courseId)
      } else {
        await coursesAPI.removeUserCourse(userId, courseId)
      }

      if (onActionComplete) {
        onActionComplete()
      }
    } catch (error) {
      console.error('Ошибка при выполнении действия с курсом:', error)
    }
  }

  return (
    <div className={sharedStyles.cardAction} onClick={handleAction}>
      <img
        className={sharedStyles.cardAddBtn}
        src={`/img/${picture}.svg`}
        alt={action}
      />

      <div className={sharedStyles.cardActionTooltip}>
        {action === "add" ? "Добавить" : "Удалить"} курс
      </div>
    </div>
  )
}

export default React.memo(CardAction)