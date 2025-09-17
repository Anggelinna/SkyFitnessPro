import { sharedStyles } from "../../sharedStyles"
import { twMerge } from "tailwind-merge"

import Button from "../Button/Button"
import CardAction from "../CardAction/CardAction"
import Progress from "../Progress/Progress"
import Tablet from "../Tablet/Tablet"

import { Link } from "react-router-dom"
import { useNavigateFaraway } from "../../hooks/useNavigateFaraway"
import { getActionTextFromProgress, getRate } from "../../utils/progress"
import type { CourseType, KeysType } from "../../types/types"
import { coursesAPI } from '../../api/coursesApi'

interface Props {
  courseData: CourseType
  userId: string
  onActionComplete?: () => void
}

// Маппинг имен курсов к именам файлов (на основе существующих изображений)
const imageMapping: { [key: string]: string } = {
  yoga: 'yoga',
  stretching: 'stretching',
  zumba: 'zumba',
  aerobics: 'aerobics',
  'body-flex': 'body-flex',
  fitness: 'zumba',
  'step-aerobics': 'aerobics',
  default: '404',
}

export default function Card({ courseData, userId, onActionComplete }: Props) {
  const name = courseData.name
  const link = `/courses/${courseData._id}`
  const navigate = useNavigateFaraway()

  // Получаем правильное имя файла
  const imageName = imageMapping[name] || imageMapping.default
  const imagePath = `/img/${imageName}.jpeg`

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    console.error('Image failed to load:', target.src)

    // Абсолютный путь для fallback
    target.src = `${window.location.origin}/img/404.png`
    target.alt = 'Изображение не найдено'
  }

  async function handleSubmit() {
    if (courseData.progress >= courseData.max) {
      try {
        await coursesAPI.repeatFromBeginUserCourse(userId, courseData._id)
        if (onActionComplete) {
          onActionComplete()
        }
      } catch (error) {
        console.error('Ошибка при сбросе прогресса:', error)
      }
    }
    navigate(`choose/${courseData._id}`)
  }
  //const isZumba = name === 'fitness'

  return (
    <div className={twMerge(sharedStyles.card, sharedStyles.shadowedBlock, sharedStyles.scaledBlock)}>
      <Link to={link}>
  <div className={sharedStyles.cardPicture}>
    <img
      className={twMerge(
        sharedStyles.cardInner,
        sharedStyles[(`card-${name}`) as KeysType]
      )}
      src={imagePath}
      alt={name}
      onError={handleImageError}
        />
      </div>
    </Link>

      <CardAction
        courseId={courseData._id}
        userId={userId}
        action={courseData.isAdded ? "remove" : "add"}
        onActionComplete={onActionComplete}
      />

      <div className={sharedStyles.cardBlock}>
        <div className={sharedStyles.cardContent}>
          <Link className={sharedStyles.cardTitle} to={link}>{courseData.title}</Link>

          <div className={sharedStyles.cardTablets}>
            <Tablet imgName="calendar">25 дней</Tablet>
            <Tablet imgName="time">20-50 мин/день</Tablet>
            <Tablet imgName="difficulty" difficulty={courseData.difficulty} />
          </div>

          {userId && courseData.isAdded && (
            <Progress title="" progress={getRate(courseData.progress, courseData.max)} />
          )}
        </div>

        {userId && courseData.isAdded && (
          <Button additionalClasses={sharedStyles.buttonWideWithFields} primary={true} onClick={handleSubmit}>
            {getActionTextFromProgress(false, courseData.progress, courseData.max)}
          </Button>
        )}
      </div>
    </div>
  )
}