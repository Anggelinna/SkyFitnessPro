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
import { useState } from "react"

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
  const [localIsAdded, setLocalIsAdded] = useState(courseData.isAdded);
  const [localProgress, setLocalProgress] = useState(courseData.progress);
  
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

  const handleActionComplete = () => {
    // Локально обновляем состояние
    setLocalIsAdded(prev => !prev);
    
    // Вызываем колбэк родителя для обновления данных
    if (onActionComplete) {
      onActionComplete();
    }
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (localProgress >= courseData.max) {
      try {
        await coursesAPI.repeatFromBeginUserCourse(userId, courseData._id)
        setLocalProgress(0);
        if (onActionComplete) {
          onActionComplete();
        }
      } catch (error) {
        console.error('Ошибка при сбросе прогресса:', error)
 }
    }
    navigate(`choose/${courseData._id}`)
  }

  const handleCardClick = (e: React.MouseEvent) => {
    // Предотвращаем переход по ссылке если кликнули на кнопку действия
    if ((e.target as HTMLElement).closest('.card-action')) {
      e.preventDefault();
    }
  }

  const progressRate = getRate(localProgress, courseData.max);

  return (
    <div 
      className={twMerge(sharedStyles.card, sharedStyles.shadowedBlock, sharedStyles.scaledBlock)}
      onClick={handleCardClick}
    >
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
        action={localIsAdded ? "remove" : "add"}
        onActionComplete={handleActionComplete}
      />

      <div className={sharedStyles.cardBlock}>
        <div className={sharedStyles.cardContent}>
          <Link 
            className={sharedStyles.cardTitle} 
            to={link}
            onClick={(e) => e.stopPropagation()}
          >
            {courseData.title}
          </Link>

          <div className={sharedStyles.cardTablets}>
            <Tablet imgName="calendar">25 дней</Tablet>
            <Tablet imgName="time">20-50 мин/день</Tablet>
            <Tablet imgName="difficulty" difficulty={courseData.difficulty} />
          </div>

          {userId && localIsAdded && (
            <Progress title="" progress={progressRate} />
          )}
        </div>

        {userId && localIsAdded && (
          <Button 
            additionalClasses={sharedStyles.buttonWideWithFields} 
            primary={true} 
            onClick={handleSubmit}
            type="button"
          >
            {getActionTextFromProgress(false, localProgress, courseData.max)}
          </Button>
        )}
      </div>
    </div>
  )
}