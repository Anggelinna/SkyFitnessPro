import { sharedStyles } from "../../sharedStyles"
import { twMerge } from "tailwind-merge"
import Banner from "../../components/Banner/Banner"
import Button from "../../components/Button/Button"
import Header from "../../components/Header/Header"
import { Outlet, useLoaderData, useParams } from "react-router-dom"
import { useNavigateFaraway } from "../../hooks/useNavigateFaraway"
import { useUserContext } from "../../context/UserContext/UserContext"
import { CourseType } from "../../types/types"
import pages from "../../data/pages"
import { coursesAPI } from "../../api/coursesApi"
import Footer from "../../components/Footer/Footer"

function CoursePage() {
  useParams()
  const courseData = useLoaderData() as CourseType
  const userContext = useUserContext()
  const navigate = useNavigateFaraway()

  if (!courseData)
    return "There is an error!"

  async function doExercises() {
    try {
      if (courseData.progress >= 100) {
        await coursesAPI.repeatFromBeginUserCourse(userContext.uid, courseData._id)
      } else {
        await coursesAPI.removeUserCourse(userContext.uid, courseData._id)
      }
      // navigate(`choose/${courseData._id}`)
    } catch (error) {
      console.error('Ошибка при выполнении действия с курсом:', error)
    }
  }

  async function handleSubmit() {
    if (!userContext.isAuthenticated()) {
      navigate(pages.SIGN_IN)
    } else if (!courseData.isAdded) {
      try {
        await coursesAPI.addUserCourse(userContext.uid, courseData._id)
        // Обновляем состояние после успешного добавления
        courseData.isAdded = true
      } catch (error) {
        console.error('Ошибка при добавлении курса:', error)
      }
    } else {
      await doExercises()
    }
  }

  function getButtonText() {
    if (!userContext.isAuthenticated())
      return "Войдите, чтобы добавить курс"
    else if (!courseData.isAdded)
      return "Добавить курс"
    else if (courseData.progress >= 100)
      return "Начать курс заново"
    else if (courseData.progress > 0)
      return "Продолжить курс"
    else
      return "Удалить курс"
  }

  return (
    <div className={sharedStyles.wrapper}>
      <div className={sharedStyles.container}>
        <Header />

        <main className="">
          <Banner key={courseData._id} courseData={courseData} />

          <section className={sharedStyles.presentation}>
            <h3 className={sharedStyles.presentationTitle}>Подойдет для вас, если:</h3>
            <div className={sharedStyles.presentationContent}>
              {
                courseData.fitting.map((item, index) => (
                  <div key={index} className={sharedStyles.presentationBlock}>
                    <p className={sharedStyles.presentationNumber}>{index + 1}</p>
                    <p className={sharedStyles.presentationText}>{item}</p>
                  </div>
                ))
              }
            </div>
          </section>

          <section className={sharedStyles.presentation}>
            <h3 className={sharedStyles.presentationTitle}>Направления</h3>
            <ul className={sharedStyles.presentationGoals}>
              {
                courseData.directions.map((item, index) => (
                  <li key={index} className={sharedStyles.presentationGoal}>
                    <img className={sharedStyles.presentationGoalStar} src="/img/star.svg" alt="star" />
                    <p>{item}</p>
                  </li>
                ))
              }
            </ul>
          </section>
        </main>
      </div>

      <div className={sharedStyles.presentationNewLifeSection}>
        <section className={twMerge(sharedStyles.presentationNewLife, sharedStyles.shadowedBlock, sharedStyles.scaledBlock)}>
          <div className={sharedStyles.presentationNewLifeLeft}>
            <h2 className={sharedStyles.presentationNewLifeTitle}>Начните путь<br />к новому телу</h2>
            <ul className={sharedStyles.presentationNewLifeList}>
              <li className={sharedStyles.presentationNewLifeLeftItem}>проработка всех групп мышц</li>
              <li className={sharedStyles.presentationNewLifeLeftItem}>тренировка суставов</li>
              <li className={sharedStyles.presentationNewLifeLeftItem}>улучшение циркуляции крови</li>
              <li className={sharedStyles.presentationNewLifeLeftItem}>заряд бодрости</li>
              <li className={sharedStyles.presentationNewLifeLeftItem}>помощь в противостоянии стрессам</li>
            </ul>

            <Button additionalClasses={sharedStyles.buttonWideWithMargin} primary={true} onClick={handleSubmit}>
              {getButtonText()}
            </Button>
          </div>

          <div className={sharedStyles.presentationNewLifeRight}>
            <img className={sharedStyles.presentationNewLifeLines} src="/img/curves.svg" alt="curves" />
          </div>

          <img className={sharedStyles.presentationNewLifeMan} src="/img/runner.png" alt="runner" />
        </section>

        <img className={twMerge(sharedStyles.presentationNewLifeManSmall, sharedStyles.headerProfileBlockSmall)} src="/img/runner_small.svg" alt="runner" />
      </div>

      <Footer />

      <Outlet />
    </div>
  )
}

export default CoursePage