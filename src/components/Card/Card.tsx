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

import { coursesAPI } from "../../api/coursesApi"


interface Props {
  courseData: CourseType
  userId:     string
}

export default function Card({ courseData, userId }: Props) {
  const name = courseData.name
  const link = `/courses/${courseData._id}`
  const navigate = useNavigateFaraway()

  async function handleSubmit() {
    if (courseData.progress >= courseData.max)
      coursesAPI.repeatFromBeginUserCourse(userId, courseData._id)

    navigate(`choose/${courseData._id}`)
  }

  return (
    <div className={twMerge(sharedStyles.card, sharedStyles.shadowedBlock, sharedStyles.scaledBlock)}>
      <Link to={link}>
        <div className={sharedStyles.cardPicture}>
          <img className={twMerge(sharedStyles.cardInner, sharedStyles[(`card-${name}`) as KeysType])} src={`/img/${name}.jpeg`} alt={name} />
        </div>
      </Link>

      <CardAction courseId={courseData._id} userId={userId} action={courseData.isAdded ? "remove" : "add"} />

      <div className={sharedStyles.cardBlock}>
        <div className={sharedStyles.cardContent}>
          <Link className={sharedStyles.cardTitle} to={link}>{courseData.title}</Link>

          <div className={sharedStyles.cardTablets}>
            <Tablet imgName="calendar">25 дней</Tablet>
            <Tablet imgName="time">20-50 мин/день</Tablet>
            <Tablet imgName="difficulty" difficulty={courseData.difficulty} />
          </div>

          {
            userId && courseData.isAdded
              && (
                <Progress title="" progress={getRate(courseData.progress, courseData.max)} />
              )
          }
        </div>

        {
          userId && courseData.isAdded
            && (
              <Button additionalClasses={sharedStyles.buttonWideWithFields} primary={true} onClick={handleSubmit}>
                {getActionTextFromProgress(false, courseData.progress, courseData.max)}
              </Button>
            )
        }
      </div>
    </div>
  )
}
